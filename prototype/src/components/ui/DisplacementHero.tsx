"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Texture } from "ogl";

type Props = {
  src: string;
  className?: string;
};

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uResolution;
  uniform vec2 uImageRes;

  vec2 cover(vec2 uv, vec2 imgRes, vec2 res) {
    float imgAspect = imgRes.x / imgRes.y;
    float resAspect = res.x / res.y;
    vec2 scale = vec2(1.0);
    if (resAspect < imgAspect) {
      scale.x = resAspect / imgAspect;
    } else {
      scale.y = imgAspect / resAspect;
    }
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = cover(vUv, uImageRes, uResolution);

    // Mouse displacement falloff
    float d = distance(vUv, uMouse);
    float pull = smoothstep(0.45, 0.0, d) * 0.05;

    // Scroll-driven horizontal stretch
    float stretch = uScroll * 0.04;

    // Wobble — slow turbulence
    float wave = sin((uv.y + uTime * 0.05) * 8.0) * 0.0035;

    vec2 distorted = uv;
    distorted.x += wave + pull * (uMouse.x - vUv.x) * 2.2;
    distorted.y += pull * (uMouse.y - vUv.y) * 2.2 + stretch;

    vec3 base = texture2D(uTexture, distorted).rgb;

    // RGB split on hover/scroll
    float split = pull * 0.45 + uScroll * 0.012;
    float r = texture2D(uTexture, distorted + vec2(split, 0.0)).r;
    float b = texture2D(uTexture, distorted - vec2(split, 0.0)).b;
    vec3 color = vec3(r, base.g, b);

    // Vignette + crush blacks
    float vig = smoothstep(1.1, 0.4, distance(vUv, vec2(0.5)));
    color *= mix(0.55, 1.0, vig);

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function DisplacementHero({ src, className = "" }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const cleanupRef = useRef<() => void>();

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const renderer = new Renderer({ alpha: false, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) });
    const gl = renderer.gl;
    gl.clearColor(0.04, 0.04, 0.04, 1);
    wrap.appendChild(gl.canvas);
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.display = "block";

    const texture = new Texture(gl, { generateMipmaps: false });
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    let imgRes: [number, number] = [1920, 1080];
    img.onload = () => {
      texture.image = img;
      imgRes = [img.naturalWidth, img.naturalHeight];
      program.uniforms.uImageRes.value = imgRes;
    };

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTexture: { value: texture },
        uMouse: { value: [0.5, 0.5] },
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uResolution: { value: [wrap.clientWidth, wrap.clientHeight] },
        uImageRes: { value: imgRes },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    const onResize = () => {
      renderer.setSize(wrap.clientWidth, wrap.clientHeight);
      program.uniforms.uResolution.value = [wrap.clientWidth, wrap.clientHeight];
    };
    onResize();
    window.addEventListener("resize", onResize);

    const targetMouse: [number, number] = [0.5, 0.5];
    const currentMouse: [number, number] = [0.5, 0.5];
    const onMove = (e: PointerEvent) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      targetMouse[0] = Math.min(Math.max(x, 0), 1);
      targetMouse[1] = Math.min(Math.max(y, 0), 1);
    };
    window.addEventListener("pointermove", onMove);

    let targetScroll = 0;
    let currentScroll = 0;
    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const h = rect.height || 1;
      targetScroll = Math.min(Math.max(-rect.top / h, 0), 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    let raf = 0;
    const start = performance.now();
    const tick = () => {
      currentMouse[0] += (targetMouse[0] - currentMouse[0]) * 0.07;
      currentMouse[1] += (targetMouse[1] - currentMouse[1]) * 0.07;
      currentScroll += (targetScroll - currentScroll) * 0.08;
      program.uniforms.uMouse.value = currentMouse;
      program.uniforms.uScroll.value = currentScroll;
      program.uniforms.uTime.value = (performance.now() - start) / 1000;
      renderer.render({ scene: mesh });
      raf = requestAnimationFrame(tick);
    };
    tick();

    cleanupRef.current = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      try {
        wrap.removeChild(gl.canvas);
      } catch {
        /* noop */
      }
    };

    return () => cleanupRef.current?.();
  }, [src]);

  return <div ref={wrapRef} className={`absolute inset-0 ${className}`} />;
}
