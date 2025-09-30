"use client";
import Image from "next/image";

type Logo = { src: string; alt: string };

export default function ThreeLogosRow({
  logos,
  className = "",
}: { logos: Logo[]; className?: string }) {
  return (
    <div className={`wb-container ${className}`}>
      <div
        className="
          mx-auto max-w-[1000px]
          flex flex-nowrap items-center justify-center
          gap-6 sm:gap-8 md:gap-12
          text-center
        "
      >
        {logos.slice(0, 3).map((l, i) => (
          <div key={i} className="shrink-0">
            <Image
              src={l.src}
              alt={l.alt}
              width={320}
              height={120}
              sizes="(max-width: 640px) 33vw, 320px"
              className="
                h-[72px] sm:h-[80px] md:h-[90px] w-auto
                select-none
                filter grayscale saturate-0
                transition
                hover:grayscale-0 hover:saturate-100
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}
