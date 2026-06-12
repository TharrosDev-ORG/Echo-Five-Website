"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * The hero "echo field": a GPU particle plane that carries the sonar
 * callsign literally. Echo pulses propagate outward as expanding rings,
 * lifting and lighting particles as the wavefront passes. The pointer
 * gently parallaxes the camera.
 *
 * Performance: one BufferGeometry + one custom ShaderMaterial (a single
 * draw call), DPR capped, particle count reduced on small screens, and
 * the render loop pauses when the canvas is off-screen or the tab is
 * hidden. Reduced motion renders one static frame.
 */

const MAX_PULSES = 3;

const VERT = /* glsl */ `
  uniform float uTime;
  uniform vec4 uPulses[${MAX_PULSES}]; // x, z origin · start time · strength
  uniform float uPixelRatio;

  varying float vGlow;
  varying float vDepth;

  void main() {
    vec3 p = position;

    // Slow base swell so the field is never dead still.
    float swell =
      sin(p.x * 0.28 + uTime * 0.5) * 0.32 +
      sin(p.z * 0.42 - uTime * 0.34) * 0.26 +
      sin((p.x + p.z) * 0.16 + uTime * 0.22) * 0.3;

    // Propagating echo rings.
    float glow = 0.0;
    float lift = 0.0;
    for (int i = 0; i < ${MAX_PULSES}; i++) {
      vec4 pulse = uPulses[i];
      float age = uTime - pulse.z;
      if (age < 0.0) continue;
      float radius = age * 5.2;                  // wavefront speed
      float d = distance(p.xz, pulse.xy);
      float band = exp(-pow((d - radius) * 0.9, 2.0)); // gaussian wavefront
      float fade = exp(-age * 0.42) * pulse.w;          // ring dies out
      lift += band * fade * 1.6;
      glow += band * fade;
    }

    p.y += swell + lift;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;

    vDepth = clamp((-mv.z - 4.0) / 34.0, 0.0, 1.0);
    vGlow = clamp(glow + max(swell, 0.0) * 0.12, 0.0, 1.0);

    gl_PointSize = (1.1 + vGlow * 2.6) * uPixelRatio * (10.0 / -mv.z);
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uColorDim;
  uniform vec3 uColorSignal;

  varying float vGlow;
  varying float vDepth;

  void main() {
    // Soft round point.
    float r = length(gl_PointCoord - 0.5);
    float disc = smoothstep(0.5, 0.18, r);
    if (disc < 0.01) discard;

    vec3 color = mix(uColorDim, uColorSignal, vGlow);
    float alpha = disc * mix(0.5, 1.0, vGlow) * (1.0 - vDepth * 0.85);
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function EchoField() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    } catch {
      return; // No WebGL: the CSS grid backdrop still carries the hero.
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 80);
    camera.position.set(0, 6.2, 17);
    camera.lookAt(0, 0.2, -2);

    // Particle plane.
    const cols = small ? 120 : 220;
    const rows = small ? 80 : 130;
    const width = 64;
    const depth = 40;
    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        positions[i++] = (c / (cols - 1) - 0.5) * width;
        positions[i++] = 0;
        positions[i++] = (r / (rows - 1) - 0.5) * depth - 6;
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const pulses = Array.from({ length: MAX_PULSES }, () => new THREE.Vector4(0, 0, -100, 0));
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPulses: { value: pulses },
        uPixelRatio: { value: dpr },
        uColorDim: { value: new THREE.Color("#2a3b55") },
        uColorSignal: { value: new THREE.Color("#7fd4f2") },
      },
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Echo pulse scheduler: round-robin re-seed, slightly randomized origin.
    let pulseIndex = 0;
    const seedPulse = (t: number, strength = 1) => {
      const v = pulses[pulseIndex];
      v.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 18 - 6, t, strength);
      pulseIndex = (pulseIndex + 1) % MAX_PULSES;
    };

    // Pointer parallax (desktop only — touch scroll should not fight it).
    const target = { x: 0, y: 0 };
    const onPointer = (e: PointerEvent) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!small && !reduceMotion) window.addEventListener("pointermove", onPointer, { passive: true });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = host;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const clock = new THREE.Clock();
    let raf = 0;
    let visible = true;
    let nextPulseAt = 0.6;

    const frame = () => {
      const t = clock.getElapsedTime();
      material.uniforms.uTime.value = t;

      if (t >= nextPulseAt) {
        seedPulse(t, 0.75 + Math.random() * 0.45);
        nextPulseAt = t + 2.2 + Math.random() * 1.6;
      }

      camera.position.x += (target.x * 1.6 - camera.position.x) * 0.04;
      camera.position.y += (6.2 - target.y * 0.9 - camera.position.y) * 0.04;
      camera.lookAt(0, 0.2, -2);

      renderer.render(scene, camera);
      if (visible) raf = requestAnimationFrame(frame);
    };

    if (reduceMotion) {
      // One composed still: a wavefront frozen mid-field.
      material.uniforms.uTime.value = 2.4;
      pulses[0].set(0, -6, 1.0, 1);
      renderer.render(scene, camera);
    } else {
      // Pause off-screen / hidden tab.
      const io = new IntersectionObserver(([entry]) => {
        const wasVisible = visible;
        visible = entry.isIntersecting && !document.hidden;
        if (visible && !wasVisible) raf = requestAnimationFrame(frame);
        if (!visible) cancelAnimationFrame(raf);
      });
      io.observe(host);
      const onVis = () => {
        const wasVisible = visible;
        visible = !document.hidden;
        if (visible && !wasVisible) raf = requestAnimationFrame(frame);
        if (!visible) cancelAnimationFrame(raf);
      };
      document.addEventListener("visibilitychange", onVis);
      raf = requestAnimationFrame(frame);

      const cleanupExtra = () => {
        io.disconnect();
        document.removeEventListener("visibilitychange", onVis);
      };
      (host as HTMLElement & { __cleanup?: () => void }).__cleanup = cleanupExtra;
    }

    return () => {
      cancelAnimationFrame(raf);
      (host as HTMLElement & { __cleanup?: () => void }).__cleanup?.();
      window.removeEventListener("pointermove", onPointer);
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={hostRef} aria-hidden="true" className="absolute inset-0" />;
}
