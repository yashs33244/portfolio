"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TypingAnimation } from "@/components/magicui/typing-animation";
import { InteractiveHoverButton } from "./magicui/interactive-hover-button";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const rotatingWords = [
    "websites",
    "solutions",
    "applications",
    "experiences",
    "systems",
    "platforms",
  ];

  useEffect(() => {
    setMounted(true);

    // Set up word rotation with faster timing
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2000); // Reduced from longer interval to 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[718px] bg-figma-dark flex items-center justify-center overflow-hidden">
      {/* Dynamic Grid overlay - responsive and centered */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {/* Vertical lines - dynamic spacing based on viewport */}
          {Array.from({ length: 7 }, (_, i) => (
            <div
              key={`vertical-${i}`}
              className={`absolute w-px bg-white transition-opacity duration-1000 ${
                mounted ? "opacity-20" : "opacity-0"
              }`}
              style={{
                left: `${-840 + i * 240}px`,
                top: `-400px`,
                height: `800px`,
                transitionDelay: `${i * 100}ms`,
              }}
            />
          ))}

          {/* Horizontal lines - dynamic spacing */}
          {Array.from({ length: 10 }, (_, i) => (
            <div
              key={`horizontal-${i}`}
              className={`absolute h-px bg-white transition-opacity duration-1000 ${
                mounted ? "opacity-20" : "opacity-0"
              }`}
              style={{
                top: `${-359 + i * 90}px`,
                left: `-600px`,
                width: `1200px`,
                transitionDelay: `${(9 + i) * 100}ms`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content Box - creates a clear area in the grid */}
      <div className="relative z-10">
        {/* Content background box that masks the grid - Responsive size */}
        <div className="absolute inset-0 bg-figma-dark rounded-lg shadow-2xl border border-white/10 backdrop-blur-sm w-[90vw] max-w-[800px] h-[350px] sm:h-[400px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>

        {/* Actual content - Responsive container */}
        <div className="relative z-20 text-center px-4 sm:px-8 w-[90vw] max-w-[800px] h-[350px] sm:h-[400px] flex flex-col justify-center items-center">
          <div className="space-y-6">
            <h1
              className={`text-[32px] sm:text-[40px] md:text-[60px] lg:text-[80px] leading-[0.9] text-white transition-all duration-1000 delay-300 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
            >
              Full-stack developer &{" "}
              <span className="text-figma-gradient">cloud architect</span>
            </h1>

            {/* Fixed height container for typing animation */}
            <div className="h-[50px] sm:h-[60px] flex items-center justify-center">
              <div
                className={`text-white/80 text-lg sm:text-xl md:text-2xl transition-all duration-1000 delay-600 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                I design and build clean{" "}
                <span className="text-figma-gradient font-medium">
                  {mounted && (
                    <TypingAnimation
                      key={currentWordIndex}
                      className="inline text-lg sm:text-xl md:text-2xl"
                      duration={50}
                      delay={0}
                      as="span"
                    >
                      {rotatingWords[currentWordIndex]}
                    </TypingAnimation>
                  )}
                </span>
              </div>
            </div>

            <div
              className={`transition-all duration-800 delay-900 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <InteractiveHoverButton>
                <Link href="/contact">Hire me</Link>
              </InteractiveHoverButton>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom border line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10"></div>
    </section>
  );
}
