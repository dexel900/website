"use client";
import Image from "next/image";

import Card, { CardSection, CardImage } from "@/components/ui/Card/Card";
import Chips from "@/components/ui/Chips/Chips";
import ButtonDesigner from "@/components/blocks/ButtonDesigner/ButtonDesigner";
import ThreeLogosRow from "@/components/ui/ThreeLogosRow";
import styles from "@/components/ui/Card/Card.module.css";

const THREE_LOGOS = [
  { src: "/logos/co2-neutral.webp", alt: "Brand 1" },
  { src: "/logos/dsgvo.webp", alt: "Brand 2" },
  { src: "/logos/serverstandort-deutschland.webp", alt: "Brand 3" },
];

/* --- Card: Webdesign (oben full width, Split) --- */
function CardWebdesign() {
  return (
    <Card variant="split">
      <CardImage>
        <Image
          src="/img/Webdesign-Facts.webp"
          alt="Moderne Website – Facts"
          width={1200}
          height={800}
          className="rounded-[14px] object-cover w-full h-auto"
          priority
        />
      </CardImage>
      <CardSection>
        <div className={styles.label}>://WEBDESIGN/</div>
        <h3 className={styles.claim}>Modernes Webdesign, das Fakten schafft</h3>
        <p className={styles.stat}>
          94 % aller ersten Eindrücke über ein Unternehmen entstehen durch die Website¹ – und eine
          durchdachte User Experience kann die Conversion-Rate um bis zu 200 % steigern².
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
        <div className={styles.sources}>
          ¹ Hostinger – Web Design Statistics 2024 · ² Designrush – UX & Conversion Study
        </div>
      </CardSection>
    </Card>
  );
}

/* --- Card: Case Study (links, 2x hoch) --- */
function CardCaseStudy() {
  return (
    <Card variant="vertical" className="h-full">
      <div className={styles.label}>://CASE-STUDY/</div>
      <h3 className={styles.claim}>
        SEA macht der ganze Markt. <br /> Doch SEO macht den Marktführer.
      </h3>
      <p className={styles.stat}>
        Bei einem Unternehmen aus der Elektromobilität sind wir im laufenden Betrieb eingestiegen,
        haben eine langfristige Content-Strategie umgesetzt & SEA neu ausgerichtet. Innerhalb von
        einem Jahr sind die organischen Kundenanfragen explodiert, die Kosten pro Lead wurden
        gesenkt und der Umsatz spürbar gesteigert.
      </p>

      <div className="flex flex-col gap-3">
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

      <Chips items={["://SEO/", "://SEA/", "://LANDING-PAGES/", "://CPA/", "://ROI/", "://AB-TESTS/"]} />
    </Card>
  );
}

/* --- Card: WebDev (rechts oben, BG-Image Overlay) --- */
function CardWebDev() {
  return (
    <Card variant="bg" className="h-full">
      <div className="absolute inset-0 bg-[url('/img/webdev-facts.webp')] bg-cover bg-right opacity-20" />
      <div className="relative z-10">
        <div className={styles.label}>://WEB/DEV/</div>
        <h3 className={styles.claim}>Applikationen für Verkaufsschlager</h3>
        <p className={styles.stat}>
          Unternehmen, die Web-Apps in bestehende Prozesse integrieren, steigern ihre Produktivität
          und erhöhen die Conversion-Rates um bis zu 50 %¹.
        </p>
        <div className={styles.sources}>¹ Netguru – Web Development Trends 2025 · McKinsey Digital</div>
      </div>
    </Card>
  );
}

/* --- Card: Leadforms (rechts unten links, kompakt) --- */
function CardLeadforms() {
  return (
    <Card variant="vertical" className="h-full text-center">
      <h3 className="font-semibold text-lg md:text-xl">
        30 % bessere Conversion Rate durch personalisierte Lead Forms¹
      </h3>
      <div className={styles.sources}>¹ HubSpot – Lead Generation Report 2024</div>
    </Card>
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

      {/* Drei Logos unten */}
      <ThreeLogosRow logos={THREE_LOGOS} className="py-10 md:py-14" />
    </section>
  );
}
