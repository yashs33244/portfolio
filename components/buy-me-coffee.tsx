"use client";

import Link from "next/link";
import { Coffee, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BuyMeCoffee() {
  return (
    <section className="bg-figma-dark py-16 md:py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 figma-grid opacity-5"></div>

      <div className="figma-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-amber-500/20 p-4 rounded-full">
                <Coffee className="h-8 w-8 text-amber-400" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-poppins mb-4">
              Support My Work
            </h2>

            <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed">
              If you've found my content helpful or enjoyed reading my articles,
              consider buying me a coffee. Your support helps me create more
              quality content!
            </p>
          </div>

          {/* Coffee card */}
          <div className="bg-figma-menu border border-white/10 rounded-2xl p-8 md:p-12 max-w-md mx-auto mb-8 shadow-2xl">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 rounded-full">
                  <Coffee className="h-12 w-12 text-white" />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 font-poppins">
                Buy Me a Coffee
              </h3>

              <p className="text-white/60 mb-6 leading-relaxed">
                Fuel my coding sessions and help me create more awesome content
                for the community.
              </p>

              <Button
                asChild
                className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white font-semibold text-lg px-8 py-6 h-auto rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Link
                  href="https://www.buymeacoffee.com/tanishqsingh"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Coffee className="mr-2 h-5 w-5" />
                  Buy Me a Coffee
                </Link>
              </Button>
            </div>
          </div>

          {/* Appreciation message */}
          <div className="flex items-center justify-center gap-2 text-white/50">
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-sm">Every coffee is deeply appreciated</span>
            <Heart className="h-4 w-4 text-red-400" />
          </div>
        </div>
      </div>
    </section>
  );
}
