import Hero from "@/components/hero";
import About from "@/components/about-brief";
import ProcessSection from "@/components/process-section";
import FeaturedProjects from "@/components/featured-projects";
import Testimonials from "@/components/testimonials";
import BuyMeCoffee from "@/components/buy-me-coffee";
import CallToAction from "@/components/call-to-action";

export default function Home() {
  return (
    <div className="bg-figma-dark min-h-screen">
      {/* Grid background overlay */}
      <div className="figma-grid fixed inset-0 pointer-events-none opacity-30" />

      {/* Main content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <ProcessSection />
        <FeaturedProjects />
        <Testimonials />
        <BuyMeCoffee />
        <CallToAction />
      </div>
    </div>
  );
}
