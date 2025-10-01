"use client";

import styles from "@/components/ui/Card/Card.module.css";
import PrimaryButton from "@/components/ui/PrimaryButton";

type StepsSectionProps = {
  eyebrow?: string;          // z.B. "://mission:/"
  title: string;             // z.B. "Modernes Webdesign"
  ctaHref?: string;          // z.B. "#contact"
};

export default function StepsSection({
  eyebrow = "://mission:/",
  title,
  ctaHref = "#contact",
}: StepsSectionProps) {
  return (
    <section id="wb-steps" aria-label="Ablauf in 3 Schritten" className="w-full bg-black py-16 md:py-24">
      <div className="wb-container">
        {/* Überschrift */}
        <header className="mb-10 md:mb-14">
          <div className="text-center">
            <div className="text-[clamp(18px,2.4vw,22px)] tracking-[0.08em] uppercase text-white/70 font-light">
              {eyebrow}
            </div>
            <h2 className="mt-2 text-[clamp(34px,6vw,68px)] leading-[1.06] font-extrabold text-white">
              {title}
            </h2>
          </div>
        </header>

        {/* Grid: 3 Steps */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-6">
          {/* STEP 01 – Featured */}
          <article className={`${styles.cardDark} ${styles.cardDarkFeatured} flex flex-col gap-3 p-7 md:p-9`}>
            <span className="text-[clamp(26px,4.2vw,44px)] font-bold leading-none text-[#ff9800]">01</span>
            <h3 className="text-[clamp(22px,3vw,34px)] leading-tight font-bold text-white">
              Machen Sie den Check-In
            </h3>
            <p className="text-[clamp(15px,2vw,18px)] leading-relaxed text-white/75">
              Beantworten Sie in wenigen Minuten einige Fragen zu Ihrem Vorhaben mit unserem Formular.
            </p>

            {/* CTA – nutzt euer globales Button-System */}
            <div className="pt-2">
              <PrimaryButton href={ctaHref}>
                ://JETZT/ANFRAGEN/
              </PrimaryButton>
            </div>
          </article>

          {/* STEP 02 – Dark Card */}
          <article className={`${styles.cardDark} flex flex-col gap-3 p-7 md:p-9`}>
            <span className="text-[clamp(26px,4.2vw,44px)] font-bold leading-none text-[#ff9800]">02</span>
            <h3 className="text-[clamp(22px,3vw,34px)] leading-tight font-bold text-white">
              Ideen, Fragen & Details
            </h3>
            <p className="text-[clamp(15px,2vw,18px)] leading-relaxed text-white/75">
              Ein erstes Gespräch sorgt bei Allen für Klarheit über die Wünsche und den Ablauf.
            </p>
          </article>

          {/* STEP 03 – Dark Card */}
          <article className={`${styles.cardDark} flex flex-col gap-3 p-7 md:p-9`}>
            <span className="text-[clamp(26px,4.2vw,44px)] font-bold leading-none text-[#ff9800]">03</span>
            <h3 className="text-[clamp(22px,3vw,34px)] leading-tight font-bold text-white">
              Modus: <br className="hidden md:block" /> Auto-Pilot
            </h3>
            <p className="text-[clamp(15px,2vw,18px)] leading-relaxed text-white/75">
              Sie müssen sich um nichts mehr kümmern. Wir arbeiten strukturiert und mit klaren Deadlines.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
