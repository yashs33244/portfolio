"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowRight,
  Trophy,
  TrendingUp,
  Target,
  Zap,
  Calendar,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface CodeForcesUserInfo {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  contribution: number;
  registrationTimeSeconds: number;
  friendOfCount: number;
  avatar: string;
  titlePhoto: string;
}

interface CodeForcesSubmission {
  id: number;
  contestId?: number;
  creationTimeSeconds: number;
  problem: {
    contestId?: number;
    index: string;
    name: string;
    type: string;
    points?: number;
    rating?: number;
    tags: string[];
  };
  author: {
    contestId?: number;
    members: {
      handle: string;
    }[];
    participantType: string;
    ghost: boolean;
    startTimeSeconds?: number;
  };
  programmingLanguage: string;
  verdict: string;
  testset: string;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
}

// Mock user data in case the API fails
const mockUserInfo: CodeForcesUserInfo = {
  handle: "yashs3324",
  rating: 1562,
  maxRating: 1648,
  rank: "specialist",
  maxRank: "expert",
  contribution: 12,
  registrationTimeSeconds: 1577836800, // January 1, 2020
  friendOfCount: 45,
  avatar: "",
  titlePhoto: "",
};

// Mock submissions data with enhanced statistics
const mockSubmissions: CodeForcesSubmission[] = Array.from({ length: 50 }).map(
  (_, i) => ({
    id: 1000 + i,
    contestId: 1400 + Math.floor(i / 5),
    creationTimeSeconds: Math.floor(Date.now() / 1000) - i * 86400,
    problem: {
      contestId: 1400 + Math.floor(i / 5),
      index: String.fromCharCode(65 + (i % 5)),
      name: `Problem ${String.fromCharCode(65 + (i % 5))}`,
      type: "PROGRAMMING",
      rating: 800 + (i % 10) * 200,
      tags: [
        ["implementation", "math", "greedy", "dp", "strings"][i % 5],
        [
          "binary search",
          "sortings",
          "two pointers",
          "dfs and similar",
          "trees",
        ][Math.floor(i / 10) % 5],
      ],
    },
    author: {
      contestId: 1400 + Math.floor(i / 5),
      members: [{ handle: "yashs3324" }],
      participantType: "CONTESTANT",
      ghost: false,
    },
    programmingLanguage: ["C++", "Python", "Java", "JavaScript"][i % 4],
    verdict:
      i % 3 === 0 ? "OK" : i % 3 === 1 ? "WRONG_ANSWER" : "TIME_LIMIT_EXCEEDED",
    testset: "TESTS",
    passedTestCount: i % 3 === 0 ? 10 : i % 10,
    timeConsumedMillis: 100 + (i % 10) * 50,
    memoryConsumedBytes: 1000000 + (i % 10) * 100000,
  })
);

async function fetchCodeforcesUserInfo(): Promise<CodeForcesUserInfo> {
  try {
    const response = await fetch(
      "https://codeforces.com/api/user.info?handles=yashs3324"
    );
    if (!response.ok) {
      console.warn("Failed to fetch Codeforces user info, using mock data");
      return mockUserInfo;
    }
    const data = await response.json();
    if (data.status !== "OK" || !data.result || !data.result[0]) {
      console.warn("Codeforces API returned invalid data, using mock data");
      return mockUserInfo;
    }
    return data.result[0];
  } catch (error) {
    console.error("Error fetching Codeforces user info:", error);
    return mockUserInfo;
  }
}

async function fetchCodeforcesSubmissions(): Promise<CodeForcesSubmission[]> {
  try {
    const response = await fetch(
      "https://codeforces.com/api/user.status?handle=yashs3324&from=1&count=100"
    );
    if (!response.ok) {
      console.warn("Failed to fetch Codeforces submissions, using mock data");
      return mockSubmissions;
    }
    const data = await response.json();
    if (data.status !== "OK" || !data.result) {
      console.warn(
        "Codeforces API returned invalid submissions data, using mock data"
      );
      return mockSubmissions;
    }
    return data.result;
  } catch (error) {
    console.error("Error fetching Codeforces submissions:", error);
    return mockSubmissions;
  }
}

