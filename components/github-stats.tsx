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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { GitHubUser, GitHubRepo, GitHubStats } from "@/types/github";

interface GithubStatsProps {
  detailed?: boolean;
}

// Mock GitHub user data
const mockGithubUser: GitHubUser = {
  login: "yashs33244",
  id: 12345678,
  node_id: "MDQ6VXNlcjEyMzQ1Njc4",
  avatar_url: "https://avatars.githubusercontent.com/u/12345678",
  gravatar_id: "",
  url: "https://api.github.com/users/yashs33244",
  html_url: "https://github.com/yashs33244",
  followers_url: "https://api.github.com/users/yashs33244/followers",
  following_url:
    "https://api.github.com/users/yashs33244/following{/other_user}",
  gists_url: "https://api.github.com/users/yashs33244/gists{/gist_id}",
  starred_url: "https://api.github.com/users/yashs33244/starred{/owner}{/repo}",
  subscriptions_url: "https://api.github.com/users/yashs33244/subscriptions",
  organizations_url: "https://api.github.com/users/yashs33244/orgs",
  repos_url: "https://api.github.com/users/yashs33244/repos",
  events_url: "https://api.github.com/users/yashs33244/events{/privacy}",
  received_events_url:
    "https://api.github.com/users/yashs33244/received_events",
  type: "User",
  site_admin: false,
  name: "Yash Singh",
  company: null,
  blog: "",
  location: "India",
  email: null,
  hireable: null,
  bio: "Fullstack Developer and Software Engineer",
  twitter_username: null,
  public_repos: 28,
  public_gists: 5,
  followers: 78,
  following: 45,
  created_at: "2018-07-15T12:34:56Z",
  updated_at: "2023-01-15T12:34:56Z",
};

// Mock language stats
const mockLanguageStats = {
  topLanguages: [
    { name: "JavaScript", percentage: 38, color: "#f1e05a" },
    { name: "TypeScript", percentage: 25, color: "#2b7489" },
    { name: "Python", percentage: 20, color: "#3572A5" },
    { name: "C++", percentage: 10, color: "#f34b7d" },
    { name: "HTML", percentage: 7, color: "#e34c26" },
  ],
  totalStars: 112,
  totalForks: 45,
};

async function fetchGitHubUser(): Promise<GitHubUser> {
  try {
    const response = await fetch("https://api.github.com/user", {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${
          process.env.NEXT_PUBLIC_GITHUB_TOKEN ||
          "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"
        }`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!response.ok) {
      console.warn("GitHub API request failed, using mock data");
      return mockGithubUser;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return mockGithubUser;
  }
}

async function fetchLanguageStats(repos_url: string): Promise<{
  topLanguages: { name: string; percentage: number; color: string }[];
  totalStars: number;
  totalForks: number;
}> {
  try {
    const reposResponse = await fetch(repos_url, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${
          process.env.NEXT_PUBLIC_GITHUB_TOKEN ||
          "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"
        }`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (!reposResponse.ok) {
      console.warn("GitHub repos API request failed, using mock data");
      return mockLanguageStats;
    }

    const repos: GitHubRepo[] = await reposResponse.json();

    // If we got an empty array, use mock data
    if (!repos || repos.length === 0) {
      console.warn("GitHub API returned empty repos, using mock data");
      return mockLanguageStats;
    }

    // Count languages
    const languageCounts: Record<string, number> = {};
    let totalCount = 0;

    // Language colors mapping
    const languageColors: Record<string, string> = {
      JavaScript: "#f1e05a",
      TypeScript: "#2b7489",
      Python: "#3572A5",
      "C++": "#f34b7d",
      HTML: "#e34c26",
      CSS: "#563d7c",
      Java: "#b07219",
      Go: "#00ADD8",
      Ruby: "#701516",
      Rust: "#dea584",
      PHP: "#4F5D95",
    };

    // Calculate stars and forks
    let totalStars = 0;
    let totalForks = 0;

    repos.forEach((repo) => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;

      const language = repo.language;
      if (language) {
        languageCounts[language] = (languageCounts[language] || 0) + 1;
        totalCount++;
      }
    });

    // If no languages found, use mock data
    if (totalCount === 0) {
      console.warn("No languages found in GitHub repos, using mock data");
      return mockLanguageStats;
    }

    // Convert to percentage and format
    const topLanguages = Object.entries(languageCounts)
      .map(([name, count]) => {
        const percentage = Math.round((count / totalCount) * 100);
        return {
          name,
          percentage,
          color: languageColors[name] || "#333333", // Fallback color
        };
      })
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 5); // Get top 5 languages

    return { topLanguages, totalStars, totalForks };
  } catch (error) {
    console.error("Error fetching language stats:", error);
    return mockLanguageStats;
  }
}

