import HomeHero from "@/components/sections/HomeHero";
import About from "@/components/sections/About";
import GlobeSection from "@/components/sections/GlobeSection";
import SectionFourCards from "@/components/sections/SectionFourCards";
import ServicesDarkSection from "@/components/sections/ServicesDarkSection";

export default function Page() {
  return (
    <main>
      <HomeHero />
      <About />
      <GlobeSection />
      <SectionFourCards />
      <ServicesDarkSection />
      {Array.from({ length: 5 }).map((_, i) => (
        <section
          key={i}
          id={`section-${i + 5}`}
          className="w-full h-screen border-b border-white flex items-center justify-center"
        >
          <span className="opacity-60">Section {i + 5}</span>
        </section>
      ))}
    </main>
  );
}