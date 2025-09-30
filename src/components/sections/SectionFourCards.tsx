"use client";
import Image from "next/image";
import Chips from "@/components/ui/Chips/Chips";
import ButtonDesigner from "@/components/blocks/ButtonDesigner/ButtonDesigner";
import ThreeLogosRow from "@/components/ui/ThreeLogosRow";

const THREE_LOGOS = [
  { src: "/logos/co2-neutral.webp", alt: "Brand 1" },
  { src: "/logos/dsgvo.webp", alt: "Brand 2" },
  { src: "/logos/serverstandort-deutschland.webp", alt: "Brand 3" },
];

/* --- Card WebDesign (oben full width) --- */
function CardWebdesign() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-10 bg-white rounded-xl shadow-md">
      {/* Bild */}
      <div className="w-full md:w-1/2">
        <Image
          src="/img/Webdesign-Facts.webp"
          alt="Moderne Website – Facts"
          width={600}
          height={400}
          className="rounded-lg object-cover"
        />
      </div>
      {/* Text */}
      <div className="w-full md:w-1/2 space-y-4">
        <h3 className="text-3xl md:text-5xl font-bold text-black leading-tight">
          Modernes Webdesign, das Fakten schafft
        </h3>
        <p className="text-base md:text-lg text-[hsl(var(--color-text-base))]">
          94 % aller ersten Eindrücke über ein Unternehmen entstehen durch die
          Website¹ – und eine durchdachte User Experience kann die Conversion
          Rate um bis zu 200 % steigern².
        </p>
        <Chips
          items={[
            "://RESPONSIVE/",
            "://FAST-LOAD/",
            "://SEO/",
            "://DSGVO/",
            "://ON-BRAND/",
            "://INTEGRATION/",
            "://ADMIN/",
          ]}
        />
        <small className="block text-xs text-neutral-500 mt-4">
          ¹ Hostinger – Web Design Statistics 2024 <br />
          ² Designrush – UX & Conversion Study
        </small>
      </div>
    </div>
  );
}

/* --- Card Case Study (links, 2x hoch) --- */
function CardCaseStudy() {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md p-6 md:p-10 h-full">
      <div className="text-xs font-semibold uppercase text-neutral-500 mb-2">
        ://CASE-STUDY/
      </div>
      <h3 className="text-xl md:text-2xl font-bold text-black leading-snug mb-4">
        SEA macht der ganze Markt. <br /> Doch SEO macht den Marktführer.
      </h3>
      <p className="text-sm md:text-base text-[hsl(var(--color-text-base))] mb-6">
        Bei einem Unternehmen aus der Elektromobilität sind wir im laufenden
        Betrieb eingestiegen, haben eine langfristige Content-Strategie
        umgesetzt & SEA neu ausgerichtet. Innerhalb von einem Jahr sind die
        organischen Kundenanfragen explodiert, die Kosten pro Lead wurden
        gesenkt und der Umsatz spürbar gesteigert.
      </p>
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex justify-between border-b border-neutral-200 pb-2 text-sm">
          <span>Organic Clicks (Jahr)</span>
          <span className="font-semibold text-emerald-600">
            ≈ 25.200 <small>(+300%)</small>
          </span>
        </div>
        <div className="flex justify-between border-b border-neutral-200 pb-2 text-sm">
          <span>Kosten pro Kunde (CPA)</span>
          <span className="font-semibold text-emerald-600">
            10,86 € <small>(−6,14 € / Lead)</small>
          </span>
        </div>
        <div className="flex justify-between border-b border-neutral-200 pb-2 text-sm">
          <span>Umsatz durch SEO/SEA</span>
          <span className="font-semibold text-emerald-600">
            +150.000 € <small>(bei CLV 76 €)</small>
          </span>
        </div>
      </div>
      <Chips
        items={[
          "://SEO/",
          "://SEA/",
          "://LANDING-PAGES/",
          "://CPA/",
          "://ROI/",
          "://AB-TESTS/",
        ]}
      />
    </div>
  );
}

/* --- Card WebDev (rechts oben) --- */
function CardWebDev() {
  return (
    <div className="relative bg-white rounded-xl shadow-md overflow-hidden h-full">
      <div className="absolute inset-0 bg-[url('/img/webdev-facts.webp')] bg-cover bg-right opacity-20" />
      <div className="relative z-10 p-6 md:p-10">
        <div className="text-xs font-semibold uppercase text-neutral-500 mb-2">
          ://WEB/DEV/
        </div>
        <h3 className="text-xl font-bold mb-3">Applikationen für Verkaufsschlager</h3>
        <p className="text-sm md:text-base text-[hsl(var(--color-text-base))] max-w-[90%]">
          Unternehmen, die Web-Apps in bestehende Prozesse integrieren, steigern
          ihre Produktivität und erhöhen die Conversion-Rates um bis zu 50 %¹.
        </p>
        <small className="block text-xs text-neutral-500 mt-4">
          ¹ Netguru – Web Development Trends 2025 · McKinsey Digital
        </small>
      </div>
    </div>
  );
}

/* --- Card Leadforms (rechts unten links) --- */
function CardLeadforms() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 md:p-10 rounded-xl shadow-md bg-white h-full">
      <h3 className="text-lg md:text-xl font-semibold mb-3">
        30% bessere Conversion Rate durch personalisierte Lead Forms¹
      </h3>
      <small className="block text-xs text-neutral-500">
        ¹ HubSpot – Lead Generation Report 2024
      </small>
    </div>
  );
}

export default function SectionFourCards() {
  return (
    <section className="theme-light w-full bg-white py-28">
      <div className="wb-container space-y-10">
        {/* Oben Full Width */}
        <CardWebdesign />

        {/* Mosaic Grid */}
        <div className="grid gap-6 lg:grid-cols-4 lg:grid-rows-2">
          {/* LEFT: Case Study (2 breit, 2 hoch) */}
          <div className="lg:col-span-2 lg:row-span-2">
            <CardCaseStudy />
          </div>

          {/* RIGHT TOP: WebDev (2 breit, 1 hoch) */}
          <div className="lg:col-span-2">
            <CardWebDev />
          </div>

          {/* RIGHT BOTTOM LEFT: Leadforms (1 breit) */}
          <div className="lg:col-span-1">
            <CardLeadforms />
          </div>

          {/* RIGHT BOTTOM RIGHT: Button Designer (1 breit) */}
          <div className="lg:col-span-1">
            <ButtonDesigner />
          </div>
        </div>
      </div>

      {/* Drei Logos unten (gleicher Innenabstand durch wb-container) */}
      <ThreeLogosRow logos={THREE_LOGOS} className="py-10 md:py-14" />
    </section>
  );
}

