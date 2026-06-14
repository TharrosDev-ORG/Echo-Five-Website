"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/gsap";

/* ------------------------------------------------------------------ *
 * GPU particle flow field. Fine points drift along a curl-noise field
 * like slow currents — the site's "change in motion / flow" motif — and
 * scatter away from the pointer, settling back when it leaves. Tuned for
 * a light background: dark ink points with cobalt picked out in the
 * fastest currents, normal-blended so density reads as soft graphite.
 * ------------------------------------------------------------------ */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uPointerStrength;
  uniform float uSize;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute float aSeed;
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
    vec3 pos = position;
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

    vec4 mv = modelViewMatrix * vec4(displaced, 1.0);
    gl_Position = projectionMatrix * mv;
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

export default function FlowField() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const mount = mountRef.current;
    if (!mount) return;

    // Bail to the CSS gradient fallback if WebGL is unavailable.
    const probe = document.createElement("canvas");
    const hasWebGL = !!(
      probe.getContext("webgl2") || probe.getContext("webgl")
    );
    if (!hasWebGL) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 6500 : 17000;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 11);

    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(dpr);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

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
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));

    const uniforms = {
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2(999, 999) },
      uPointerStrength: { value: 0 },
      uSize: { value: isMobile ? 1.0 : 1.25 },
      uPixelRatio: { value: dpr },
      uInk: { value: new THREE.Color("#15110c") },
      uCobalt: { value: new THREE.Color("#2540ff") },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // --- Pointer → world coords on the z=0 plane ---
    const targetPointer = new THREE.Vector2(999, 999);
    const ndc = new THREE.Vector2();
    const ray = new THREE.Vector3();
    let targetStrength = 0;

    const toWorld = (clientX: number, clientY: number) => {
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      ray.set(ndc.x, ndc.y, 0.5).unproject(camera).sub(camera.position).normalize();
      const dist = -camera.position.z / ray.z;
      targetPointer.set(
        camera.position.x + ray.x * dist,
        camera.position.y + ray.y * dist,
      );
    };

    const onMove = (e: PointerEvent) => {
      toWorld(e.clientX, e.clientY);
      targetStrength = 1;
    };
    const onLeave = () => {
      targetStrength = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerout", onLeave, { passive: true });

    // --- Resize ---
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // --- Run/pause gating ---
    let running = true;
    let rafId = 0;
    const clock = new THREE.Clock();

    const io = new IntersectionObserver(
      ([entry]) => {
        running = entry.isIntersecting && !document.hidden;
        if (running) loop();
      },
      { threshold: 0 },
    );
    io.observe(mount);

    const onVisibility = () => {
      running = !document.hidden;
      if (running) loop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // --- Context loss ---
    const onContextLost = (e: Event) => {
      e.preventDefault();
      running = false;
      cancelAnimationFrame(rafId);
    };
    renderer.domElement.addEventListener("webglcontextlost", onContextLost);

    const loop = () => {
      if (!running) return;
      uniforms.uTime.value = clock.getElapsedTime();
      // Ease pointer + strength for fluid response.
      uniforms.uPointer.value.lerp(targetPointer, 0.08);
      uniforms.uPointerStrength.value +=
        (targetStrength - uniforms.uPointerStrength.value) * 0.06;
      points.rotation.z = Math.sin(clock.getElapsedTime() * 0.04) * 0.06;
      renderer.render(scene, camera);
      rafId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerout", onLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="flowfield" aria-hidden="true" />;
}
