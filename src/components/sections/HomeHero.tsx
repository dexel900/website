"use client";

import Reveal from "@/components/visuals/Reveal";
import PrimaryButton from "@/components/ui/PrimaryButton";
import HeroScribble from "@/components/visuals/HeroScribble";
import GeoDodecaWire from "@/components/visuals/GeoDodecaWire";

export default function HomeHero() {
  return (
    <section
      id="hero"
      className="
        relative
        min-h-[100svh]
        flex items-center justify-center text-center
        overflow-hidden
        py-24 sm:py-32
      "
    >
      {/* Hintergrundobjekte */}
      <div className="absolute inset-0 z-0">
        <GeoDodecaWire />
        <HeroScribble />
      </div>

      {/* Inhalt */}
      <div className="relative z-10 wb-container pointer-events-none">
        <Reveal>
          <h1>
            Digitale Bühnen für Auftritte,<br />die durch die Decke gehen
          </h1>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="mt-6 max-w-2xl mx-auto">
            Nur, weil gute Websites in Garagen geboren werden, heißt das nicht,
            dass Ihre Website verstauben muss. Präsentieren Sie sich richtig –
            mit interaktivem Webdesign, das Spaß macht und verkauft.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton href="/kontakt">://WEB/BERATUNG/</PrimaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
