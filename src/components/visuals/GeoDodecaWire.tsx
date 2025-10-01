"use client";
import { useEffect, useMemo, useRef } from "react";

/**
 * GeoDodecaWire
 * - Präziser Dodekaeder (20 Vertices, 30 Edges) auf Basis des goldenen Schnitts φ
 * - Sehr dezente, langsame Rotation (X/Y)
 * - Rendert als SVG-Linien (performant), rechts im Hero positionierbar
 * - Respektiert prefers-reduced-motion
 */
export default function GeoDodecaWire() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const linesRef = useRef<SVGLineElement[]>([]); // die 30 Linien
  const raf = useRef<number | null>(null);
  const reduce = useRef<boolean>(false);

  // ---- 3D Geometrie: Dodekaeder ----
  const { vertices, edges } = useMemo(() => {
    // Goldener Schnitt
    const phi = (1 + Math.sqrt(5)) / 2;
    const inv = 1 / phi;

    // 20 Vertices eines regulären Dodekaeders (skaliert)
    const V: [number, number, number][] = [
      // (±1, ±1, ±1)
      [-1, -1, -1], [-1, -1, 1], [-1, 1, -1], [-1, 1, 1],
      [1, -1, -1],  [1, -1, 1],  [1, 1, -1],  [1, 1, 1],
      // (0, ±1/φ, ±φ)
      [0, -inv, -phi], [0, -inv, phi], [0, inv, -phi], [0, inv, phi],
      // (±1/φ, ±φ, 0)
      [-inv, -phi, 0], [-inv, phi, 0], [inv, -phi, 0], [inv, phi, 0],
      // (±φ, 0, ±1/φ)
      [-phi, 0, -inv], [-phi, 0, inv], [phi, 0, -inv], [phi, 0, inv],
    ];

    // Kanten automatisch finden: zwei Punkte sind verbunden, wenn ihr Abstand ~ konstant ist
    const dist = (a: [number, number, number], b: [number, number, number]) => {
      const dx = a[0] - b[0], dy = a[1] - b[1], dz = a[2] - b[2];
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };

    // Edge-Länge einmal bestimmen: nimm ersten Punkt, suche die 3 nächsten (Kanten)
    const dists = V.map((p, i) =>
      V.map((q, j) => (i === j ? Infinity : dist(p, q))).sort((a, b) => a - b)[0]
    );
    const L = dists[0]; // typische Kantenlänge

    const E: [number, number][] = [];
    const eps = L * 0.05; // Toleranz
    for (let i = 0; i < V.length; i++) {
      for (let j = i + 1; j < V.length; j++) {
        const dij = dist(V[i], V[j]);
        if (Math.abs(dij - L) < eps) E.push([i, j]);
      }
    }
    // Ergebnis: 30 Kanten
    return { vertices: V, edges: E };
  }, []);

  // ---- Animation / Projektion ----
  useEffect(() => {
    reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const svg = svgRef.current;
    if (!svg) return;

    const width = svg.viewBox.baseVal.width || 1140;
    const height = svg.viewBox.baseVal.height || 1140;

    // Zielgröße (passt zum Hero rechts, kann später via CSS skaliert werden)
    const scale = Math.min(width, height) * 0.25;

    // Linien-Elemente vorbereiten (einmalig)
    linesRef.current = [];
    while (svg.lastChild) svg.removeChild(svg.lastChild); // leeren
    // Gruppe für Stroke/Effekte
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("stroke", "rgba(255,255,255,0.14)"); // feines Grau
    g.setAttribute("stroke-width", "2");
    g.setAttribute("stroke-linecap", "round");
    svg.appendChild(g);

    edges.forEach(() => {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      g.appendChild(line);
      linesRef.current.push(line);
    });

    let t = 0;
    const render = () => {
      // sehr langsame, subtile Rotation
      const rx = 0.35 + Math.sin(t * 0.00014) * 0.04; // ~20°
      const ry = t * 0.00008 + Math.sin(t * 0.00011) * 0.02;
      const rz = 0.0;

      // Rotationsmatrizen (Y * X * Z)
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const cosZ = Math.cos(rz), sinZ = Math.sin(rz);

      const rotated: [number, number, number][] = vertices.map(([x, y, z]) => {
        // RZ
        const X = x * cosZ - y * sinZ;
        const Y = x * sinZ + y * cosZ;
        const Z = z;
        // RX
        const Y2 = Y * cosX - Z * sinX;
        const Z2 = Y * sinX + Z * cosX;
        // RY
        const X3 = X * cosY + Z2 * sinY;
        const Z3 = -X * sinY + Z2 * cosY;

        return [X3, Y2, Z3];
      });

      // simple perspektivische Projektion
      const cameraZ = 6; // weiter weg = flacher
      const proj = rotated.map(([x, y, z]) => {
        const perspective = cameraZ / (cameraZ - z); // je näher an cameraZ, desto größer
        const px = x * perspective * scale + width * 0.8;  // rechts platzieren
        const py = y * perspective * scale + height * 0.4;  // mittig vertikal
        return [px, py] as [number, number];
      });

      // Linien updaten
      edges.forEach(([i, j], idx) => {
        const [x1, y1] = proj[i];
        const [x2, y2] = proj[j];
        const el = linesRef.current[idx];
        el.setAttribute("x1", x1.toFixed(1));
        el.setAttribute("y1", y1.toFixed(1));
        el.setAttribute("x2", x2.toFixed(1));
        el.setAttribute("y2", y2.toFixed(1));
      });

      t += reduce.current ? 0 : 16; // ~60 FPS
      raf.current = requestAnimationFrame(render);
    };

    raf.current = requestAnimationFrame(render);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [vertices, edges]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-end pr-[min(6vw,64px)]"
    >
      {/* SVG wird per JS befüllt (30 Linien) */}
      <svg
        ref={svgRef}
        className="drop-shadow-[0_6px_20px_rgba(0,0,0,0.25)]"
        width="min(70vw, 1100px)"
  height="auto"
  viewBox="-120 -120 1140 1140"
  style={{ overflow: "visible" }}
  xmlns="http://www.w3.org/2000/svg"
      />
    </div>
  );
}
