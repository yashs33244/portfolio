"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Trophy, Target, Zap, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import GithubStats from "@/components/github-stats";
import LeetcodeStats from "@/components/leetcode-stats";
import CodeforcesStats from "@/components/codeforces-stats";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GridOverlay } from "@/components/ui/grid-overlay";

export default function Competitive() {
  const queryClient = new QueryClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
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
                Competitive{" "}
                <span className="text-figma-gradient bg-clip-text text-transparent">
                  Programming
                </span>
              </h1>

              <p
                className={`text-xl md:text-2xl font-normal leading-[32px] text-white/80 font-poppins mb-12 max-w-[600px] mx-auto transition-all duration-800 delay-600 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                Journey through my competitive programming achievements, stats,
                and problem-solving adventures.
              </p>

              <Button
                asChild
                className={`bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-600 delay-900 hover:scale-105 ${
                  mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              >
                <Link href="https://leetcode.com/yashs33244/">
                  <Target className="mr-2 w-5 h-5" />
                  View My Profiles
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-16">
          <div className="figma-container">
            <div
              className={`grid grid-cols-1 md:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-figma-menu border border-white/10 rounded-lg p-6 text-center hover:border-figma-purple/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Trophy className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">800+</h3>
                <p className="text-white/70">Problems Solved</p>
              </div>

              <div className="bg-figma-menu border border-white/10 rounded-lg p-6 text-center hover:border-figma-purple/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Pupil</h3>
                <p className="text-white/70">Codeforces Rating</p>
              </div>

              <div className="bg-figma-menu border border-white/10 rounded-lg p-6 text-center hover:border-figma-purple/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">2+</h3>
                <p className="text-white/70">Years Active</p>
              </div>

              <div className="bg-figma-menu border border-white/10 rounded-lg p-6 text-center hover:border-figma-purple/30 transition-all duration-300 group">
                <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-6 h-6 text-black" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">4th</h3>
                <p className="text-white/70">Hackathon Rank</p>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Stats */}
        <section className="py-16">
          <div className="figma-container">
            <div
              className={`mb-12 transition-all duration-1000 delay-600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <h2 className="text-4xl font-bold text-white mb-4 font-poppins text-center">
                Platform <span className="text-figma-gradient">Statistics</span>
              </h2>
              <p className="text-white/70 text-center max-w-2xl mx-auto text-lg">
                Real-time statistics from my favorite competitive programming
                platforms.
              </p>
            </div>

            <div className="space-y-12">
              {/* GitHub Stats */}
              <div
                className={`transition-all duration-1000 delay-800 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-6 font-poppins flex items-center gap-3">
                    <div className="w-8 h-8 bg-figma-gradient rounded-full flex items-center justify-center">
                      <span className="text-black font-bold">G</span>
                    </div>
                    GitHub Stats
                  </h3>
                  <Suspense
                    fallback={<Loader text="Loading GitHub stats..." />}
                  >
                    <GithubStats detailed={true} />
                  </Suspense>
                </div>
              </div>

              {/* LeetCode Stats */}
              <div
                className={`transition-all duration-1000 delay-1000 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-6 font-poppins flex items-center gap-3">
                    <div className="w-8 h-8 bg-figma-gradient rounded-full flex items-center justify-center">
                      <span className="text-black font-bold">L</span>
                    </div>
                    LeetCode Stats
                  </h3>
                  <Suspense
                    fallback={<Loader text="Loading LeetCode stats..." />}
                  >
                    <LeetcodeStats />
                  </Suspense>
                </div>
              </div>

              {/* Codeforces Stats */}
              <div
                className={`transition-all duration-1000 delay-1200 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-6 font-poppins flex items-center gap-3">
                    <div className="w-8 h-8 bg-figma-gradient rounded-full flex items-center justify-center">
                      <span className="text-black font-bold">C</span>
                    </div>
                    Codeforces Stats
                  </h3>
                  <Suspense
                    fallback={<Loader text="Loading Codeforces stats..." />}
                  >
                    <CodeforcesStats />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Journey & Achievements */}
        <section className="py-16">
          <div className="figma-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Journey */}
              <div
                className={`transition-all duration-1000 delay-1400 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-6 font-poppins">
                    My Competitive{" "}
                    <span className="text-figma-gradient">Journey</span>
                  </h3>
                  <div className="space-y-4 text-white/80 leading-relaxed">
                    <p>
                      My journey into competitive programming began during my
                      first year of university. I've since participated in
                      numerous coding contests and solved hundreds of problems
                      across platforms.
                    </p>
                    <p>
                      I find competitive programming to be an excellent way to
                      improve problem-solving skills, algorithmic thinking, and
                      coding efficiency. It has significantly contributed to my
                      growth as a software engineer.
                    </p>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div
                className={`transition-all duration-1000 delay-1600 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-6 font-poppins">
                    Notable{" "}
                    <span className="text-figma-gradient">Achievements</span>
                  </h3>
                  <ul className="space-y-3">
                    {[
                      "Initiated two startups from bottom of the pyramid (ViewR, FinalCV)",
                      "Ranked 4th in the largest hackathon in Una, Himachal, for building a secure HD crypto wallet",
                      "Solved 800+ problems across platforms",
                      "Pupil rating on Codeforces",
                      "Consistent participation in weekly contests",
                    ].map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-figma-gradient rounded-full mt-2 flex-shrink-0" />
                        <span className="text-white/80">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-16">
          <div className="figma-container">
            <div
              className={`mb-12 transition-all duration-1000 delay-1800 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <h2 className="text-4xl font-bold text-white mb-4 font-poppins text-center">
                Recommended{" "}
                <span className="text-figma-gradient">Resources</span>
              </h2>
              <p className="text-white/70 text-center max-w-2xl mx-auto text-lg">
                Essential resources that helped me in my competitive programming
                journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Algorithms */}
              <div
                className={`transition-all duration-1000 delay-2000 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-6 font-poppins">
                    Data Structures & Algorithms
                  </h3>
                  <div className="space-y-4">
                    {[
                      {
                        name: "CP Algorithms",
                        url: "https://cp-algorithms.com/",
                      },
                      {
                        name: "GeeksforGeeks",
                        url: "https://www.geeksforgeeks.org/",
                      },
                      {
                        name: "LeetCode Explore",
                        url: "https://leetcode.com/explore/",
                      },
                    ].map((resource, index) => (
                      <Link
                        key={index}
                        href={resource.url}
                        target="_blank"
                        className="flex items-center justify-between p-3 bg-figma-dark rounded-lg hover:bg-figma-purple/10 transition-all duration-300 group"
                      >
                        <span className="text-white/80 group-hover:text-white">
                          {resource.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-figma-purple opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Platforms */}
              <div
                className={`transition-all duration-1000 delay-2200 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-300">
                  <h3 className="text-xl font-bold text-white mb-6 font-poppins">
                    Practice Platforms
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: "LeetCode", url: "https://leetcode.com/" },
                      { name: "Codeforces", url: "https://codeforces.com/" },
                      {
                        name: "HackerRank",
                        url: "https://www.hackerrank.com/",
                      },
                    ].map((platform, index) => (
                      <Link
                        key={index}
                        href={platform.url}
                        target="_blank"
                        className="flex items-center justify-between p-3 bg-figma-dark rounded-lg hover:bg-figma-purple/10 transition-all duration-300 group"
                      >
                        <span className="text-white/80 group-hover:text-white">
                          {platform.name}
                        </span>
                        <ArrowRight className="w-4 h-4 text-figma-purple opacity-0 group-hover:opacity-100 transition-all duration-300" />
                      </Link>
                    ))}
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
              className={`text-center transition-all duration-1000 delay-2400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-figma-menu border border-white/10 rounded-lg p-12">
                <h2 className="text-3xl font-bold text-white mb-6 font-poppins">
                  Interested in My Technical Projects?
                </h2>
                <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                  Explore my software development projects and see how
                  competitive programming influences my coding approach.
                </p>
                <Button
                  asChild
                  className="bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link href="/projects">
                    View My Projects
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </QueryClientProvider>
  );
}
