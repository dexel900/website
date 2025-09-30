"use client";
import { useEffect, useRef } from "react";

type Pt = { x: number; y: number };

export default function HeroScribble() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastMove = useRef<number>(0);

  const target = useRef<Pt>({ x: 0, y: 0 });
  const pos = useRef<Pt>({ x: 0, y: 0 });
  const points = useRef<Pt[]>(Array.from({ length: 80 }, () => ({ x: 0, y: 0 })));

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, v));
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  function toSmoothPathCR(pts: Pt[], tension = 0.6) {
    const n = pts.length;
    if (n < 2) return "";
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < n - 1; i++) {
      const p0 = pts[i - 1] ?? pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] ?? p2;

      const c1x = p1.x + (p2.x - p0.x) * (tension / 6);
      const c1y = p1.y + (p2.y - p0.y) * (tension / 6);
      const c2x = p2.x - (p3.x - p1.x) * (tension / 6);
      const c2y = p2.y - (p3.y - p1.y) * (tension / 6);

      d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
    }
    return d;
  }

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // 🎯 die Hero-Section selbst als root
    const root = svg.closest("section") as HTMLElement;
    if (!root) return;

    let w = root.clientWidth;
    let h = root.clientHeight;

    const centerAll = () => {
      const cx = w / 2,
        cy = h / 2;
      target.current = { x: cx, y: cy };
      pos.current = { x: cx, y: cy };
      points.current = points.current.map(() => ({ x: cx, y: cy }));
    };
    centerAll();

    const onMove = (e: MouseEvent) => {
      lastMove.current = performance.now();
      const r = root.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      target.current.x = clamp(x, 0, r.width);
      target.current.y = clamp(y, 0, r.height);
    };

    const ro = new ResizeObserver(() => {
      w = root.clientWidth;
      h = root.clientHeight;
      centerAll();
    });

    // 👉 Listener direkt an die Section binden
    window.addEventListener("mousemove", (e) => {
    lastMove.current = performance.now();
    const r = root.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    target.current.x = clamp(x, 0, r.width);
    target.current.y = clamp(y, 0, r.height);
    }, { passive: true });
    ro.observe(root);

    let tPrev = performance.now();
    let t = 0;
    const phi = 0.61803398875;

    const tick = () => {
      const now = performance.now();
      const dt = now - tPrev;
      tPrev = now;
      t += dt;

      const idle = now - lastMove.current > 1200;

      if (idle) {
        const cx = w / 2,
          cy = h / 2;
        const s = t * 0.001;
        const base = Math.min(w, h);
        const rX = base * (0.28 + 0.05 * Math.sin(s * 0.6));
        const rY = base * (0.2 + 0.05 * Math.cos(s * 0.45));
        const wobX = 0.14 * rX * Math.cos(s * 2.4 + phi);
        const wobY = 0.14 * rY * Math.sin(s * 2.0 + phi * 2);

        target.current.x = cx + rX * Math.cos(s * 0.9) + wobX;
        target.current.y = cy + rY * Math.sin(s * 1.25) + wobY;
      }

      pos.current.x = lerp(pos.current.x, target.current.x, 0.08);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.08);

      points.current.pop();
      points.current.unshift({ x: pos.current.x, y: pos.current.y });

      if (pathRef.current) {
        pathRef.current.setAttribute("d", toSmoothPathCR(points.current, 0.6));
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      root.removeEventListener("mousemove", onMove);
      ro.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10"
      width="100%"
      height="100%"
    >
      <defs>
        <filter id="hero-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        ref={pathRef}
        d="M 0 0"
        stroke="var(--accent, #FF8A00)"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        filter="url(#hero-glow)"
        opacity="0.85"
      />
    </svg>
  );
}
