"use client";
import { useState } from "react";
import LineAccordion from "@/components/ui/accordion/LineAccordion";
import GeoWire from "@/components/visuals/GeoWire";

const ITEMS = [
  {
    id: "a1",
    label: "Was macht webbinich anders?",
    content:
      "Wir bauen funktionierende Systeme und digitale Unikate. Mit umwerfendem Design, klarer Struktur, schnellen Ladezeiten und messbaren Conversions.",
  },
  {
    id: "a2",
    label: "Was kostet ein Projekt bei euch?",
    content:
      "Transparente Pakete plus modular erweiterbar. Nach einem kurzen Check-In erhalten Sie ein fixes Angebot mit realistischen Timings.",
  },
  {
    id: "a3",
    label: "Werden auch Website Inhalte erstellt?",
    content:
      "Ja – von SEO-Strategie, UX-Copy bis zu redaktionellen Inhalten. Wir liefern, was performt und zu Ihrer Marke passt.",
  },
  {
    id: "a4",
    label: "Gibt es langfristigen Support?",
    content:
      "Klar. Wir betreuen, optimieren und entwickeln weiter – mit klaren Deadlines, Monitoring und regelmäßigen Reports.",
  },
];

const SHAPES: Array<"globe" | "cube" | "diamond" | "torus"> = [
  "globe",
  "cube",
  "diamond",
  "torus",
];

export default function GeoAccordionSection() {
  const [shapeIdx, setShapeIdx] = useState(0);

  return (
    <section className="relative w-full bg-black py-20 md:py-28 overflow-hidden">
      {/* BG Object – unverändert */}
      <GeoWire
        shape={SHAPES[Math.max(0, shapeIdx)]}
        className="absolute inset-0"
        accent="#FF8A00"
        strength={0.34}
        sizeClass="w-[clamp(440px,68vmin,980px)]"
        shiftXvw={24}
      />

      {/* Content mit container padding (gleicher Innenabstand wie überall) */}
      <div className="wb-container relative z-[1]">
        {/* Wrapper, zentriert; auf Desktop feste Breite 650px */}
        <div className="w-full max-w-[650px] mx-auto">
          <LineAccordion
            items={ITEMS}
            active={0}
            onChange={(i) => setShapeIdx(Math.max(0, i))}
            className=""
          />
        </div>
      </div>
    </section>
  );
}
