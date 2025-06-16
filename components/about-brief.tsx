"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { technologies } from "@/lib/mdx";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutBrief() {
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const techMarqueeRef = useRef<HTMLDivElement>(null);
  const companiesRef = useRef<HTMLDivElement>(null);
  const achievementsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Null checks
      if (
        !sectionRef.current ||
        !headerRef.current ||
        !techMarqueeRef.current ||
        !companiesRef.current ||
        !achievementsRef.current
      ) {
        return;
      }

      // Set initial states
      gsap.set(
        [
          headerRef.current,
          techMarqueeRef.current,
          companiesRef.current,
          achievementsRef.current,
        ],
        {
          opacity: 0,
          y: 50,
        }
      );

      // Main animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      // Animate elements in sequence
      tl.to(headerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      })
        .to(
          techMarqueeRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          companiesRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .to(
          achievementsRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        );

      // Animate achievement cards individually
      const achievementCards =
        achievementsRef.current.querySelectorAll(".achievement-card");
      achievementCards.forEach((card: Element, index: number) => {
        gsap.fromTo(
          card,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            delay: 1.5 + index * 0.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
              once: true,
            },
          }
        );
      });

      // Add hover animations for tech cards
      const techCards = document.querySelectorAll(".tech-card");
      techCards.forEach((card: Element) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });

      // Add hover animations for company cards
      const companyCards = document.querySelectorAll(".company-card");
      companyCards.forEach((card: Element) => {
        const cardElement = card as HTMLElement;
        cardElement.addEventListener("mouseenter", () => {
          gsap.to(cardElement, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        cardElement.addEventListener("mouseleave", () => {
          gsap.to(cardElement, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  // Companies from experience section
  const companies = [
    {
      name: "ViewR",
      logo: "/logos/viewr.svg",
    },
    {
      name: "IIT Mandi",
      logo: "/logos/iit-mandi.svg",
    },
    {
      name: "finalCV",
      logo: "/logos/finalcv.svg",
    },
  ];

  // Technology Card Component
  const TechCard = ({ tech }: { tech: { name: string; icon: string } }) => {
    return (
      <div className="tech-card flex items-center gap-4 whitespace-nowrap group mx-4">
        <div className="w-8 h-8 relative flex-shrink-0">
          <Image
            src={tech.icon}
            alt={`${tech.name} logo`}
            width={32}
            height={32}
            className="object-contain filter brightness-0 invert group-hover:filter-none transition-all duration-300"
            onError={(e) => {
              // Fallback to a simple colored circle if image fails to load
              const target = e.currentTarget as HTMLImageElement;
              const nextElement = target.nextElementSibling as HTMLElement;
              target.style.display = "none";
              if (nextElement) {
                nextElement.style.display = "block";
              }
            }}
          />
          <div className="w-8 h-8 bg-figma-gradient rounded-full hidden" />
        </div>
        <span className="text-lg font-medium text-white/90 font-poppins group-hover:text-figma-gradient transition-colors duration-300">
          {tech.name}
        </span>
      </div>
    );
  };

  // Company Card Component with individual hover effects
  const CompanyCard = ({
    company,
  }: {
    company: { name: string; logo: string };
  }) => {
    return (
      <div className="company-card flex items-center gap-3 whitespace-nowrap mx-4">
        <div className="w-10 h-10 bg-figma-menu border border-white/10 rounded-lg flex items-center justify-center transition-colors duration-300 hover:border-figma-purple/30">
          <span className="text-white/80 font-bold text-sm transition-colors duration-300 hover:text-figma-gradient">
            {company.name.charAt(0)}
          </span>
        </div>
        <span className="text-xl font-medium text-white/80 font-poppins transition-all duration-300 hover:text-white">
          {company.name}
        </span>
        <div className="w-1.5 h-1.5 bg-figma-gradient rounded-full" />
      </div>
    );
  };

  return (
    <section ref={sectionRef} className="bg-figma-dark mt-[100px]">
      <div className="figma-container">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4 font-poppins">
            Technologies & <span className="text-figma-gradient">Tools</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Cutting-edge technologies and tools I use to build scalable, secure,
            and innovative solutions.
          </p>
        </div>

        {/* Technologies Marquee */}
        <div ref={techMarqueeRef} className="mb-12">
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t border-b border-white/10 py-8">
            <Marquee pauseOnHover className="[--duration:30s]" repeat={10}>
              {technologies.map((tech, index) => (
                <TechCard key={`${tech.name}-${index}`} tech={tech} />
              ))}
            </Marquee>

            {/* Gradient overlays for infinite effect */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-figma-dark to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-figma-dark to-transparent"></div>
          </div>
        </div>

        {/* Companies Section */}
        <div ref={companiesRef}>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2 font-poppins">
              Experience <span className="text-figma-gradient">Journey</span>
            </h3>
            <p className="text-white/60">Organizations I've contributed to</p>
          </div>

          {/* Companies Marquee */}
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden border-t border-b border-white/5 py-6">
            <Marquee pauseOnHover className="[--duration:20s]" repeat={12}>
              {companies.map((company, index) => (
                <CompanyCard
                  key={`${company.name}-${index}`}
                  company={company}
                />
              ))}
            </Marquee>
            {/* Gradient overlays for infinite effect */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-figma-dark to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-figma-dark to-transparent"></div>
          </div>
        </div>

        {/* Achievements Section */}
        <div ref={achievementsRef} className="mt-16">
          <div className="bg-figma-menu border border-white/10 rounded-lg p-8 bg-grainy-gradient-subtle">
            <h3 className="text-2xl font-bold text-white mb-6 font-poppins text-center">
              Key <span className="text-figma-gradient">Achievements</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="achievement-card text-center group">
                <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-black font-bold text-lg">4th</span>
                </div>
                <p className="text-white/80 text-sm">
                  Largest Hackathon in Una, HP
                </p>
                <p className="text-white/60 text-xs mt-1">
                  Secure HD Crypto Wallet
                </p>
              </div>

              <div className="achievement-card text-center group">
                <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-black font-bold text-lg">4th</span>
                </div>
                <p className="text-white/80 text-sm">AlgoUniversity Contest</p>
                <p className="text-white/60 text-xs mt-1">₹2000 Cash Prize</p>
              </div>

              <div className="achievement-card text-center group">
                <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-black font-bold text-lg">7th</span>
                </div>
                <p className="text-white/80 text-sm">College Hackathon</p>
                <p className="text-white/60 text-xs mt-1">
                  Music Similarity Score
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
