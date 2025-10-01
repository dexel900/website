"use client";

type Props = {
  color?: string;          // Linienfarbe
  speedMs?: number;        // Dauer für eine Bewegung
  widthPx?: number;        // Breite des Bands
  strokeWidth?: number;    // Linienstärke
  strokeOpacity?: number;  // Transparenz
  className?: string;      // zusätzliche Positionierung
};

export default function FloatBand({
  color = "rgba(0,0,0,.1)",   // Standard: leicht transparent schwarz
  speedMs = 10000,            // 10s Zyklus (wie im DIVI)
  widthPx = 250,
  strokeWidth = 1,
  strokeOpacity = 0.25,
  className = "absolute inset-0 z-0 pointer-events-none",
}: Props) {
  return (
    <div
      className={className}
      aria-hidden
      style={
        {
          ["--fb-color" as any]: color,
          ["--fb-speed" as any]: `${speedMs}ms`,
          ["--fb-w" as any]: `${widthPx}px`,
        } as React.CSSProperties
      }
    >
      <div className="fb-wrap">
        <svg
          className="fb-svg"
          width="250"
          viewBox="0 0 300 1604"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 892L1 941H299V892C299 809.71 232.29 743 150 743C67.7096 743 1 809.71 1 892Z"
            className="fb-move"
          />
          <path
            d="M299 146V97L1 97V146C1 228.29 67.7096 295 150 295C232.29 295 299 228.29 299 146Z"
            className="fb-move"
          />
          <rect x="1" y="1" width="298" height="1402" />
          <line x1="150" y1="0" x2="150" y2="1404" />
          <path
            d="M150 1324C232.29 1324 299 1257.29 299 1175C299 1092.71 232.29 1026 150 1026C67.7096 1026 1 1092.71 1 1175C1 1257.29 67.7096 1324 150 1324Z"
            className="fb-move"
          />
          <line x1="0" y1="1175" x2="300" y2="1175" className="fb-move" />
          <path
            d="M150 678C232.29 678 299 611.29 299 529C299 446.71 232.29 380 150 380C67.7096 380 1 446.71 1 529C1 611.29 67.7096 678 150 678Z"
            className="fb-move"
          />
          <rect x="1" y="380" width="298" height="298" className="fb-move" />
        </svg>
      </div>

      <style jsx>{`
        .fb-wrap {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: var(--fb-w);
          overflow: hidden;
          color: var(--fb-color);
        }

        .fb-svg {
          display: block;
          width: 100%;
          height: 160%; /* größer als Container → Bewegung sichtbar */
          transform: translateY(-20%);
          stroke: currentColor;
          stroke-width: ${strokeWidth};
          opacity: ${strokeOpacity};
          fill: none;
        }

        .fb-move {
          animation: fbMove var(--fb-speed) linear infinite;
          transform-box: fill-box;
          transform-origin: center;
        }

        @keyframes fbMove {
          0% {
            transform: translateY(-75px);
          }
          50% {
            transform: translateY(75px);
          }
          100% {
            transform: translateY(-75px);
          }
        }
      `}</style>
    </div>
  );
}
