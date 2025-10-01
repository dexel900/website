import HomeHero from "@/components/sections/HomeHero";
import About from "@/components/sections/About";
import GlobeSection from "@/components/sections/GlobeSection";
import SectionFourCards from "@/components/sections/SectionFourCards";
import ServicesDarkSection from "@/components/sections/ServicesDarkSection";
import StepsSection from "@/components/sections/StepsSection";
import LeadFormSection from "@/components/sections/LeadFormSection";
import GeoAccordionSection from "@/components/sections/GeoAccordionSection";
import ReviewsSection from "@/components/sections/ReviewsSection";


export default function Page() {
  return (
    <main>
      <HomeHero />
      <About />
      <GlobeSection />
      <SectionFourCards />
      <ServicesDarkSection />
      <StepsSection title="Modernes Webdesign" />
      {/* Lead-Form + WireSphere */}
      <LeadFormSection
        eyebrow="://web/sie/sind/?"
        title="Bereit zu fragen"
      />
      <GeoAccordionSection />
      <ReviewsSection />
    </main>
  );
}