export default function GithubStats({ detailed = false }: GithubStatsProps) {
  // Fetch GitHub user data
  const {
    data: githubUser,
    isLoading: isUserLoading,
    error: userError,
  } = useQuery({
    queryKey: ["githubUser"],
    queryFn: fetchGitHubUser,
    staleTime: 3600000, // 1 hour
    retry: 1,
    retryDelay: 1000,
  });

  // Fetch language stats once we have the user data
  const {
    data: languageData,
    isLoading: isLangLoading,
    error: langError,
  } = useQuery({
    queryKey: ["githubLanguages"],
    queryFn: () =>
      githubUser
        ? fetchLanguageStats(githubUser.repos_url)
        : Promise.resolve(mockLanguageStats),
    enabled: !!githubUser?.repos_url,
    staleTime: 3600000, // 1 hour
    retry: 1,
    retryDelay: 1000,
  });

  const isLoading = isUserLoading || isLangLoading;
  const hasError = userError || langError;

  // Loading state
  if (isLoading) {
    return (
      <section className={`py-12 ${!detailed && "border-t"}`}>
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-blueviolet">
            GitHub Stats
          </h2>
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state - fallback to mock data
  if (hasError) {
    console.error("Error loading GitHub data:", userError || langError);
  }

  // Use the data or fallback to mock data if something went wrong
  const user = githubUser || mockGithubUser;
  const languages = languageData || mockLanguageStats;

  // Combine data into our stats format
  const stats = {
    name: user.name || user.login,
    followers: user.followers,
    following: user.following,
    public_repos: user.public_repos,
    created_at: user.created_at,
    avatar_url: user.avatar_url,
    bio: user.bio || "Fullstack Developer and Software Engineer",
    location: user.location || "India",
    html_url: user.html_url,
    topLanguages: languages.topLanguages,
    totalStars: languages.totalStars,
    totalForks: languages.totalForks,
  };

  // Format time on GitHub
  const accountCreated = new Date(stats.created_at);
  const yearsOnGitHub = new Date().getFullYear() - accountCreated.getFullYear();

  return (
    <section className={`py-12 ${!detailed && "border-t"}`}>
      <div className="container">
        <h2 className="text-3xl font-bold mb-8 text-blueviolet">
          GitHub Stats
        </h2>

        {/* GitHub overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="rounded-lg border p-6">
            <h3 className="text-xl font-semibold mb-4">Profile Overview</h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <Users className="text-blueviolet" />
                <span>
                  <strong>{stats.followers}</strong> followers ·{" "}
                  <strong>{stats.following}</strong> following
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Code className="text-blueviolet" />
                <span>
                  <strong>{stats.public_repos}</strong> public repositories
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Star className="text-amber" />
                <span>
                  <strong>{stats.totalStars}</strong> total stars on
                  repositories
                </span>
              </div>

              <div className="flex items-center gap-3">
                <GitFork className="text-orange" />
                <span>
                  <strong>{stats.totalForks}</strong> total forks on
                  repositories
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="text-blueviolet" />
                <span>
                  <strong>{yearsOnGitHub}</strong> years on GitHub
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Button asChild variant="outline" size="sm">
                <Link
                  href={stats.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View GitHub Profile
                </Link>
              </Button>
            </div>
          </div>

          {/* Top Languages */}
          <div className="rounded-lg border p-6">
            <h3 className="text-xl font-semibold mb-4">Top Languages</h3>

            <div className="space-y-4">
              {stats.topLanguages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-muted-foreground">
                      {lang.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full"
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color,
                      }}
                      aria-label={`${lang.name} ${lang.percentage}%`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {detailed && (
          <>
            {/* Additional stats can be shown when detailed=true */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* More stats would go here */}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
