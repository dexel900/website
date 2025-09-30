"use client";
import Image from "next/image";
import PrimaryButton from "@/components/ui/PrimaryButton";
import FloatBand from "@/components/visuals/FloatBand";

// NEU: unsere Cards importieren
import ServiceCardSlice from "@/components/ui/Card/ServiceCardSlice";
import ServiceCardBg from "@/components/ui/Card/ServiceCardBg";

export default function ServicesDarkSection() {
  return (
    <section id="services" className="relative w-full overflow-x-clip">
      {/* Introblock */}
      <div className="wb-container pt-12 sm:pt-16 lg:pt-24">
        {/* Zeile 1 */}
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:block overflow-hidden rounded-[var(--radius-pill)] w-36 sm:w-48 h-14 sm:h-16 shrink-0">
            <Image
              src="/img/hero-chip.jpg"
              alt=""
              width={320}
              height={128}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <h2
            className="font-extrabold tracking-tight text-[hsl(var(--color-brand-primary))] min-w-0"
            style={{ fontSize: "clamp(2rem, 5vw, 5rem)", lineHeight: 1.05 }}
          >
            ://FULL_SERVICE/
          </h2>
        </div>

        {/* Zeile 2 */}
        <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <p
            className="order-1 sm:order-none flex-1 min-w-0 font-light text-[hsl(var(--color-text-muted))] leading-[1.1]"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            Internetagentur
          </p>
          <div className="order-2 sm:order-none w-full sm:w-auto">
            <PrimaryButton className="w-full sm:w-auto" href="#quote">
              ://ZUM/ANGEBOT/
            </PrimaryButton>
          </div>
        </div>
      </div>

      {/* 1/3 FloatBand + 2/3 Cards */}
      <div className="wb-container mt-10 sm:mt-12 lg:mt-20 pb-16 sm:pb-20 lg:pb-28">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          {/* Left 1/3 – FloatBand (sticky ab Desktop) */}
          <aside className="lg:col-span-4">
            <div className="relative lg:sticky lg:top-28 h-[160px] sm:h-[220px] lg:h-[360px] rounded-[var(--radius-lg)] overflow-hidden">
              <FloatBand color="rgba(255,255,255,.08)" />
            </div>
          </aside>

          {/* Right 2/3 – unsere 5 Cards */}
          <div className="lg:col-span-8">
            <div className="grid gap-6 sm:gap-7">
              <ServiceCardSlice
                title="Webdesign"
                text="Internetseiten, die Spaß machen, zum Bleiben einladen und Ihre Kunden beeindrucken."
                img="/img/webdes.jpg"   // <-- ersetze/ablegen in /public
              />
              <ServiceCardSlice
                title="Webentwicklung"
                text="Headless CMS, E-Commerce, von Webflow bis zu WordPress – jede Zeile Code individuell für Sie."
                img="/img/webdev.webp"
              />
              <ServiceCardSlice
                title="SEO"
                text="Content-Kampagnen, die Expertise und Autorität vermitteln und bei Google ganz oben stehen."
                img="/img/seo.webp"
              />

              {/* SEA + E-Mail nebeneinander ab md */}
              <div className="grid gap-6 sm:gap-7 md:grid-cols-2">
                <ServiceCardBg
                  title="SEA Kampagnen"
                  text="Gezielte Anzeigen, die Reichweite schaffen und sofort Ergebnisse liefern."
                  bg="/img/sea.webp"
                />
                <ServiceCardBg
                  title="E-Mail Marketing"
                  text="Newsletter und Automationen, die Kunden binden und Umsatz steigern."
                  bg="/img/email.webp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
