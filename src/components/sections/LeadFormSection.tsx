"use client";

// Falls Alias @ funktioniert:
import WireSphere from "@/components/visuals/WireSphere";
import WbiLeadForm from "@/components/leadforms/WbiLeadForm";

// Falls nicht, nutze vorübergehend relative Pfade:
// import WireSphere from "../ui/visuals/WireSphere";
// import WbiLeadForm from "../leadforms/WbiLeadForm";

type Props = {
  eyebrow?: string;
  title: string;
};

export default function LeadFormSection({ eyebrow = "://kontakt:/", title }: Props) {
  return (
    <section className="relative w-full bg-black py-16 md:py-24 overflow-hidden">
      <div className="wb-container relative z-[1]">
        <header className="mb-10 md:mb-14 text-center">
          <div className="text-[clamp(18px,2.4vw,22px)] tracking-[0.08em] uppercase text-white/70 font-light">
            {eyebrow}
          </div>
          <h2 className="mt-2 text-[clamp(34px,6vw,68px)] leading-[1.06] font-extrabold text-white">{title}</h2>
        </header>

        <WbiLeadForm />
      </div>

      <WireSphere className="z-0" />
    </section>
  );
}
