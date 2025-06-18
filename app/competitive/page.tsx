"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  Target,
  Zap,
  Award,
  Github,
  Code,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import GithubStats from "@/components/github-stats";
import LeetcodeStats from "@/components/leetcode-stats";
import CodeforcesStats from "@/components/codeforces-stats";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { GridOverlay } from "@/components/ui/grid-overlay";
import { githubAPI, leetcodeAPI, codeforcesAPI } from "@/lib/platform-api";

// Stats Overview Component
function StatsOverview() {
  const { data: githubUser } = useQuery({
    queryKey: ["github-user"],
    queryFn: () => githubAPI.getUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: leetcodeUser } = useQuery({
    queryKey: ["leetcode-user"],
    queryFn: () => leetcodeAPI.getUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: codeforcesUser } = useQuery({
    queryKey: ["codeforces-user"],
    queryFn: () => codeforcesAPI.getUser(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const { data: githubRepos } = useQuery({
    queryKey: ["github-repos"],
    queryFn: () => githubAPI.getRepos(),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  // Calculate years active based on GitHub account creation
  const getYearsActive = () => {
    if (!githubUser?.created_at) return "2+";
    const createdDate = new Date(githubUser.created_at);
    const now = new Date();
    const years = Math.floor(
      (now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24 * 365)
    );
    return `${years}+`;
  };

  // Get total problems solved
  const getTotalProblemsSolved = () => {
    return leetcodeUser?.totalSolved || "Loading...";
  };

  // Get Codeforces rank
  const getCodeforcesRank = () => {
    return codeforcesUser?.rank || "Unrated";
  };

  // Get total repositories
  const getTotalRepos = () => {
    return githubRepos?.length || githubUser?.public_repos || "Loading...";
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
      <div className="bg-figma-menu border border-white/10 rounded-lg p-6 text-center hover:border-figma-purple/30 transition-all duration-300 group">
        <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Trophy className="w-6 h-6 text-black" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {getTotalProblemsSolved()}
        </h3>
        <p className="text-white/70">Problems Solved</p>
      </div>

      <div className="bg-figma-menu border border-white/10 rounded-lg p-6 text-center hover:border-figma-purple/30 transition-all duration-300 group">
        <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Target className="w-6 h-6 text-black" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {getCodeforcesRank()}
        </h3>
        <p className="text-white/70">Codeforces Rank</p>
      </div>

      <div className="bg-figma-menu border border-white/10 rounded-lg p-6 text-center hover:border-figma-purple/30 transition-all duration-300 group">
        <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Zap className="w-6 h-6 text-black" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {getYearsActive()}
        </h3>
        <p className="text-white/70">Years Active</p>
      </div>

      <div className="bg-figma-menu border border-white/10 rounded-lg p-6 text-center hover:border-figma-purple/30 transition-all duration-300 group">
        <div className="w-12 h-12 bg-figma-gradient rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Award className="w-6 h-6 text-black" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">
          {getTotalRepos()}
        </h3>
        <p className="text-white/70">Public Repos</p>
      </div>
    </div>
  );
}

// Platform Links Component
function PlatformLinks() {
  const platforms = [
    {
      name: "GitHub",
      url: "https://github.com/yashs33244",
      icon: Github,
      description: "Open source projects and contributions",
      color: "bg-gray-900 hover:bg-gray-800",
    },
    {
      name: "LeetCode",
      url: "https://leetcode.com/yashs33244/",
      icon: Code,
      description: "Problem solving and algorithms",
      color: "bg-orange-600 hover:bg-orange-700",
    },
    {
      name: "Codeforces",
      url: "https://codeforces.com/profile/yashs33244",
      icon: Target,
      description: "Competitive programming contests",
      color: "bg-blue-600 hover:bg-blue-700",
    },
  ];

  return (
    <section className="py-16">
      <div className="figma-container">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-white mb-4 font-poppins text-center">
            Coding <span className="text-figma-gradient">Platforms</span>
          </h2>
          <p className="text-white/70 text-center max-w-2xl mx-auto text-lg">
            Connect with me on various coding platforms to see my latest
            activities and achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {platforms.map((platform, index) => {
            const IconComponent = platform.icon;
            return (
              <Link
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="bg-figma-menu border border-white/10 rounded-lg p-6 hover:border-figma-purple/30 transition-all duration-300 group-hover:scale-105">
                  <div
                    className={`w-12 h-12 ${platform.color} rounded-full flex items-center justify-center mb-4 transition-colors duration-300`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">
                      {platform.name}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-white/60 group-hover:text-figma-purple transition-colors duration-300" />
                  </div>
                  <p className="text-white/70">{platform.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Competitive() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
      },
    },
  });

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
                Journey through my competitive programming achievements,
                real-time statistics, and problem-solving adventures across
                multiple platforms.
              </p>

              <div
                className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-600 delay-900 ${
                  mounted ? "opacity-100 scale-100" : "opacity-0 scale-75"
                }`}
              >
                <Button
                  asChild
                  className="bg-figma-gradient hover:bg-figma-gradient/90 text-black font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link href="https://leetcode.com/yashs33244/">
                    <Target className="mr-2 w-5 h-5" />
                    View LeetCode Profile
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  className="border-white hover:border-transparent text-white hover:text-black bg-transparent hover:bg-figma-gradient font-medium text-lg px-8 py-4 h-auto rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Link href="https://github.com/yashs33244">
                    <Github className="mr-2 w-5 h-5" />
                    GitHub Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-16">
          <div className="figma-container">
            <div
              className={`transition-all duration-1000 delay-400 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-figma-menu border border-white/10 rounded-lg p-6 text-center animate-pulse"
                      >
                        <div className="w-12 h-12 bg-white/10 rounded-full mx-auto mb-4"></div>
                        <div className="h-8 bg-white/10 rounded mb-2"></div>
                        <div className="h-4 bg-white/10 rounded"></div>
                      </div>
                    ))}
                  </div>
                }
              >
                <StatsOverview />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Platform Links */}
        <div
          className={`transition-all duration-1000 delay-600 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          <PlatformLinks />
        </div>

        {/* Platform Stats */}
        <section className="py-16">
          <div className="figma-container">
            <div
              className={`mb-12 transition-all duration-1000 delay-800 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <h2 className="text-4xl font-bold text-white mb-4 font-poppins text-center">
                Real-time{" "}
                <span className="text-figma-gradient">Statistics</span>
              </h2>
              <p className="text-white/70 text-center max-w-2xl mx-auto text-lg">
                Live statistics and analytics from my coding platforms,
                featuring interactive charts and comprehensive performance
                metrics.
              </p>
            </div>

            <div className="space-y-12">
              {/* GitHub Stats */}
              <div
                className={`transition-all duration-1000 delay-1000 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-figma-gradient rounded-full flex items-center justify-center">
                      <Github className="w-5 h-5 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-poppins">
                      GitHub Analytics
                    </h3>
                    <Link
                      href="https://github.com/yashs33244"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto"
                    >
                      <ExternalLink className="w-5 h-5 text-white/60 hover:text-figma-purple transition-colors duration-300" />
                    </Link>
                  </div>
                  <Suspense
                    fallback={<Loader text="Loading GitHub statistics..." />}
                  >
                    <GithubStats detailed={true} />
                  </Suspense>
                </div>
              </div>

              {/* LeetCode Stats */}
              <div
                className={`transition-all duration-1000 delay-1200 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-figma-gradient rounded-full flex items-center justify-center">
                      <Code className="w-5 h-5 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-poppins">
                      LeetCode Progress
                    </h3>
                    <Link
                      href="https://leetcode.com/yashs33244/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto"
                    >
                      <ExternalLink className="w-5 h-5 text-white/60 hover:text-figma-purple transition-colors duration-300" />
                    </Link>
                  </div>
                  <Suspense
                    fallback={<Loader text="Loading LeetCode statistics..." />}
                  >
                    <LeetcodeStats />
                  </Suspense>
                </div>
              </div>

              {/* Codeforces Stats */}
              <div
                className={`transition-all duration-1000 delay-1400 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-12"
                }`}
              >
                <div className="bg-figma-menu border border-white/10 rounded-lg p-8 hover:border-figma-purple/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 bg-figma-gradient rounded-full flex items-center justify-center">
                      <Target className="w-5 h-5 text-black" />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-poppins">
                      Codeforces Journey
                    </h3>
                    <Link
                      href="https://codeforces.com/profile/yashs33244"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto"
                    >
                      <ExternalLink className="w-5 h-5 text-white/60 hover:text-figma-purple transition-colors duration-300" />
                    </Link>
                  </div>
                  <Suspense
                    fallback={
                      <Loader text="Loading Codeforces statistics..." />
                    }
                  >
                    <CodeforcesStats />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16">
          <div className="figma-container">
            <div
              className={`text-center transition-all duration-1000 delay-1600 ${
                mounted
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
            >
              <div className="bg-figma-menu border border-white/10 rounded-lg p-12">
                <h2 className="text-3xl font-bold text-white mb-6 font-poppins">
                  Want to Collaborate on a Project?
                </h2>
                <p className="text-white/70 mb-8 max-w-2xl mx-auto text-lg">
                  I'm always interested in challenging problems and innovative
                  solutions. Let's build something amazing together!
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
    </QueryClientProvider>
  );
}
