"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="bg-figma-dark py-24 md:py-32 relative overflow-hidden grainy-gradient-primary">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 figma-grid opacity-20"></div>

      <div className="figma-container relative z-10">
        <div className="relative min-h-[500px] flex items-center">
          {/* Content - Positioned creatively instead of center */}
          <div className="relative z-10 max-w-[900px] ml-0 md:ml-8 lg:ml-16">
            {/* Main Heading */}
            <h2 className="text-[48px] md:text-[72px] lg:text-[96px] font-bold leading-[0.9] text-white font-poppins mb-8 tracking-tight">
              Have a{" "}
              <span className="text-figma-gradient bg-gradient-to-r from-[#7a87fb] to-[#ffd49c] bg-clip-text text-transparent bg-[length:200%_auto]">
                Big Idea
              </span>{" "}
              for Your Project?
            </h2>

            {/* Subtext */}
            <p className="text-lg md:text-xl lg:text-2xl font-normal leading-relaxed text-white/80 font-poppins mb-12 max-w-[700px]">
              Ready to bring your vision to life? Let's collaborate to build
              <span className="text-figma-gradient font-medium bg-gradient-to-r from-[#7a87fb] to-[#ffd49c] bg-clip-text text-transparent">
                {" "}
                scalable, innovative solutions{" "}
              </span>
              that drive real results for your business.
            </p>

            {/* CTA Button */}
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mb-16">
              <Button
                asChild
                className="bg-transparent border-2 border-white/30 hover:border-figma-gradient text-white hover:bg-figma-gradient hover:text-black font-semibold text-lg px-12 py-6 h-auto rounded-full transition-all duration-300"
              >
                <Link href="/contact">Send me a message</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="bg-transparent border-2 border-white/30 hover:border-figma-gradient text-white hover:bg-figma-gradient hover:text-black font-semibold text-lg px-12 py-6 h-auto rounded-full transition-all duration-300"
              >
                <Link href="/projects">View My Work</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8 border-t border-white/10">
              <div className="flex items-center gap-12 flex-wrap">
                <div className="text-left">
                  <div className="text-3xl md:text-4xl font-bold text-figma-gradient font-poppins">
                    10+
                  </div>
                  <p className="text-sm text-white/60 font-poppins mt-1">
                    Industry Leaders
                  </p>
                </div>
                <div className="text-left">
                  <div className="text-3xl md:text-4xl font-bold text-figma-gradient font-poppins">
                    50+
                  </div>
                  <p className="text-sm text-white/60 font-poppins mt-1">
                    Projects Delivered
                  </p>
                </div>
                <div className="text-left">
                  <div className="text-3xl md:text-4xl font-bold text-figma-gradient font-poppins">
                    99%
                  </div>
                  <p className="text-sm text-white/60 font-poppins mt-1">
                    Client Satisfaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div>
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-[#7a87fb]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-tl from-[#ffd49c]/20 to-transparent rounded-full blur-3xl"></div>
      </div>
    </section>
  );
}
