"use client";

type Props = {
  color?: string;          // Linienfarbe
  speedMs?: number;        // Dauer up/down
  amplitudePct?: number;   // Weg in % der SVG-Höhe
  widthPx?: number;        // Breite in px
  strokeWidth?: number;
  strokeOpacity?: number;
  className?: string;      // zusätzliche Positionierung
};

export default function FloatBand({
  color = "rgba(255,255,255,.18)",   // auf weiß; auf schwarz z.B. "rgba(255,255,255,.18)"
  speedMs = 7000,
  amplitudePct = 6,
  widthPx = 250,
  strokeWidth = .5,
  strokeOpacity = 0.7,
  className = "absolute inset-0 z-0 pointer-events-none",
}: Props) {
  return (
    <div
      className={className}
      aria-hidden
      style={
        {
          ["--afb-color" as any]: color,
          ["--afb-speed" as any]: `${speedMs}ms`,
          ["--afb-amp" as any]: `${amplitudePct}%`,
          ["--afb-w" as any]: `${widthPx}px`,
        } as React.CSSProperties
      }
    >
      {/* Band füllt die Section-Höhe von oben bis unten */}
      <div className="afb-band">
        <svg className="afb-svg" viewBox="0 0 100 400" xmlns="http://www.w3.org/2000/svg">
          {/* statischer Rahmen */}
          <g
            className="afb-frame"
            fill="none"
            stroke="currentColor"
            vectorEffect="non-scaling-stroke"
            opacity={strokeOpacity}
            strokeWidth={strokeWidth}
          >
            <rect x="0.5" y="0.5" width="99" height="399" />
          </g>

          {/* alles, was sich bewegt: Mittel- & Querlinien + Muster */}
          <g
            className="afb-mover"
            fill="none"
            stroke="currentColor"
            vectorEffect="non-scaling-stroke"
            opacity={strokeOpacity}
            strokeWidth={strokeWidth}
          >
            {/* Mittel- & Querlinien */}
            <line x1={50} y1={0}   x2={50}  y2={400} />
            <line x1={0}  y1={100} x2={100} y2={100} />
            <line x1={0}  y1={200} x2={100} y2={200} />
            <line x1={0}  y1={300} x2={100} y2={300} />

            {/* 4er-Muster */}
            <path d="M0,100 A50,50 0 0 0 100,100" />
            <circle cx={50} cy={200} r={50} />
            <path d="M0,300 A50,50 0 0 1 100,300" />
            <circle cx={50} cy={350} r={50} />
          </g>
        </svg>
      </div>

      <style jsx>{`
        .afb-band{
          position:absolute; top:0; bottom:0; left:50%;
          transform: translateX(-50%);
          width: var(--afb-w);          /* 100px default */
          overflow: hidden;
          color: var(--afb-color);
          filter: drop-shadow(0 18px 50px rgba(0,0,0,.06));
        }
        .afb-svg{
          display:block;
          width:100%;
          height:140%;                  /* größer als Band -> kein „leer“ */
          transform: translateY(-20%);  /* Start mittig */
        }
        .afb-mover{
          animation: afbFloat var(--afb-speed) ease-in-out infinite alternate;
          will-change: transform;
        }
        @keyframes afbFloat{
          0%   { transform: translateY(calc(-1 * var(--afb-amp))); }
          100% { transform: translateY(var(--afb-amp)); }
        }
      `}</style>
    </div>
  );
}
