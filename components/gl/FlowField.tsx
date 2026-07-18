"use client";

import { useEffect, useRef } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------ *
 * GPU particle flow field, written against raw WebGL — the effect is a
 * single points draw call with two custom shaders, so a scene-graph
 * library would cost ~130KB of gzip for two matrices. Fine points drift
 * along a curl-noise field like slow currents — the site's "change in
 * motion / flow" motif — and scatter away from the pointer, settling
 * back when it leaves. Tuned for a light background: dark ink points
 * with cobalt picked out in the fastest currents. Pauses off-screen and
 * on hidden tabs, handles context loss, disposes fully on unmount.
 * ------------------------------------------------------------------ */

const vertexShader = /* glsl */ `
  precision highp float;
  attribute vec3 aPosition;
  attribute float aScale;
  attribute float aSeed;
  uniform mat4 uProjection;
  uniform mat4 uModelView;
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  uniform float uSize;
  uniform float uPixelRatio;
  varying float vSpeed;
  varying float vDepth;

  // --- Simplex noise (Ashima / Stefan Gustavson) ---
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  // snoise returns a scalar; build a vec3 potential field from offset samples.
  vec3 snoiseVec3(vec3 p){
    float s  = snoise(p);
    float s1 = snoise(vec3(p.y - 19.1, p.z + 33.4, p.x + 47.2));
    float s2 = snoise(vec3(p.z + 74.2, p.x - 124.5, p.y + 99.4));
    return vec3(s, s1, s2);
  }

  vec3 curlNoise(vec3 p){
    const float e = 0.1;
    vec3 dx = vec3(e, 0.0, 0.0);
    vec3 dy = vec3(0.0, e, 0.0);
    vec3 dz = vec3(0.0, 0.0, e);
    vec3 p_x0 = snoiseVec3(p - dx);
    vec3 p_x1 = snoiseVec3(p + dx);
    vec3 p_y0 = snoiseVec3(p - dy);
    vec3 p_y1 = snoiseVec3(p + dy);
    vec3 p_z0 = snoiseVec3(p - dz);
    vec3 p_z1 = snoiseVec3(p + dz);
    float x = (p_y1.z - p_y0.z) - (p_z1.y - p_z0.y);
    float y = (p_z1.x - p_z0.x) - (p_x1.z - p_x0.z);
    float z = (p_x1.y - p_x0.y) - (p_y1.x - p_y0.x);
    return normalize(vec3(x, y, z) / (2.0 * e) + 0.0001);
  }

  void main(){
    vec3 pos = aPosition;
    float t = uTime * 0.05;
    vec3 noiseP = pos * 0.16 + vec3(0.0, 0.0, t);
    vec3 flow = curlNoise(noiseP);
    float amp = 0.9 + 0.5 * sin(uTime * 0.18 + aSeed * 6.2831);
    vec3 displaced = pos + flow * amp;

    // Pointer scatter on the xy plane.
    vec2 toP = displaced.xy - uPointer;
    float d = length(toP);
    float infl = smoothstep(3.0, 0.0, d) * uPointerStrength;
    displaced.xy += normalize(toP + 0.0001) * infl * 2.4;

    vSpeed = length(flow.xy);
    vDepth = displaced.z;

    vec4 mv = uModelView * vec4(displaced, 1.0);
    gl_Position = uProjection * mv;
    gl_PointSize = uSize * aScale * uPixelRatio * (1.0 / -mv.z);
  }
`;

const fragmentShader = /* glsl */ `
  precision mediump float;
  uniform vec3 uInk;
  uniform vec3 uCobalt;
  varying float vSpeed;
  varying float vDepth;
  void main(){
    vec2 c = gl_PointCoord - 0.5;
    float dist = length(c);
    if (dist > 0.5) discard;
    float soft = smoothstep(0.5, 0.0, dist);
    vec3 col = mix(uInk, uCobalt, smoothstep(0.55, 1.0, vSpeed));
    float depthFade = smoothstep(-4.0, 2.5, vDepth);
    float alpha = soft * mix(0.07, 0.42, depthFade);
    gl_FragColor = vec4(col, alpha);
  }
`;

const CAMERA_Z = 11;
const FOV_DEG = 50;

/** Column-major perspective projection (fov 50°, near 0.1, far 100). */
function perspective(aspect: number): Float32Array {
  const near = 0.1;
  const far = 100;
  const f = 1 / Math.tan((FOV_DEG * Math.PI) / 360);
  const m = new Float32Array(16);
  m[0] = f / aspect;
  m[5] = f;
  m[10] = (far + near) / (near - far);
  m[11] = -1;
  m[14] = (2 * far * near) / (near - far);
  return m;
}

/** Column-major modelView: rotate the field around z, camera fixed at +z. */
function modelView(theta: number, out: Float32Array): Float32Array {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  out.fill(0);
  out[0] = c;
  out[1] = s;
  out[4] = -s;
  out[5] = c;
  out[10] = 1;
  out[14] = -CAMERA_Z;
  out[15] = 1;
  return out;
}

