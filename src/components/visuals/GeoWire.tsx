"use client";
import { useEffect, useRef } from "react";

type ShapeKey = "globe" | "cube" | "diamond" | "torus";

type Props = {
  shape: ShapeKey;
  className?: string;
  accent?: string;
  strength?: number;        // 0..1
  sizeClass?: string;       // Tailwind width
  shiftXvw?: number;        // negative = links, positiv = rechts
};

export default function GeoWire({
  shape,
  className = "",
  accent = "#FF8A00",
  strength = 0.40,
  sizeClass = "w-[clamp(500px,76vmin,1040px)]",
  shiftXvw = 24,
}: Props) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const holderRef = useRef<HTMLDivElement | null>(null);
  const lastBFrontDRef = useRef<string>("");
const lastBBackDRef  = useRef<string>("");
const morphStartRef = useRef<number>(0);


  // Layer A (current)
  const A_wrap = useRef<SVGGElement | null>(null);
  const A_backPath = useRef<SVGPathElement | null>(null);
  const A_frontPath = useRef<SVGPathElement | null>(null);

  // Layer B (incoming)
  const B_wrap = useRef<SVGGElement | null>(null);
  const B_backPath = useRef<SVGPathElement | null>(null);
  const B_frontPath = useRef<SVGPathElement | null>(null);

  const reduce =
    typeof window !== "undefined" &&
    matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Szene
  const SCALE = 520;
  const CAM_Z = 6;
  const STROKE_FRONT = 1.4;
  const STROKE_BACK = 1.0;

  // ---------- Math ----------
  const rotXYZ = ([x,y,z]: number[], rx: number, ry: number, rz: number) => {
    const cx=Math.cos(rx), sx=Math.sin(rx);
    const cy=Math.cos(ry), sy=Math.sin(ry);
    const cz=Math.cos(rz), sz=Math.sin(rz);
    let X = x*cz - y*sz, Y = x*sz + y*cz, Z = z; // Z
    let Y2 = Y*cx - Z*sx, Z2 = Y*sx + Z*cx;     // X
    let X3 = X*cy + Z2*sy, Z3 = -X*sy + Z2*cy;  // Y
    return [X3, Y2, Z3];
  };
  const project = ([x,y,z]: number[]) => {
    const p = CAM_Z / (CAM_Z - z);
    return [x * p * SCALE, y * p * SCALE, z] as [number, number, number];
  };
  const lerp = (a: number[], b: number[], t: number) =>
    [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t, a[2]+(b[2]-a[2])*t];

  // **Normalize** (max-Radius = 1)
  function normalize(v: number[][]) {
    let maxR = 0;
    for (const p of v) {
      const r = Math.hypot(p[0], p[1], p[2]);
      if (r > maxR) maxR = r;
    }
    const s = maxR > 0 ? 1 / maxR : 1;
    return v.map(([x,y,z]) => [x*s, y*s, z*s]);
  }

  // ---------- Shapes → Kantenliste ----------
  function buildGlobe(latRings = 9, lonRings = 16) {
    const v: number[][] = [];
    const edges: [number, number][] = [];
    for (let i=1;i<=latRings;i++){
      const th = Math.PI * i/(latRings+1);
      const y = Math.cos(th), r = Math.sin(th);
      const start = v.length, segs = lonRings*2;
      for (let j=0;j<segs;j++){
        const ph = (j/segs)*Math.PI*2;
        v.push([Math.cos(ph)*r, y, Math.sin(ph)*r]);
        if (j) edges.push([start+j-1, start+j]);
      }
      edges.push([start+segs-1, start]);
    }
    const segs = lonRings*2;
    for (let j=0;j<segs;j++){
      let prev: number | null = null;
      for (let i=0;i<latRings;i++){
        const idx = i*segs + (j%segs);
        if (prev!==null) edges.push([prev, idx]);
        prev = idx;
      }
    }
    return { v: normalize(v), e: edges };
  }

  function buildCubeDense(div = 8) {
    const base = [
      [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
      [-1,-1, 1],[1,-1, 1],[1,1, 1],[-1,1, 1],
    ];
    const faces = [
      [0,1,2,3],[4,5,6,7],[0,1,5,4],[2,3,7,6],[1,2,6,5],[0,3,7,4]
    ];
    const v: number[][] = [...base];
    const e: [number, number][] = [];
    const addLine = (a: number[], b: number[]) => {
      const ai = v.push(a)-1, bi = v.push(b)-1; e.push([ai,bi]);
    };
    faces.forEach(([a,b,c,d])=>{
      const A=base[a],B=base[b],C=base[c],D=base[d];
      for(let t=0;t<=div;t++){
        const tt=t/div;
        addLine(lerp(A,D,tt), lerp(B,C,tt));
        addLine(lerp(A,B,tt), lerp(D,C,tt));
      }
    });
    return { v: normalize(v), e };
  }

  function buildDiamond(div = 14) {
    const N=[0,1,0], S=[0,-1,0], E=[1,0,0], W=[-1,0,0], F=[0,0,1], B=[0,0,-1];
    const faces = [
      [N,E,F],[N,F,W],[N,W,B],[N,B,E],
      [S,F,E],[S,W,F],[S,B,W],[S,E,B],
    ];
    const verts: number[][] = [];
    const edges: [number, number][] = [];
    const add = (p:number[]) => (verts.push(p)-1);
    for (const [A,B,C] of faces) {
      for (let i=0;i<=div;i++){
        const t=i/div; const P = lerp(A,B,t), Q = lerp(A,C,t);
        const i1 = add(P), i2 = add(Q); edges.push([i1,i2]);
      }
      for (let j=0;j<=div;j++){
        const s=j/div; const R = lerp(B,C,s);
        const i1 = add(A), i2 = add(R); edges.push([i1,i2]);
      }
    }
    return { v: normalize(verts), e: edges };
  }

  function buildTorus(R = 1, r = 0.46, major = 36, minor = 24) {
    const verts: number[][] = [];
    const edges: [number, number][] = [];
    for (let i=0;i<minor;i++){
      const th=(i/minor)*Math.PI*2, cy=Math.cos(th), sy=Math.sin(th);
      const start=verts.length;
      for(let j=0;j<major;j++){
        const ph=(j/major)*Math.PI*2;
        const x=(R+r*cy)*Math.cos(ph), y=r*sy, z=(R+r*cy)*Math.sin(ph);
        verts.push([x,y,z]); if(j) edges.push([start+j-1,start+j]);
      }
      edges.push([start+major-1,start]);
    }
    for(let j=0;j<major;j++){
      for(let i=0;i<minor;i++){
        const a=i*major+j, b=((i+1)%minor)*major+j; edges.push([a,b]);
      }
    }
    const maxR = 1 + r;
    return { v: normalize(verts.map(([x,y,z])=>[x/maxR,y/maxR,z/maxR])), e: edges };
  }

  // ---------- Daten + Controller ----------
  const currentRef = useRef<{ v:number[][]; e:[number,number][] }>(buildGlobe());
  const pendingShapeRef = useRef<ShapeKey | null>(null);

  // Morph progress 0..1 (Crossfade + Scale)
  const morphRef = useRef(0);
  const morphActiveRef = useRef(false);
  const morphDur = 420; // ms
  const lastSwitchAtRef = useRef(0); // Debounce

  const pick = (k: ShapeKey) => {
    if (k==="globe")   return buildGlobe(9,16);
    if (k==="cube")    return buildCubeDense(8);
    if (k==="diamond") return buildDiamond(14);
    if (k==="torus")   return buildTorus();
    return buildGlobe(9,16);
  };

  // Build one path string for all edges of a layer
  function pathsFor(shape: { v:number[][]; e:[number,number][] }, rx:number, ry:number, rz:number) {
    const rot = shape.v.map(p => rotXYZ(p, rx, ry, rz));
    const proj = rot.map(project);

    let frontD = "";
    let backD = "";
    for (const [i,j] of shape.e) {
      const a = proj[i], b = proj[j];
      const zMid = (rot[i][2] + rot[j][2]) / 2;
      const seg = `M${a[0].toFixed(1)},${a[1].toFixed(1)}L${b[0].toFixed(1)},${b[1].toFixed(1)}`;
      if (zMid < 0) backD += seg;
      else frontD += seg;
    }
    return { frontD, backD };
  }

  // RAF Loop
  useEffect(() => {
    const svg = svgRef.current!;
    const holder = holderRef.current!;
    const aWrap = A_wrap.current!, aBack = A_backPath.current!, aFront = A_frontPath.current!;
    const bWrap = B_wrap.current!, bBack = B_backPath.current!, bFront = B_frontPath.current!;

    // Stil
    const glowAlpha = Math.max(0, Math.min(1, 0.05 * strength));
    svg.style.filter =
      `drop-shadow(0 10px 22px rgba(0,0,0,.18)) drop-shadow(0 0 24px ${accent}${Math.round(glowAlpha*255).toString(16).padStart(2,"0")})`;

    const frontOpacityBase = 0.95 * strength;
    const backOpacityBase  = 0.38 * strength;

    aFront.setAttribute("stroke", accent);
    aBack.setAttribute("stroke", accent);
    bFront.setAttribute("stroke", accent);
    bBack.setAttribute("stroke", accent);

    aFront.setAttribute("stroke-width", String(STROKE_FRONT));
    aBack.setAttribute("stroke-width", String(STROKE_BACK));
    bFront.setAttribute("stroke-width", String(STROKE_FRONT));
    bBack.setAttribute("stroke-width", String(STROKE_BACK));
    aBack.setAttribute("stroke-dasharray", "6 6");
    bBack.setAttribute("stroke-dasharray", "6 6");

    let t = 0;
    let raf = 0;
    let rxBase = 0.35, ryBase = 0.0, rzBase = 0.0;

    // incoming cache
    let incoming = pick(shape); // initial
    pendingShapeRef.current = null;

    const ease = (x:number) => (x<0.5 ? 4*x*x*x : 1 - Math.pow(-2*x + 2, 3) / 2);

    const loop = (now: number) => {
      holder.style.transform = `translateX(${shiftXvw}vw)`;

      // Rotation
      const rx = rxBase + Math.sin(t*0.00014)*0.04;
      const ry = ryBase + t*0.00008 + Math.sin(t*0.00011)*0.02;
      const rz = rzBase;

      // Morph scheduler (no double-runs)

      if (!morphActiveRef.current && pendingShapeRef.current) {
        incoming = pick(pendingShapeRef.current);
        pendingShapeRef.current = null;
        morphActiveRef.current = true;
        morphRef.current = 0;
        morphStartRef.current = performance.now();
      }

      // Draw A (current) & B (incoming) with crossfade
      const A = currentRef.current;
      const { frontD: A_f, backD: A_b } = pathsFor(A, rx, ry, rz);
      aFront.setAttribute("d", A_f);
      aBack.setAttribute("d", A_b);

      let alphaA = 1, alphaB = 0, scaleA = 1, scaleB = 0.55;

if (morphActiveRef.current && !reduce) {
  // Zeitbasiert statt dt=16
  const elapsed = performance.now() - morphStartRef.current;
  const p = Math.min(1, elapsed / morphDur);
  morphRef.current = p;

  const e = p < 0.5 ? 4*p*p*p : 1 - Math.pow(-2*p + 2, 3) / 2; // easeInOutCubic

  alphaA = 1 - e;
  alphaB = e;

  // Kein Overshoot mehr → endet exakt bei 1.00
  scaleA = 1 - e * (1 - 0.55);
  scaleB = 0.55 + e * (1.00 - 0.55);

  // B zeichnen
  const { frontD: B_f, backD: B_b } = pathsFor(incoming, rx, ry, rz);
  bFront.setAttribute("d", B_f);
  bBack.setAttribute("d", B_b);
  lastBFrontDRef.current = B_f;
  lastBBackDRef.current  = B_b;

  if (p >= 1) {
    // Commit im gleichen Frame (kein Flackern)
    currentRef.current = incoming;

    aFront.setAttribute("d", lastBFrontDRef.current);
    aBack.setAttribute("d",  lastBBackDRef.current);

    alphaA = 1; alphaB = 0;
    scaleA = 1; scaleB = 0.55;

    bFront.removeAttribute("d");
    bBack.removeAttribute("d");

    morphActiveRef.current = false;
    morphRef.current = 0;
    lastBFrontDRef.current = "";
    lastBBackDRef.current  = "";
  }
} else {
  // kein Morph aktiv → B verstecken
  bFront.removeAttribute("d");
  bBack.removeAttribute("d");
}



      // Apply alpha & scale
      aFront.setAttribute("stroke-opacity", String(frontOpacityBase * alphaA));
      aBack.setAttribute("stroke-opacity",  String(backOpacityBase  * alphaA));
      bFront.setAttribute("stroke-opacity", String(frontOpacityBase * alphaB));
      bBack.setAttribute("stroke-opacity",  String(backOpacityBase  * alphaB));

      A_wrap.current!.setAttribute("transform", `scale(${scaleA.toFixed(3)})`);
      B_wrap.current!.setAttribute("transform", `scale(${scaleB.toFixed(3)})`);

      t += reduce ? 0 : 16;
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [accent, strength, shiftXvw, reduce, shape]);

  // Public switch: nur Ziel setzen (Debounce), Loop holt es ab
  useEffect(() => {
    const now = Date.now();
    // kleiner Debounce, verhindert doppelte Trigger bei schnellem Klick
    if (now - lastSwitchAtRef.current < 120) return;
    lastSwitchAtRef.current = now;

    if (reduce) {
      // sofort wechseln
      currentRef.current = pick(shape);
      pendingShapeRef.current = null;
      morphActiveRef.current = false;
      morphRef.current = 0;
    } else {
      pendingShapeRef.current = shape;
    }
  }, [shape, reduce]);

  return (
    <div className={`w-full h-full ${className}`}>
      <div
        ref={holderRef}
        className="absolute inset-0 grid place-items-center will-change-transform pointer-events-none"
        style={{ transform: `translateX(${shiftXvw}vw)` }}
      >
        <svg
          ref={svgRef}
          className={`${sizeClass} h-auto block`}
          viewBox="-600 -600 1200 1200"
          xmlns="http://www.w3.org/2000/svg"
          role="presentation"
          focusable="false"
        >
          {/* Layer A = current (ein Pfad Front/Back) */}
          <g ref={A_wrap}>
            <path ref={A_backPath}  fill="none" strokeLinecap="round" />
            <path ref={A_frontPath} fill="none" strokeLinecap="round" />
          </g>

          {/* Layer B = incoming */}
          <g ref={B_wrap}>
            <path ref={B_backPath}  fill="none" strokeLinecap="round" />
            <path ref={B_frontPath} fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </div>
    </div>
  );
}
