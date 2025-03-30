import Hero from "@/components/hero";
import About from "@/components/about-brief";
import FeaturedProjects from "@/components/featured-projects";
import Skills from "@/components/skills-overview";
import GithubStats from "@/components/github-stats";
import CodingProfiles from "@/components/coding-profiles";
import CallToAction from "@/components/call-to-action";

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Hero />
      <About />
      <FeaturedProjects />
      <Skills />
      <GithubStats />
      <CallToAction />
    </div>
  );
}