function getRatingColor(rating: number): string {
  if (rating < 1200) return "#808080"; // Grey
  if (rating < 1400) return "#008000"; // Green
  if (rating < 1600) return "#03a89e"; // Cyan
  if (rating < 1900) return "#0000ff"; // Blue
  if (rating < 2100) return "#a0a"; // Violet
  if (rating < 2400) return "#ff8c00"; // Orange
  if (rating < 2600) return "#ff6b35"; // Orange (Our theme color)
  if (rating < 3000) return "#ff0000"; // Red
  return "#aa0000"; // Red
}

function getRankColor(rank: string): string {
  const rankColors: Record<string, string> = {
    newbie: "#808080",
    pupil: "#008000",
    specialist: "#03a89e",
    expert: "#0000ff",
    "candidate master": "#a0a",
    master: "#ff8c00",
    "international master": "#ff6b35",
    grandmaster: "#ff0000",
    "international grandmaster": "#aa0000",
    "legendary grandmaster": "#aa0000",
  };
  return rankColors[rank.toLowerCase()] || "#808080";
}

// Progress Bar Component
const ProgressBar = ({
  percentage,
  color,
  height = "8px",
}: {
  percentage: number;
  color: string;
  height?: string;
}) => (
  <div
    className="w-full bg-figma-dark rounded-full overflow-hidden"
    style={{ height }}
  >
    <div
      className="h-full transition-all duration-1000 ease-out"
      style={{
        width: `${percentage}%`,
        backgroundColor: color,
      }}
    />
  </div>
);

// Rating Progress Component
const RatingProgress = ({
  current,
  max,
  rank,
}: {
  current: number;
  max: number;
  rank: string;
}) => {
  const percentage = max > 0 ? (current / max) * 100 : 0;
  const color = getRatingColor(current);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-white font-poppins text-sm">Rating Progress</span>
        <span className="text-white/70 font-poppins text-sm">
          {current}/{max}
        </span>
      </div>
      <ProgressBar percentage={percentage} color={color} height="12px" />
      <div className="flex justify-between items-center">
        <span className="text-white/50 text-xs font-poppins capitalize">
          {rank}
        </span>
        <span className="text-white/50 text-xs font-poppins">
          {percentage.toFixed(1)}% to max
        </span>
      </div>
    </div>
  );
};

