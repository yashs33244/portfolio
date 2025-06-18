"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  Clock,
  Code,
  GitBranch,
  GitFork,
  Star,
  Users,
  TrendingUp,
  Activity,
  ArrowRight,
  GitCommit,
  BookOpen,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  GitHubUser,
  GitHubRepo,
  GitHubLanguageStats,
} from "@/lib/platform-api";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

interface GitHubStatsProps {
  detailed?: boolean;
}

// Custom tooltip component for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-figma-menu border border-white/20 rounded-lg p-3 shadow-lg">
        <p className="text-white font-medium">{`${label}: ${payload[0].value.toLocaleString()}`}</p>
      </div>
    );
  }
  return null;
};

// Language distribution chart
function LanguageChart({
  languageStats,
}: {
  languageStats: GitHubLanguageStats;
}) {
  const languages = Object.entries(languageStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([name, bytes]) => ({
      name,
      value: bytes,
      percentage: (
        (bytes / Object.values(languageStats).reduce((a, b) => a + b, 0)) *
        100
      ).toFixed(1),
    }));

  const colors = [
    "#7a87fb",
    "#ffd49c",
    "#ff6b6b",
    "#4ecdc4",
    "#45b7d1",
    "#96ceb4",
    "#feca57",
    "#ff9ff3",
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-2">
        {languages.map((lang, index) => (
          <div key={lang.name} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-white/70 text-sm">{lang.name}</span>
            <span className="text-white/50 text-xs ml-auto">
              {lang.percentage}%
            </span>
          </div>
        ))}
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={languages}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {languages.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip content={CustomTooltip} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Repository stats chart
function RepoChart({ repos }: { repos: GitHubRepo[] }) {
  const repoData = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((repo) => ({
      name:
        repo.name.length > 12 ? `${repo.name.substring(0, 12)}...` : repo.name,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    }));

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={repoData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis
            dataKey="name"
            stroke="rgba(255,255,255,0.6)"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis stroke="rgba(255,255,255,0.6)" fontSize={12} />
          <Tooltip content={CustomTooltip} />
          <Bar dataKey="stars" fill="#7a87fb" name="Stars" />
          <Bar dataKey="forks" fill="#ffd49c" name="Forks" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Activity timeline component
function ActivityTimeline({ repos }: { repos: GitHubRepo[] }) {
  const activityData = repos
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .slice(0, 10)
    .map((repo) => ({
      name:
        repo.name.length > 15 ? `${repo.name.substring(0, 15)}...` : repo.name,
      updated: new Date(repo.updated_at).toLocaleDateString(),
      daysSince: Math.floor(
        (Date.now() - new Date(repo.updated_at).getTime()) /
          (1000 * 60 * 60 * 24)
      ),
    }));

  return (
    <div className="space-y-3">
      {activityData.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 bg-figma-dark rounded-lg border border-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-figma-gradient rounded-full" />
            <div>
              <p className="text-white font-medium text-sm">{item.name}</p>
              <p className="text-white/60 text-xs">Updated {item.updated}</p>
            </div>
          </div>
          <Badge
            variant="outline"
            className="border-white/20 text-white/70 text-xs"
          >
            {item.daysSince}d ago
          </Badge>
        </div>
      ))}
    </div>
  );
}

// Dynamic import for calendar heatmap to avoid SSR issues
const CalendarHeatmap = dynamic(() => import("react-calendar-heatmap"), {
  ssr: false,
  loading: () => <div className="animate-pulse bg-white/10 h-32 rounded"></div>,
});

export default function GitHubStats({ detailed = false }: GitHubStatsProps) {
  const [githubService, setGithubService] = useState<any>(null);

  useEffect(() => {
    import("../lib/platform-api").then((module) => {
      setGithubService(new module.GitHubAPIService());
    });
  }, []);

  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["github-user"],
    queryFn: () => githubService?.getUser(),
    enabled: !!githubService,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });

  const { data: repos, isLoading: reposLoading } = useQuery({
    queryKey: ["github-repos"],
    queryFn: () => githubService?.getRepos(),
    enabled: !!githubService,
    staleTime: 1000 * 60 * 15,
  });

  const { data: languageStats, isLoading: languagesLoading } = useQuery({
    queryKey: ["github-languages"],
    queryFn: () => githubService?.getLanguageStats(),
    enabled: !!githubService,
    staleTime: 1000 * 60 * 30, // 30 minutes due to rate limiting
    retry: 1, // Reduce retries for rate limited endpoints
  });

  const { data: contributionData, isLoading: contributionsLoading } = useQuery({
    queryKey: ["github-contributions"],
    queryFn: () => githubService?.getContributionCalendar(),
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
  });

  if (userLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 bg-white/10" />
          ))}
        </div>
        {detailed && (
          <>
            <Skeleton className="h-64 bg-white/10" />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Skeleton className="h-64 bg-white/10" />
              <Skeleton className="h-64 bg-white/10" />
            </div>
          </>
        )}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Github className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          GitHub Data Unavailable
        </h3>
        <p className="text-white/60">
          Unable to fetch GitHub statistics. Please check the connection or try
          again later.
        </p>
      </div>
    );
  }

  // Calculate additional metrics
  const totalStars =
    repos?.reduce(
      (sum: number, repo: GitHubRepo) => sum + repo.stargazers_count,
      0
    ) || 0;
  const totalForks =
    repos?.reduce(
      (sum: number, repo: GitHubRepo) => sum + repo.forks_count,
      0
    ) || 0;
  const recentRepos =
    repos?.filter((repo: GitHubRepo) => {
      const updatedDate = new Date(repo.updated_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return updatedDate > thirtyDaysAgo;
    }).length || 0;

  const accountAge = user.created_at
    ? Math.floor(
        (Date.now() - new Date(user.created_at).getTime()) /
          (1000 * 60 * 60 * 24 * 365)
      )
    : 0;

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

  // Prepare repository data for charts
  const repoData =
    repos?.slice(0, 10).map((repo: any) => ({
      name:
        repo.name.length > 15 ? repo.name.substring(0, 15) + "..." : repo.name,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
    })) || [];

  // Prepare language data for pie chart
  const languageData = Object.entries(languageStats || {})
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 6)
    .map(([name, bytes], index) => ({
      name,
      value: bytes as number,
      percentage: Math.round(
        ((bytes as number) /
          Object.values(languageStats || {}).reduce(
            (acc: number, val: any) => acc + (val as number),
            0
          )) *
          100
      ),
      fill: COLORS[index % COLORS.length],
    }));

  // Prepare contribution data for heatmap
  const currentYear = new Date().getFullYear();
  const startDate = new Date(currentYear, 0, 1);
  const endDate = new Date(currentYear, 11, 31);

  const averageStars = repos?.length
    ? Math.round(totalStars / repos.length)
    : 0;

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-figma-dark border border-white/10 rounded-lg p-6 text-center hover:border-blue-500/30 transition-all duration-300">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {user.public_repos}
          </div>
          <div className="text-white/70 text-sm">Public Repositories</div>
        </div>

        <div className="bg-figma-dark border border-white/10 rounded-lg p-6 text-center hover:border-yellow-500/30 transition-all duration-300">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">{totalStars}</div>
          <div className="text-white/70 text-sm">Total Stars</div>
        </div>

        <div className="bg-figma-dark border border-white/10 rounded-lg p-6 text-center hover:border-green-500/30 transition-all duration-300">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {user.followers}
          </div>
          <div className="text-white/70 text-sm">Followers</div>
        </div>

        <div className="bg-figma-dark border border-white/10 rounded-lg p-6 text-center hover:border-purple-500/30 transition-all duration-300">
          <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            {accountAge}+
          </div>
          <div className="text-white/70 text-sm">Years on GitHub</div>
        </div>
      </div>

      {detailed && (
        <>
          {/* Repository Statistics Chart */}
          {!reposLoading && repos && repos.length > 0 && (
            <div className="bg-figma-dark border border-white/10 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-figma-purple" />
                Top Repositories by Stars & Forks
              </h4>
              <RepoChart repos={repos} />
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Language Distribution */}
            {!languagesLoading &&
              languageStats &&
              Object.keys(languageStats).length > 0 && (
                <div className="bg-figma-dark border border-white/10 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <Code className="w-5 h-5 text-figma-purple" />
                    Language Distribution
                  </h4>
                  <LanguageChart languageStats={languageStats} />
                </div>
              )}

            {/* Recent Activity */}
            {!reposLoading && repos && repos.length > 0 && (
              <div className="bg-figma-dark border border-white/10 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-figma-purple" />
                  Recent Repository Activity
                </h4>
                <ActivityTimeline repos={repos} />
              </div>
            )}
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-figma-dark border border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <GitFork className="w-5 h-5 text-figma-purple" />
                <h4 className="text-lg font-semibold text-white">
                  Total Forks
                </h4>
              </div>
              <div className="text-2xl font-bold text-white">{totalForks}</div>
              <p className="text-white/60 text-sm mt-2">
                Across all repositories
              </p>
            </div>

            <div className="bg-figma-dark border border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <GitCommit className="w-5 h-5 text-figma-purple" />
                <h4 className="text-lg font-semibold text-white">
                  Recent Activity
                </h4>
              </div>
              <div className="text-2xl font-bold text-white">{recentRepos}</div>
              <p className="text-white/60 text-sm mt-2">
                Repositories updated in last 30 days
              </p>
            </div>

            <div className="bg-figma-dark border border-white/10 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-figma-purple" />
                <h4 className="text-lg font-semibold text-white">Following</h4>
              </div>
              <div className="text-2xl font-bold text-white">
                {user.following}
              </div>
              <p className="text-white/60 text-sm mt-2">Developers I follow</p>
            </div>
          </div>

          {/* Profile Information */}
          <div className="bg-figma-dark border border-white/10 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
              <Github className="w-5 h-5 text-figma-purple" />
              Profile Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {user.name && (
                  <div className="flex justify-between items-center p-4 bg-figma-menu rounded-lg border border-white/10">
                    <span className="text-white font-medium">Name</span>
                    <span className="text-white/70">{user.name}</span>
                  </div>
                )}
                {user.location && (
                  <div className="flex justify-between items-center p-4 bg-figma-menu rounded-lg border border-white/10">
                    <span className="text-white font-medium">Location</span>
                    <span className="text-white/70">{user.location}</span>
                  </div>
                )}
                {user.company && (
                  <div className="flex justify-between items-center p-4 bg-figma-menu rounded-lg border border-white/10">
                    <span className="text-white font-medium">Company</span>
                    <span className="text-white/70">{user.company}</span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-figma-menu rounded-lg border border-white/10">
                  <span className="text-white font-medium">Username</span>
                  <span className="text-white/70">@{user.login}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-figma-menu rounded-lg border border-white/10">
                  <span className="text-white font-medium">Joined GitHub</span>
                  <span className="text-white/70">
                    {new Date(user.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                {user.bio && (
                  <div className="p-4 bg-figma-menu rounded-lg border border-white/10">
                    <span className="text-white font-medium block mb-2">
                      Bio
                    </span>
                    <span className="text-white/70 text-sm">{user.bio}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Loading states for detailed view */}
      {detailed && (reposLoading || languagesLoading) && (
        <div className="space-y-6">
          <Skeleton className="h-64 bg-white/10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton className="h-64 bg-white/10" />
            <Skeleton className="h-64 bg-white/10" />
          </div>
        </div>
      )}

      {/* GitHub Contribution Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8"
      >
        <Card className="bg-background/50 backdrop-blur-sm border-white/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-medium bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
              Contribution Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            {contributionData ? (
              <div className="h-32 w-full">
                <CalendarHeatmap
                  startDate={
                    new Date(
                      new Date().getFullYear() - 1,
                      new Date().getMonth(),
                      new Date().getDate()
                    )
                  }
                  endDate={new Date()}
                  values={contributionData}
                  classForValue={(value) => {
                    if (!value || value.count === 0) return "color-empty";
                    if (value.count < 3) return "color-scale-1";
                    if (value.count < 6) return "color-scale-2";
                    if (value.count < 9) return "color-scale-3";
                    return "color-scale-4";
                  }}
                  showWeekdayLabels
                  onClick={(value) => {
                    if (value) {
                      console.log(
                        `Contributions on ${value.date}: ${value.count}`
                      );
                    }
                  }}
                />
              </div>
            ) : (
              <div className="h-32 flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">
                  Loading contribution data...
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity Timeline */}
      <Card className="bg-figma-menu border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{totalStars}</div>
              <div className="text-white/70 text-sm">Total Stars</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <GitBranch className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{totalForks}</div>
              <div className="text-white/70 text-sm">Total Forks</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-center">
              <Users className="w-8 h-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">
                {averageStars}
              </div>
              <div className="text-white/70 text-sm">Avg Stars/Repo</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
