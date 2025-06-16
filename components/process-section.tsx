"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShineBorder } from "@/components/magicui/shine-border";

export default function ProcessSection() {
  const processSteps = [
    {
      id: 1,
      title: "Step 1: Research the Market",
      description:
        "This initial step involves a systematic and thorough exploration of the market landscape, competitor analysis, and identifying opportunities for innovation and improvement.",
      hasButton: false,
    },
    {
      id: 2,
      title: "Step 2: Gather Functional Requirements",
      description:
        "I work closely with clients to understand their specific needs, business objectives, and functional requirements to ensure the solution aligns perfectly with their goals.",
      hasButton: false,
    },
    {
      id: 3,
      title: "Step 3: System Design Research",
      description:
        "Deep dive into system architecture, technology stack selection, scalability patterns, and design principles to create a robust foundation for the solution.",
      hasButton: false,
    },
    {
      id: 4,
      title: "Step 4: Build V1 & Get Client Feedback",
      description:
        "Develop the initial version with core features, present it to the client, gather valuable feedback, and iterate based on their input to ensure optimal results.",
      hasButton: true,
    },
  ];

  // SVG Component with rotation prop
  const ProcessSVG = ({ rotation }: { rotation: number }) => (
    <div className="process-svg w-14 h-14 mb-20 mt-[8px]">
      <svg
        width="54"
        height="56"
        viewBox="0 0 54 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <path
          d="M53.8958 17.3507C51.432 11.3596 46.9672 6.40809 41.2619 3.33988C35.5567 0.271662 28.964 -0.723412 22.6074 0.524199C16.2507 1.77181 10.5233 5.18492 6.40098 10.182C2.27869 15.179 0.0165768 21.4508 9.0676e-05 27.9287C-0.0163955 34.4067 2.21376 40.6899 6.31057 45.7079C10.4074 50.7258 16.1174 54.168 22.4676 55.448C28.8178 56.7279 35.4154 55.7664 41.1362 52.7273C46.857 49.6882 51.347 44.7595 53.8413 38.7809L28 28L53.8958 17.3507Z"
          fill="url(#paint0_linear_3_93)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_3_93"
            x1="55.7769"
            y1="24.3575"
            x2="0.201696"
            y2="24.7785"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7A87FB" />
            <stop offset="1" stopColor="#FFD49C" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );

  return (
    <section className="bg-figma-dark py-16 grainy-gradient-subtle">
      <div className="figma-container">
        {/* Section title */}
        <div className="flex items-center gap-4 mb-20">
          <h2 className="text-[40px] font-normal leading-[56px] text-white font-poppins">
            My process to make scalable solutions
          </h2>
          <div className="w-9 h-9 bg-transparent border border-white/20 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white/10 rounded" />
          </div>
        </div>

        {/* Process steps */}
        <div className="relative">
          {/* Vertical line connecting steps - positioned to connect step numbers */}
          <div
            className="connecting-line absolute left-[46px] top-[46px] w-px bg-white/36"
            style={{ height: `${(processSteps.length - 1) * 389}px` }}
          />

          <div className="space-y-0">
            {processSteps.map((step, index) => (
              <div
                key={step.id}
                className="process-step relative flex items-start gap-12 min-h-[389px] group"
              >
                {/* Left side - Step number */}
                <div className="step-number flex items-center justify-center w-[93px] h-[93px] bg-transparent relative z-10">
                  <div className="relative w-14 h-14">
                    <div className="w-14 h-14 border border-white rounded-full flex items-center justify-center bg-figma-dark text-white font-poppins font-medium">
                      <ShineBorder
                        shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
                        borderWidth={1}
                        duration={14}
                      />
                      {step.id}
                    </div>
                    {step.id !== processSteps.length && (
                      <div
                        className="absolute w-px bg-gradient-to-b from-white/60 via-white/40 to-white/20 z-0"
                        style={{
                          height: `389px`,
                          top: "100%",
                          left: "50%",
                          transform: "translateX(-50%)",
                        }}
                      />
                    )}
                  </div>
                </div>

                {/* Right side - Step content */}
                <div
                  className="step-content flex-1"
                  style={{ paddingTop: "12px" }}
                >
                  {/* Gradient SVG with rotation */}
                  <ProcessSVG rotation={index * 90} />

                  <h3 className="text-[22px] font-normal leading-[33px] text-white font-poppins mb-4 group-hover:text-figma-gradient transition-colors duration-300">
                    {step.title}
                  </h3>

                  <p className="text-[19px] font-normal leading-[28px] text-white/80 font-poppins mb-8 max-w-[586px]">
                    {step.description}
                  </p>

                  {step.hasButton && (
                    <Button
                      asChild
                      className="bg-transparent hover:bg-figma-gradient hover:text-black text-white border border-figma-gradient rounded-full px-6 py-3 h-auto transition-all duration-300"
                    >
                      <Link href="/projects">See Examples</Link>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
