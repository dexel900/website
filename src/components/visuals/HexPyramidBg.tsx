"use client";
import { useEffect, useRef } from "react";

/** Centered hexagonal pyramid with soft glow (light gray). */
export default function HexPyramidBg() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrapper = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const COLOR = "#D5D9E1";
    const POS_X = 0.5;
    const POS_Y = 0.5;
    const RADIUS_BASE = 0.8;
    const DPR_CAP = 1.75;
    const REDUCED =
      typeof window !== "undefined" &&
      matchMedia("(prefers-reduced-motion: reduce)").matches;

    let DPR = Math.min(DPR_CAP, window.devicePixelRatio || 1);
    let t = 0;
    let rotX = -0.12;
    let rotY = 0.22;
    const vel = REDUCED ? 0.0005 : 0.0016;
    let raf = 0;

    const vertices: { x: number; y: number; z: number }[] = [];
    const edges: [number, number][] = [];
    vertices.push({ x: 0, y: +1, z: 0 });
    const N = 6;
    for (let k = 0; k < N; k++) {
      const a = (Math.PI * 2 * k) / N;
      vertices.push({ x: Math.cos(a), y: -1, z: Math.sin(a) });
    }
    for (let k = 1; k <= N; k++) edges.push([0, k]);
    for (let k = 1; k <= N; k++) edges.push([k, k === N ? 1 : k + 1]);

    function resize() {
      const r = wrapper.getBoundingClientRect();
      const w = Math.max(1, Math.floor(r.width * DPR));
      const h = Math.max(1, Math.floor(r.height * DPR));
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${r.width}px`;
      canvas.style.height = `${r.height}px`;
    }

    const ro = new ResizeObserver(() => {
      DPR = Math.min(DPR_CAP, window.devicePixelRatio || 1);
      resize();
    });
    ro.observe(wrapper);
    window.addEventListener(
      "resize",
      () => {
        DPR = Math.min(DPR_CAP, window.devicePixelRatio || 1);
        resize();
      },
      { passive: true }
    );
    resize();

    function hex2rgba(hex: string, a: number) {
      const m = hex.replace("#", "");
      const b = parseInt(m, 16);
      const r = m.length === 3 ? ((b >> 8) & 0xf) * 17 : (b >> 16) & 255;
      const g = m.length === 3 ? ((b >> 4) & 0xf) * 17 : (b >> 8) & 255;
      const bl = m.length === 3 ? (b & 0xf) * 17 : b & 255;
      return `rgba(${r},${g},${bl},${a})`;
    }

    function project(
      p: { x: number; y: number; z: number },
      w: number,
      h: number,
      cx: number,
      cy: number
    ) {
      const breath = REDUCED ? 0 : 0.015 * Math.sin(t * 0.9);
      const px = p.x * (1 + breath),
        py = p.y,
        pz = p.z * (1 + breath);

      const cY = Math.cos(rotY),
        sY = Math.sin(rotY);
      const x1 = cY * px + sY * pz;
      const z1 = -sY * px + cY * pz;

      const cX = Math.cos(rotX),
        sX = Math.sin(rotX);
      const y2 = cX * py - sX * z1;
      const z2 = sX * py + cX * z1;

      const R = RADIUS_BASE * Math.min(w, h);
      const f = R / (z2 + 3.0);
      return { sx: cx + x1 * f, sy: cy + y2 * f, depth: z2 };
    }

    function render() {
      const w = canvas.width,
        h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      t += 0.002;
      const driftX = Math.sin(t * 1.1) * (w * 0.008);
      const driftY = Math.cos(t * 0.9) * (h * 0.008);
      const cx = w * POS_X + driftX;
      const cy = h * POS_Y + driftY;

      const glow = REDUCED ? 0.04 : 0.08 + 0.05 * Math.sin(t * 0.8);
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.55);
      grd.addColorStop(0, hex2rgba(COLOR, Math.max(0, glow)));
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      const pts = vertices.map((p) => project(p, w, h, cx, cy));
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = COLOR;
      ctx.fillStyle = COLOR;

      for (const [a, b] of edges) {
        const pa = pts[a],
          pb = pts[b];
        const depth = ((pa.depth + pb.depth) / 2 + 1) / 2; // 0..1
        ctx.globalAlpha = (0.25 + 0.55 * depth) * (REDUCED ? 0.35 : 0.48);
        ctx.lineWidth = Math.max(1, (0.8 + 0.5 * depth) * DPR);
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      }

      ctx.globalAlpha = REDUCED ? 0.45 : 0.6;
      for (const p of pts) {
        const size = (1.6 + 1.2 * (p.depth + 1)) * DPR;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      rotY += vel;
      rotX += Math.sin(t * 0.7) * 0.00025;

      raf = requestAnimationFrame(render);
    }

    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize as any);
    };
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 z-0 pointer-events-none">
      <canvas ref={canvasRef} className="w-full h-full block opacity-95" />
    </div>
  );
}
