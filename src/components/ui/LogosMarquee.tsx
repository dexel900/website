"use client";
import Image from "next/image";

type Logo = { src: string; alt: string; width?: number; height?: number };
type Props = {
  logos: Logo[];
  speedMs?: number;   // Dauer pro Runde
  gapPx?: number;     // Abstand zwischen Logos
  heightPx?: number;  // sichtbare Höhe
  className?: string;
};

export default function LogosMarquee({
  logos,
  speedMs = 26000,
  gapPx = 96,
  heightPx = 120,
  className = "",
}: Props) {
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={
        {
          ["--speed" as any]: `${speedMs}ms`,
          ["--gap" as any]: `${gapPx}px`,
          height: `${heightPx}px`,
        } as React.CSSProperties
      }
      aria-label="Unsere Kundenlogos"
    >
      {/* EIN Track mit zwei identischen Reihen → nahtlos */}
      <div className="marquee">
        <div className="row">
          {logos.map((l, i) => <LogoItem key={`a-${i}`} {...l} />)}
        </div>
        <div className="row">
          {logos.map((l, i) => <LogoItem key={`b-${i}`} {...l} />)}
        </div>
      </div>

      <style jsx>{`
        .marquee{
          position:absolute; left:0; top:50%;
          transform:translateY(-50%);
          display:flex;            /* A + B nebeneinander */
          width:max-content;       /* so breit wie Inhalt */
          will-change:transform;
          animation: slide var(--speed) linear infinite;
        }
        .row{
          display:flex; align-items:center; gap:var(--gap);
          padding:0 2vw; white-space:nowrap;
        }
        @keyframes slide{
          from { transform: translate(0, -50%); }
          to   { transform: translate(-50%, -50%); }  /* exakt eine Reihe weiter */
        }
        @media (prefers-reduced-motion: reduce){ .marquee{ animation:none; } }
      `}</style>
    </div>
  );
}

function LogoItem({ src, alt, width = 280, height = 100 }: Logo) {
  return (
    <div className="shrink-0 opacity-80 hover:opacity-100 transition-opacity">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-20 md:h-24 w-auto object-contain grayscale"
        priority={false}
      />
    </div>
  );
}