export default function FlowField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mount = mountRef.current;
    if (!mount) return;

    // Adaptive quality: constrained devices trade particle count and DPR for
    // frame rate before the first frame is ever rendered.
    const isMobile = window.innerWidth < 768;
    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowPower =
      (nav.deviceMemory !== undefined && nav.deviceMemory <= 4) ||
      navigator.hardwareConcurrency <= 4;
    const count = isMobile ? (lowPower ? 4500 : 6500) : lowPower ? 10000 : 17000;
    const dpr = Math.min(window.devicePixelRatio || 1, lowPower ? 1.5 : 2);

    const canvas = document.createElement("canvas");
    const attrs: WebGLContextAttributes = {
      alpha: true,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    };
    const gl = (canvas.getContext("webgl2", attrs) ||
      canvas.getContext("webgl", attrs)) as WebGLRenderingContext | null;
    // Bail to the CSS gradient fallback if WebGL is unavailable.
    if (!gl) return;
    mount.appendChild(canvas);

    // --- Program ---
    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };
    const vs = compile(gl.VERTEX_SHADER, vertexShader);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentShader);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      if (canvas.parentNode === mount) mount.removeChild(canvas);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      if (canvas.parentNode === mount) mount.removeChild(canvas);
      return;
    }
    gl.useProgram(program);

    // --- Geometry: a generous overscanned field ---
    const HX = 16;
    const HY = 11;
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() * 2 - 1) * HX;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * HY;
      positions[i * 3 + 2] = (Math.random() * 2 - 1) * 4;
      scales[i] = 18 + Math.random() * 26;
      seeds[i] = Math.random();
    }
    const makeBuffer = (data: Float32Array, name: string, size: number) => {
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      return buf;
    };
    const buffers = [
      makeBuffer(positions, "aPosition", 3),
      makeBuffer(scales, "aScale", 1),
      makeBuffer(seeds, "aSeed", 1),
    ];

    // --- Uniforms ---
    const u = (name: string) => gl.getUniformLocation(program, name);
    const uProjection = u("uProjection");
    const uModelView = u("uModelView");
    const uTime = u("uTime");
    const uPointer = u("uPointer");
    const uPointerStrength = u("uPointerStrength");
    gl.uniform1f(u("uSize"), isMobile ? 1.0 : 1.25);
    gl.uniform1f(u("uPixelRatio"), dpr);
    // Ink #15110c, cobalt #2540ff — same values the site has always used.
    gl.uniform3f(u("uInk"), 0x15 / 255, 0x11 / 255, 0x0c / 255);
    gl.uniform3f(u("uCobalt"), 0x25 / 255, 0x40 / 255, 0xff / 255);

    // --- Fixed state: a depthless, normal-blended points pass ---
    gl.disable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const mvMatrix = new Float32Array(16);

    // --- Size / resize ---
    const setSize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniformMatrix4fv(uProjection, false, perspective(w / Math.max(h, 1)));
    };
    setSize();
    window.addEventListener("resize", setSize);

    // --- Pointer → world coords on the z=0 plane ---
    // With the camera on the z axis, the visible half-height at z=0 is
    // tan(fov/2) * cameraZ — no ray casting needed.
    const pointer = { x: 999, y: 999 };
    const target = { x: 999, y: 999 };
    let strength = 0;
    let targetStrength = 0;

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const ndcX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ndcY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      const halfH = Math.tan((FOV_DEG * Math.PI) / 360) * CAMERA_Z;
      target.x = ndcX * halfH * (rect.width / rect.height);
      target.y = ndcY * halfH;
      targetStrength = 1;
    };
    const onLeave = () => {
      targetStrength = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });

    // --- Run/pause gating ---
    let running = true;
    let lost = false;
    let rafId = 0;
    const t0 = performance.now();

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !document.hidden && !lost;
        if (running) loop();
      },
      { threshold: 0 },
    );
    io.observe(mount);

    const onVisibility = () => {
      running = !document.hidden && !lost;
      if (running) loop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // --- Context loss ---
    const onContextLost = (e: Event) => {
      e.preventDefault();
      lost = true;
      running = false;
      cancelAnimationFrame(rafId);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    const loop = () => {
      if (!running) return;
      const t = (performance.now() - t0) / 1000;
      // Ease pointer + strength for fluid response.
      pointer.x += (target.x - pointer.x) * 0.08;
      pointer.y += (target.y - pointer.y) * 0.08;
      strength += (targetStrength - strength) * 0.06;

      gl.uniform1f(uTime, t);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.uniform1f(uPointerStrength, strength);
      gl.uniformMatrix4fv(uModelView, false, modelView(Math.sin(t * 0.04) * 0.06, mvMatrix));

      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, count);
      rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      window.removeEventListener("resize", setSize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      if (!lost) {
        buffers.forEach((b) => b && gl.deleteBuffer(b));
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.getExtension("WEBGL_lose_context")?.loseContext();
      }
      if (canvas.parentNode === mount) mount.removeChild(canvas);
    };
  }, []);

  return <div ref={mountRef} className="flowfield" aria-hidden="true" />;
}
