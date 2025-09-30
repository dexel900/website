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

export default function ClientsSection() {
  return (
    <section
      id="clients"
      className="
        theme-light
        w-full
      "
      aria-label="Kunden-Logos"
    >
      <div className="wb-container py-12 md:py-16">
        <LogosMarquee logos={LOGOS} speedMs={24000} gapPx={112} />
      </div>
    </section>
  );
}
