"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { ExternalLink } from "lucide-react";

const reviews = [
  {
    name: "Prakhar Gupta",
    username: "@pgpm",
    body: "Yash's contribution to finalCV was exceptional. His technical expertise in building scalable backend systems and attention to detail made our vision a reality. Working with him was seamless.",
    img: "https://avatar.vercel.sh/prakhar",
    role: "Senior Product Manager at CarInfo",
    company: "Previously at Paytm, Daytona",
    linkedin: "https://www.linkedin.com/in/pgpm/",
  },
  {
    name: "Mehul Chaudhary",
    username: "@cmehul",
    body: "Yash brought incredible technical depth to finalCV. His ability to implement complex features while maintaining clean architecture impressed our entire team. A true problem solver.",
    img: "https://avatar.vercel.sh/mehul",
    role: "UX Researcher",
    company: "Previously at Swiggy, Flipkart, Uber, Amazon",
    linkedin: "https://www.linkedin.com/in/cmehul/",
  },
  {
    name: "Yatin Singla",
    username: "@ysingla",
    body: "Working with Yash on Malfoy was remarkable. He handled the entire backend and DevOps infrastructure flawlessly. His technical skills and reliability are top-notch.",
    img: "https://avatar.vercel.sh/yatin",
    role: "Currently in Stealth",
    company: "Previously at Google, Twitter",
    linkedin: "https://www.linkedin.com/in/ysingla/",
  },
  {
    name: "Moksha",
    username: "@moshimoshe",
    body: "Yash's backend and DevOps work on Malfoy exceeded expectations. His systematic approach to building scalable systems and problem-solving abilities are outstanding.",
    img: "https://avatar.vercel.sh/moksha",
    role: "Stealth & Bessemer Venture Partners",
    company: "Previously at KRAFTON Inc, Innoterra",
    linkedin: "https://www.linkedin.com/in/moshimoshe/",
  },
  {
    name: "Deepanshu Rohilla",
    username: "@deepanshu",
    body: "Yash's contribution to ViewR was instrumental in our success. His technical expertise and collaborative approach made complex challenges seem effortless. Highly recommend!",
    img: "https://avatar.vercel.sh/deepanshu",
    role: "Stage 1 Stealth",
    company: "Previously at Ola's CEO Office, Wishlink, Instabase",
    linkedin: "https://www.linkedin.com/in/deepanshu-rohilla/",
  },
  {
    name: "Abhinav Singhal",
    username: "@abhinav",
    body: "Working with Yash on ViewR was exceptional. His technical skills in building robust systems and attention to detail significantly contributed to our startup's foundation.",
    img: "https://avatar.vercel.sh/abhinav",
    role: "Quantbox Research",
    company: "Co-founder at ViewR",
    linkedin: "https://www.linkedin.com/in/abhinav-singhal-01bba91b6/",
  },
  {
    name: "Vaibhav Aggarwal",
    username: "@vaibhavrja",
    body: "Yash's work on finalCV showcased his exceptional development skills. His ability to translate complex requirements into elegant solutions is remarkable. Great team player!",
    img: "https://avatar.vercel.sh/vaibhav",
    role: "UI Engineer at Flipkart",
    company: "Previously at Cars24, GeeksforGeeks",
    linkedin: "https://www.linkedin.com/in/vaibhavrja/",
  },
];

const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

const ReviewCard = ({
  img,
  name,
  username,
  body,
  role,
  company,
  linkedin,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  role: string;
  company: string;
  linkedin: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-80 cursor-pointer overflow-hidden rounded-xl border p-6 mx-4",
        "bg-figma-menu border-white/10 hover:border-figma-purple/30 transition-all duration-300 hover:scale-[1.02]"
      )}
    >
      <div className="flex flex-row items-start gap-3 mb-4">
        <img
          className="rounded-full ring-2 ring-figma-gradient/20"
          width="48"
          height="48"
          alt={`${name} avatar`}
          src={img}
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <figcaption className="text-base font-semibold text-white font-poppins">
              {name}
            </figcaption>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-figma-purple hover:text-figma-orange transition-colors"
              aria-label={`${name}'s LinkedIn profile`}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <p className="text-sm font-medium text-figma-purple/80 leading-tight">
            {role}
          </p>
          <p className="text-xs font-medium text-white/40 leading-tight">
            {company}
          </p>
          <p className="text-xs font-medium text-white/30">{username}</p>
        </div>
      </div>
      <blockquote className="text-sm text-white/80 leading-relaxed font-poppins">
        "{body}"
      </blockquote>

      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-xl bg-figma-gradient opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
    </figure>
  );
};

export default function Testimonials() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="bg-figma-dark py-16">
      <div className="figma-container">
        {/* Section title */}
        <div
          className={`flex items-center gap-4 mb-16 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-[40px] font-normal leading-[56px] text-white font-poppins">
            Client testimonials
          </h2>
          <div className="w-9 h-9 bg-transparent border border-white/20 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white/10 rounded" />
          </div>
        </div>

        {/* Testimonials Marquee */}
        <div
          className={`transition-all duration-1000 delay-300 ${
            mounted ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
            <Marquee pauseOnHover className="[--duration:35s]" repeat={6}>
              {firstRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className="[--duration:40s] mt-4"
              repeat={6}
            >
              {secondRow.map((review) => (
                <ReviewCard key={review.username} {...review} />
              ))}
            </Marquee>

            {/* Gradient overlays for seamless infinite effect */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-figma-dark to-transparent"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-figma-dark to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
