"use client";
import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
};

export default function AboutImageCard({ src, alt, title, subtitle }: Props) {
  return (
    <div className="group relative aspect-[3/4] overflow-hidden rounded-lg">
      {/* Bild */}
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 768px) 280px, 45vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        priority
      />

      {/* Darken-Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-700 ease-out group-hover:bg-black/60" />

      {/* “Ladebalken” unten */}
      <div className="absolute bottom-0 left-0 h-[6px] w-full origin-left scale-x-0 bg-[#ff9800] transition-transform duration-700 ease-out group-hover:scale-x-100" />

      {/* Text (optional) */}
      {(title || subtitle) && (
        <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 text-white transition-all duration-700 ease-out opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          {title && (
            <h3 className="font-outfit text-2xl md:text-[28px] font-semibold leading-tight">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="mt-3 text-[12px] md:text-[13px] tracking-[.18em] font-semibold text-white/85">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