export default function CodeforcesStats() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    data: userInfo,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["codeforcesUser"],
    queryFn: fetchCodeforcesUserInfo,
    staleTime: 3600000, // 1 hour
    retry: 1,
    retryDelay: 1000,
  });

  const {
    data: submissions,
    isLoading: isSubmissionsLoading,
    error: submissionsError,
  } = useQuery({
    queryKey: ["codeforcesSubmissions"],
    queryFn: fetchCodeforcesSubmissions,
    staleTime: 3600000, // 1 hour
    retry: 1,
    retryDelay: 1000,
  });

  const isLoading = isUserLoading || isSubmissionsLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-figma-menu border-white/10">
          <CardContent className="p-6">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-white/10 rounded w-48"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-16 bg-white/10 rounded"></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const user = userInfo || mockUserInfo;
  const userSubmissions = submissions || mockSubmissions;

  // Calculate statistics
  const solvedProblems = userSubmissions.filter(
    (s) => s.verdict === "OK"
  ).length;
  const totalSubmissions = userSubmissions.length;
  const successRate =
    totalSubmissions > 0 ? (solvedProblems / totalSubmissions) * 100 : 0;

  // Language distribution
  const languageStats = userSubmissions.reduce((acc, submission) => {
    const lang = submission.programmingLanguage;
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topLanguages = Object.entries(languageStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      percentage: (count / totalSubmissions) * 100,
      count,
    }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-figma-menu border-white/10 overflow-hidden">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-figma-gradient rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-black" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white font-poppins">
                  Codeforces Stats
                </h3>
                <p className="text-white/70 font-poppins">
                  @{user.handle} • Competitive Programming
                </p>
              </div>
            </div>
            <Button
              asChild
              className="bg-figma-gradient hover:bg-figma-gradient/90 text-black"
            >
              <Link
                href={`https://codeforces.com/profile/${user.handle}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {/* Main Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-figma-dark rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-figma-purple" />
                <span className="text-white/70 text-sm font-poppins">
                  Current Rating
                </span>
              </div>
              <div
                className="text-2xl font-bold font-poppins"
                style={{ color: getRatingColor(user.rating) }}
              >
                {user.rating}
              </div>
              <div className="text-white/50 text-xs font-poppins capitalize">
                {user.rank}
              </div>
            </div>

            <div className="bg-figma-dark rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-figma-orange" />
                <span className="text-white/70 text-sm font-poppins">
                  Max Rating
                </span>
              </div>
              <div
                className="text-2xl font-bold font-poppins"
                style={{ color: getRatingColor(user.maxRating) }}
              >
                {user.maxRating}
              </div>
              <div className="text-white/50 text-xs font-poppins capitalize">
                {user.maxRank}
              </div>
            </div>

            <div className="bg-figma-dark rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-4 h-4 text-figma-purple" />
                <span className="text-white/70 text-sm font-poppins">
                  Solved
                </span>
              </div>
              <div className="text-2xl font-bold text-white font-poppins">
                {solvedProblems}
              </div>
              <div className="text-white/50 text-xs font-poppins">
                {successRate.toFixed(1)}% success
              </div>
            </div>

            <div className="bg-figma-dark rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-figma-orange" />
                <span className="text-white/70 text-sm font-poppins">
                  Contribution
                </span>
              </div>
              <div className="text-2xl font-bold text-white font-poppins">
                {user.contribution}
              </div>
              <div className="text-white/50 text-xs font-poppins">
                {user.friendOfCount} friends
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress & Languages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rating Progress */}
        <Card className="bg-figma-menu border-white/10">
          <CardHeader>
            <CardTitle className="text-white font-poppins flex items-center gap-2">
              <Target className="w-5 h-5 text-figma-purple" />
              Rating Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <RatingProgress
              current={user.rating}
              max={user.maxRating}
              rank={user.rank}
            />

            {/* Achievement Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-figma-dark rounded-lg p-4 text-center">
                <div
                  className="text-xl font-bold font-poppins mb-1"
                  style={{ color: getRatingColor(user.maxRating) }}
                >
                  {user.maxRating}
                </div>
                <div className="text-white/70 text-sm font-poppins">
                  Best Rating
                </div>
              </div>
              <div className="bg-figma-dark rounded-lg p-4 text-center">
                <div className="text-xl font-bold text-white font-poppins mb-1">
                  {Math.floor(
                    (Date.now() / 1000 - user.registrationTimeSeconds) /
                      (365 * 24 * 3600)
                  )}
                  y
                </div>
                <div className="text-white/70 text-sm font-poppins">
                  On Platform
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Language Statistics */}
        <Card className="bg-figma-menu border-white/10">
          <CardHeader>
            <CardTitle className="text-white font-poppins flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-figma-orange" />
              Language Usage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topLanguages.map((lang, index) => {
              const colors = [
                "#7a87fb",
                "#ffd49c",
                "#34d399",
                "#f87171",
                "#a78bfa",
              ];
              const color = colors[index] || "#6b7280";

              return (
                <div key={lang.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-white font-poppins">
                        {lang.name}
                      </span>
                    </div>
                    <div className="text-white/70 text-sm font-poppins">
                      {lang.count} ({lang.percentage.toFixed(1)}%)
                    </div>
                  </div>
                  <ProgressBar percentage={lang.percentage} color={color} />
                </div>
              );
            })}

            {/* Summary */}
            <div className="mt-6 p-4 bg-figma-dark rounded-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-white font-poppins">
                  {totalSubmissions}
                </div>
                <div className="text-white/70 text-sm font-poppins">
                  Total Submissions
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
