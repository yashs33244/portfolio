"use client";

import { useState, useEffect } from "react";
import ExperienceCard from "@/components/experience-card";
import SkillsDetailed from "@/components/skills-detailed";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Download,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import { experiences } from "@/lib/data";
import Link from "next/link";
import { GridOverlay } from "@/components/ui/grid-overlay";

export default function ExperiencePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-figma-dark">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <GridOverlay />

        <div className="figma-container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1
              className={`text-[60px] md:text-[80px] lg:text-[100px] font-bold leading-[0.9] text-white font-poppins mb-6 transition-all duration-1000 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              My{" "}
              <span className="text-figma-gradient bg-clip-text text-transparent">
                Experience
              </span>
            </h1>

            <p
              className={`text-xl md:text-2xl font-normal leading-[32px] text-white/80 font-poppins mb-12 max-w-[600px] mx-auto transition-all duration-800 delay-600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              A journey through my professional experiences, skills, and
              continuous learning in technology.
            </p>

            <Button
              asChild
              className={`bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-600 delay-900 hover:scale-105 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
              }`}
            >
              <Link href="https://drive.google.com/file/d/117KGPqnxCYgZ-tvHkL65yx9cbG3jv5AZ/view">
                <Download className="mr-2 w-5 h-5" />
                Download Resume
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="figma-container">
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 transition-all duration-1000 delay-400 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="bg-figma-menu border border-white/10 rounded-lg p-8 text-center hover:border-figma-purple/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Briefcase className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">2+</h3>
              <p className="text-white/70">Years Experience</p>
            </div>

            <div className="bg-figma-menu border border-white/10 rounded-lg p-8 text-center hover:border-figma-purple/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">IIIT</h3>
              <p className="text-white/70">Current Education</p>
            </div>

            <div className="bg-figma-menu border border-white/10 rounded-lg p-8 text-center hover:border-figma-purple/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Award className="w-8 h-8 text-black" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">8.3</h3>
              <p className="text-white/70">GPA Score</p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16">
        <div className="figma-container">
          <div
            className={`mb-12 transition-all duration-1000 delay-600 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-4xl font-bold text-white mb-4 font-poppins text-center">
              Professional <span className="text-figma-gradient">Journey</span>
            </h2>
            <p className="text-white/70 text-center max-w-2xl mx-auto text-lg">
              From internships to research roles, here's my professional
              experience in the tech industry.
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div
                key={experience.id}
                className={`transition-all duration-1000 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: `${800 + index * 200}ms` }}
              >
                <div className="bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-300 group">
                  <ExperienceCard experience={experience} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <div className="figma-container">
          <div
            className={`mb-12 transition-all duration-1000 delay-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <h2 className="text-4xl font-bold text-white mb-4 font-poppins text-center">
              Technical <span className="text-figma-gradient">Skills</span>
            </h2>
            <p className="text-white/70 text-center max-w-2xl mx-auto text-lg">
              Technologies and tools I work with to build amazing products and
              solutions.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 delay-1200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <SkillsDetailed />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="figma-container">
          <div
            className={`text-center transition-all duration-1000 delay-1400 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="bg-figma-menu border border-white/10 rounded-lg p-12">
              <h2 className="text-3xl font-bold text-white mb-6 font-poppins">
                Ready to Collaborate?
              </h2>
              <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                I'm always open to new opportunities and exciting challenges.
                Let's discuss how we can work together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link href="/contact">
                    Let's Connect
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white hover:border-transparent text-white hover:text-black bg-transparent hover:bg-figma-gradient font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link href="/projects">View My Projects</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
