"use client";
import { useEffect, useRef } from "react";

type Props = {
  accent?: string;
  posX?: number;       // 0..1 innerhalb der initialen Fläche
  posY?: number;       // 0..1 innerhalb der initialen Fläche
  radiusBase?: number; // relativ zur min(initialWidth, initialHeight)
  latSteps?: number;
  lonSteps?: number;
  className?: string;
  lockOnMount?: boolean; // true = Größe/Position an initialen Wrap binden
};

export default function WireSphere({
  accent = "#ff8a00",
  posX = 0.26,
  posY = 0.40,
  radiusBase = 0.62,
  latSteps = 12,
  lonSteps = 28,
  className = "",
  lockOnMount = true,
}: Props) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current!;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // === Initialen Zustand "einfrieren" ===
    const initialRect = wrap.getBoundingClientRect();
    const DPR = Math.min(1.75, window.devicePixelRatio || 1);
    const initialW = Math.max(1, Math.floor(initialRect.width * DPR));
    const initialH = Math.max(1, Math.floor(initialRect.height * DPR));

    // Canvas feste Pixelgröße + feste CSS-Größe (kein ResizeObserver)
    canvas.width = initialW;
    canvas.height = initialH;
    canvas.style.width = `${initialRect.width}px`;
    canvas.style.height = `${initialRect.height}px`;

    // Mesh vorbereiten
    const nodes: { x: number; y: number; z: number }[] = [];
    const edges: [number, number][] = [];
    const idx = (i: number, j: number) => i * lonSteps + ((j + lonSteps) % lonSteps);

    for (let i = 0; i <= latSteps; i++) {
      const v = i / latSteps, th = v * Math.PI;
      for (let j = 0; j < lonSteps; j++) {
        const u = j / lonSteps, ph = u * Math.PI * 2;
        nodes.push({
          x: Math.sin(th) * Math.cos(ph),
          y: Math.cos(th),
          z: Math.sin(th) * Math.sin(ph),
        });
      }
    }
    for (let i = 0; i <= latSteps; i++) {
      for (let j = 0; j < lonSteps; j++) {
        if (i < latSteps) edges.push([idx(i, j), idx(i + 1, j)]);
        edges.push([idx(i, j), idx(i, j + 1)]);
      }
    }

    let rotX = 0.18, rotY = -0.28, t = 0;
    const baseVel = REDUCED ? 0.0006 : 0.0022;
    const velX = baseVel * 1.2, velY = baseVel * 0.85;

    const hex2rgba = (hex: string, a: number) => {
      const m = hex.replace("#", "");
      const b = parseInt(m, 16);
      const r = m.length === 3 ? ((b >> 8) & 0xf) * 17 : (b >> 16) & 255;
      const g = m.length === 3 ? ((b >> 4) & 0xf) * 17 : (b >> 8) & 255;
      const bl = m.length === 3 ? (b & 0xf) * 17 : b & 255;
      return `rgba(${r},${g},${bl},${a})`;
    };

    function project(p: { x: number; y: number; z: number }, w: number, h: number, cx: number, cy: number) {
      const cX = Math.cos(rotX), sX = Math.sin(rotX);
      const cY = Math.cos(rotY), sY = Math.sin(rotY);
      const { x, y, z } = p;
      const x1 = cY * x + sY * z;
      const z1 = -sY * x + cY * z;
      const y2 = cX * y - sX * z1;
      const z2 = sX * y + cX * z1;
      const R = radiusBase * Math.min(w, h);
      const f = R / (z2 + 2.2);
      return { sx: cx + x1 * f, sy: cy + y2 * f, depth: z2 };
    }

    let raf = 0;
    const render = () => {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Drift relativ zur initialen Fläche (bleibt gleich, wenn Leadform intern resizet)
      t += 0.002;
      const driftX = Math.sin(t * 1.5) * (w * 0.02);
      const driftY = Math.cos(t * 1.2) * (h * 0.015);
      const cx = w * posX + driftX;
      const cy = h * posY + driftY;

      const glow = REDUCED ? 0.06 : 0.16 + 0.1 * Math.sin(t * 0.9 + 1.1);
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w, h) * 0.65);
      grd.addColorStop(0, hex2rgba(accent, Math.max(0, glow)));
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);

      const pts = nodes.map((p) => project(p, w, h, cx, cy));
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.strokeStyle = accent;
      ctx.lineWidth = Math.max(1, (REDUCED ? 0.7 : 1.1) * DPR);

      for (const [a, b] of edges) {
        const pa = pts[a], pb = pts[b];
        const depth = ((pa.depth + pb.depth) / 2 + 1) / 2;
        ctx.globalAlpha = (0.22 + 0.6 * depth) * (REDUCED ? 0.26 : 0.36);
        ctx.beginPath();
        ctx.moveTo(pa.sx, pa.sy);
        ctx.lineTo(pb.sx, pb.sy);
        ctx.stroke();
      }

      ctx.globalAlpha = REDUCED ? 0.24 : 0.34;
      for (const p of pts) {
        const size = (1.3 + 1.7 * (p.depth + 1)) * DPR;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.fill();
      }

      rotX += velX + Math.sin(t * 0.7) * 0.0003;
      rotY += velY + Math.cos(t * 0.9) * 0.0003;
      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    // Keine ResizeObserver/Widow-Resize Reaktion bei lockOnMount
    let onResize: (() => void) | null = null;
    if (!lockOnMount) {
      onResize = () => {
        const r = wrap.getBoundingClientRect();
        const newW = Math.max(1, Math.floor(r.width * DPR));
        const newH = Math.max(1, Math.floor(r.height * DPR));
        canvas.width = newW;
        canvas.height = newH;
        canvas.style.width = `${r.width}px`;
        canvas.style.height = `${r.height}px`;
      };
      window.addEventListener("resize", onResize, { passive: true });
    }

    return () => {
      cancelAnimationFrame(raf);
      if (onResize) window.removeEventListener("resize", onResize);
    };
  }, [accent, posX, posY, radiusBase, latSteps, lonSteps, lockOnMount]);

  return (
    <div ref={wrapRef} className={`absolute inset-0 pointer-events-none ${className || ""}`}>
      <canvas ref={canvasRef} className="block opacity-[0.97]" />
    </div>
  );
}
