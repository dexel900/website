"use client";

import FloatBand from "@/components/visuals/FloatBand";
import AboutImageCard from "@/components/ui/AboutImageCard";
import LogosMarquee from "@/components/ui/LogosMarquee";

const LOGOS = [
  { src: "/logos/hbo.webp", alt: "Heizungsbauonline" },
  { src: "/logos/bakeanote.webp", alt: "Bake a Note" },
  { src: "/logos/contractingpartner.webp", alt: "Contracting Partner" },
  { src: "/logos/kad.webp", alt: "Kemo Abbing Design" },
  { src: "/logos/besenstiel.webp", alt: "Besen & Stiel" },
  { src: "/logos/kesselheld.webp", alt: "Kesselheld" },
  { src: "/logos/samsillah.webp", alt: "Sam Sillah" },
  { src: "/logos/jilboesl.webp", alt: "Jil Boesl" },
];

export default function About() {
  return (
    <section
      id="about"
      className="
        theme-light
        relative w-full
        bg-[hsl(var(--color-bg-base))]
        text-[hsl(var(--color-text-muted))]
        py-20
      "
    >
      {/* Hintergrundobjekt */}
      <FloatBand
        color="rgba(0,0,0,.3)"   // deutlich kräftiger
        strokeWidth={1.2}
        strokeOpacity={0.9}
        speedMs={8000}           // optional langsamer     // etwas stärkeres Wobbeln
      />

      {/* Container */}
      <div className="wb-container relative z-10 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-10 items-start">
          {/* LEFT: Text */}
          <div className="md:col-span-6">
            <h2>
              Die Regisseure<br />
              <span className="font-light">://ihrer/vision/</span>
            </h2>
            <p className="mt-6">
              Wir schreiben seit Kindheitstagen am Drehbuch unserer Freundschaft.
              Die Frage „Wer will ich sein?“ wurde dabei immer wieder neu beantwortet –
              erst in Videospielwelten, dann während langer Spaziergänge am Rhein.
              Wir wollten uns selbst erschaffen. Wir wollten unsere eigene Welt erschaffen.
            </p>
            <p className="mt-4">
              Heute bauen wir Welten aus Farben und Fonts, aus Code und Copy, aus Ads
              und Analytics. Dabei ist die Vision unserer Kunden das Skript und unsere
              Agentur die Regie. ://web/bin/ich hilft Unternehmen dabei, sich selbst
              ins Rampenlicht zu stellen.
            </p>
          </div>

          {/* RIGHT: Bilder */}
          <div className="md:col-span-6">
            <div className="grid grid-cols-2 gap-6">
              <AboutImageCard
                src="/img/wb_miguel.jpg"
                alt="Miguel"
                title="Miguel Mellado"
                subtitle="DIGITALES MARKETING & WEBDESIGN"
              />
              <AboutImageCard
                src="/img/wb_denis.jpg"
                alt="Denis"
                title="ENTWICKLUNG & STRATEGIE"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Logos */}
      <div className="relative z-10 w-full border-[hsl(var(--color-border))] pt-10 md:py-14">
        <LogosMarquee logos={LOGOS} speedMs={24000} gapPx={96} />
      </div>
    </section>
  );
}
