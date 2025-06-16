"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  MapPin,
  Calendar,
  Award,
  Users,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { GridOverlay } from "@/components/ui/grid-overlay";
import AboutBrief from "@/components/about-brief";
import ProcessSection from "@/components/process-section";

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const achievements = [
    {
      icon: Award,
      text: "4th Place in Major Hackathons",
      color: "text-yellow-400",
    },
    {
      icon: Users,
      text: "Research Assistant at IIT Mandi",
      color: "text-blue-400",
    },
    {
      icon: Briefcase,
      text: "Intern at ViewR (IIT Delhi Startup)",
      color: "text-green-400",
    },
    { icon: Calendar, text: "2+ Years Experience", color: "text-purple-400" },
  ];

  const personalStats = [
    { label: "Years Experience", value: "2+", icon: "🚀" },
    { label: "Projects Completed", value: "15+", icon: "💻" },
    { label: "Technologies", value: "20+", icon: "⚡" },
    { label: "Coffee Cups", value: "∞", icon: "☕" },
  ];

  return (
    <div className="min-h-screen bg-figma-dark">
      {/* Hero Section */}
      {/* <section className="relative py-20 overflow-hidden">
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
              About{" "}
              <span className="text-figma-gradient bg-clip-text text-transparent">
                Me
              </span>
            </h1>

            <p
              className={`text-xl md:text-2xl font-normal leading-[32px] text-white/80 font-poppins mb-12 max-w-[600px] mx-auto transition-all duration-800 delay-600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Full-stack developer & data science enthusiast building scalable
              solutions that make a difference.
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
      </section> */}
      {/* Personal Story Section */}
      <section className="py-16 bg-figma-dark">
        <div className="figma-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image Side */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-12"
              }`}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-figma-gradient rounded-2xl rotate-3 scale-105 opacity-20"></div>
                <div className="relative bg-figma-menu border border-white/10 rounded-2xl p-8 hover:border-figma-purple/30 transition-all duration-300">
                  <div className="aspect-square relative overflow-hidden rounded-xl mb-6">
                    <Image
                      src="/images/profile.jpeg"
                      alt="Yash Singh"
                      fill
                      className="object-cover object-center object-top transition-all duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw "
                    />
                  </div>

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/80 font-poppins">
                      Available for opportunities
                    </span>
                  </div>

                  <div className="space-y-2 text-white/60">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>India</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>IIIT Una, Class of 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div
              className={`transition-all duration-1000 delay-600 ${
                mounted
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 translate-x-12"
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <h2 className="text-[40px] font-normal leading-[56px] text-white font-poppins">
                    My Journey
                  </h2>
                  <div className="w-9 h-9 bg-transparent border border-white/20 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-white/10 rounded" />
                  </div>
                </div>

                <p className="text-white/80 text-lg leading-relaxed font-poppins mb-6">
                  I'm a passionate full-stack developer and data science
                  enthusiast from India, currently pursuing my Bachelor of
                  Technology at IIIT Una. My journey in technology is driven by
                  curiosity and a desire to build solutions that make a
                  difference.
                </p>

                <p className="text-white/80 text-lg leading-relaxed font-poppins mb-6">
                  Currently working as an intern at ViewR (IIT Delhi startup),
                  where I'm gaining experience in AWS cloud infrastructure,
                  Kubernetes CI/CD pipelines, and microservices. Previously, I
                  worked as a Research Assistant at IIT Mandi on authentication
                  systems and Graph Neural Networks.
                </p>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  {personalStats.map((stat, index) => (
                    <div
                      key={index}
                      className="bg-figma-menu border border-white/10 rounded-lg p-4 text-center hover:border-figma-purple/30 transition-all duration-300 group"
                    >
                      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
                        {stat.icon}
                      </div>
                      <div className="text-xl font-bold text-figma-gradient font-poppins">
                        {stat.value}
                      </div>
                      <div className="text-sm text-white/60">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Key Achievements */}
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 group cursor-pointer"
                    >
                      <achievement.icon
                        className={`w-5 h-5 ${achievement.color} group-hover:scale-110 transition-transform duration-300`}
                      />
                      <span className="text-white/80 group-hover:text-white transition-colors duration-300">
                        {achievement.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Brief Section with Marquee */}
      <AboutBrief />

      {/* Process Section */}
      <ProcessSection />

      {/* Education & Experience */}
      <section className="py-16 bg-figma-dark">
        <div className="figma-container">
          <div
            className={`mb-12 transition-all duration-1000 delay-400 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-[40px] font-normal leading-[56px] text-white font-poppins">
                Education & Experience
              </h2>
              <div className="w-9 h-9 bg-transparent border border-white/20 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white/10 rounded" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Education */}
            <div
              className={`transition-all duration-1000 delay-600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-lg">E</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-poppins">
                    Education
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      Indian Institute of Information Technology Una
                    </h4>
                    <Badge className="bg-figma-gradient text-black mb-2">
                      Bachelor of Technology
                    </Badge>
                    <p className="text-white/60 text-sm mb-2">
                      Oct 2022 - July 2026
                    </p>
                    <p className="text-figma-purple font-semibold">
                      GPA: 8.3/10.0
                    </p>
                    <p className="text-white/70 mt-2">
                      Key coursework: Data Structures & Algorithms, Database
                      Management, Computer Networks, Machine Learning
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div
              className={`transition-all duration-1000 delay-800 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-lg">W</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white font-poppins">
                    Work Experience
                  </h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      ViewR (IIT Delhi Startup)
                    </h4>
                    <Badge className="bg-figma-gradient text-black mb-2">
                      Intern
                    </Badge>
                    <p className="text-white/60 text-sm mb-2">Current</p>
                    <p className="text-white/70">
                      AWS cloud infrastructure, Kubernetes CI/CD pipelines,
                      microservices deployment
                    </p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      IIT Mandi
                    </h4>
                    <Badge className="bg-figma-gradient text-black mb-2">
                      Research Assistant
                    </Badge>
                    <p className="text-white/60 text-sm mb-2">Previous</p>
                    <p className="text-white/70">
                      Continuous authentication systems and compound olfaction
                      using Graph Neural Networks
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="figma-container">
          <div
            className={`text-center transition-all duration-1000 delay-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            }`}
          >
            <div className="bg-figma-menu border border-white/10 rounded-lg p-12 max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-6 font-poppins">
                Let's Build Something Amazing Together
              </h2>
              <p className="text-white/70 mb-8 text-lg max-w-2xl mx-auto">
                I'm always excited to work on new projects and collaborate with
                passionate people. Whether you have an idea or need technical
                expertise, let's connect!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  className="bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link href="/contact">
                    Get In Touch
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="bg-figma-menu border border-white/20 text-white hover:bg-white/10 hover:border-figma-purple/50 font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link href="/projects">
                    View My Work
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
