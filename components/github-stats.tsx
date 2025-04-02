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
import { Octokit } from "@octokit/core";

interface GithubStatsProps {
  detailed?: boolean;
}

// Mock GitHub user data for yashs33244
const mockGithubUser: GitHubUser = {
  login: "yashs33244",
  id: 12345678,
  node_id: "MDQ6VXNlcjEyMzQ1Njc4",
  avatar_url: "https://avatars.githubusercontent.com/u/yashs33244",
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
  company: "@EpicGames",
  blog: "",
  location: "India",
  email: null,
  hireable: null,
  bio: "A Passionate Fullstack Developer and Data Science Enthusiast from India",
  twitter_username: "yashs3324",
  public_repos: 82,
  public_gists: 17,
  followers: 1,
  following: 3,
  created_at: "2023-01-15T12:34:56Z",
  updated_at: "2023-01-15T12:34:56Z",
};

// Mock language stats
const mockLanguageStats = {
  topLanguages: [
    { name: "TypeScript", percentage: 45, color: "#2b7489" },
    { name: "JavaScript", percentage: 25, color: "#f1e05a" },
    { name: "Python", percentage: 15, color: "#3572A5" },
    { name: "HTML", percentage: 10, color: "#e34c26" },
    { name: "Jupyter Notebook", percentage: 5, color: "#DA5B0B" },
  ],
  totalStars: 6,
  totalForks: 1,
};

// Create an Octokit instance
const createOctokit = () => {
  // For now, we're using an unauthenticated client due to token issues
  // When you have a valid token, uncomment and use this code:
  // const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
  // if (token) {
  //   console.log("Using authenticated GitHub API");
  //   return new Octokit({ auth: token });
  // }

  console.log("Using unauthenticated GitHub API - rate limits will be lower");
  return new Octokit();
};

// The GitHub username to fetch data for
const GITHUB_USERNAME = "yashs33244";

// For now, just return mock data without API calls
async function fetchGitHubUser(): Promise<GitHubUser> {
  console.log("Using mock GitHub user data");
  return mockGithubUser;
}

async function fetchLanguageStats(username: string): Promise<{
  topLanguages: { name: string; percentage: number; color: string }[];
  totalStars: number;
  totalForks: number;
}> {
  console.log("Using mock language stats");
  return mockLanguageStats;
}

export default function GithubStats({ detailed = false }: GithubStatsProps) {
  // Fetch GitHub user data with React Query
  const userQuery = useQuery({
    queryKey: ["githubUser", GITHUB_USERNAME],
    queryFn: fetchGitHubUser,
    staleTime: 60000, // 1 minute
    retry: 1,
  });

  // Fetch language stats with React Query
  const languageQuery = useQuery({
    queryKey: ["githubLanguages", GITHUB_USERNAME],
    queryFn: () => fetchLanguageStats(GITHUB_USERNAME),
    staleTime: 60000, // 1 minute
    retry: 1,
  });

  // Extract data and loading states
  const githubUser = userQuery.data;
  const languageData = languageQuery.data;
  const isLoading = userQuery.isPending || languageQuery.isPending;
  const hasError = userQuery.isError || languageQuery.isError;

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
    console.error(
      "Error loading GitHub data:",
      userQuery.error || languageQuery.error
    );
  }

  // Use the data or fallback to mock data if something went wrong
  const user = githubUser || mockGithubUser;
  const languages = languageData || mockLanguageStats;

  // Log what data we're using
  console.log(
    "Using user data:",
    user.login === mockGithubUser.login ? "MOCK" : "REAL",
    user
  );
  console.log(
    "Using language data:",
    languages === mockLanguageStats ? "MOCK" : "REAL",
    languages
  );

  // Default compact view
  if (!detailed) {
    return (
      <section className="py-12 border-t border-border">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-blueviolet">
            GitHub Stats
            {user.login === mockGithubUser.login && (
              <span className="text-xs font-normal text-amber ml-2 align-top">
                (Mock data)
              </span>
            )}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-lg border p-6 bg-background">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Profile Overview</h3>
                <Button variant="ghost" size="sm" asChild>
                  <Link
                    href={user.html_url}
                    target="_blank"
                    className="text-muted-foreground"
                  >
                    @{user.login}
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange" />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-foreground">
                      {user.followers}
                    </strong>{" "}
                    Followers
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-amber" />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-foreground">
                      {user.public_repos}
                    </strong>{" "}
                    Repos
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-rose" />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-foreground">
                      {languages.totalStars}
                    </strong>{" "}
                    Stars
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <GitFork className="h-5 w-5 text-blueviolet" />
                  <span className="text-sm text-muted-foreground">
                    <strong className="text-foreground">
                      {languages.totalForks}
                    </strong>{" "}
                    Forks
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border p-6 bg-background">
              <h3 className="text-xl font-semibold mb-4">Top Languages</h3>

              <div className="space-y-4">
                {languages.topLanguages.map((lang) => (
                  <div key={lang.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{lang.name}</span>
                      <span className="text-sm text-muted-foreground">
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
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Detailed view for dedicated pages
  return (
    <div className="space-y-8">
      {user.login === mockGithubUser.login && (
        <div className="text-center py-2 bg-amber/10 rounded-lg border border-amber/30">
          <p className="text-sm text-amber-700">
            <span className="font-medium">⚠️ Using mock GitHub data</span> - API
            connection unavailable. The data shown is placeholder data.
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="rounded-lg border p-6 bg-background">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-xl font-bold">{user.name || user.login}</h3>
                <Button
                  variant="link"
                  className="p-0 h-auto text-blueviolet"
                  asChild
                >
                  <Link href={user.html_url} target="_blank">
                    @{user.login}
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Followers</p>
                <p className="font-medium">{user.followers}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Following</p>
                <p className="font-medium">{user.following}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Code className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Repositories</p>
                <p className="font-medium">{user.public_repos}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Joined</p>
                <p className="font-medium">
                  {new Date(user.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
                </p>
              </div>
            </div>
          </div>

          {user.bio && (
            <div className="mt-6 pt-6 border-t">
              <h4 className="text-sm font-medium text-muted-foreground mb-2">
                Bio
              </h4>
              <p className="text-sm">{user.bio}</p>
            </div>
          )}
        </div>

        <div className="rounded-lg border p-6 bg-background">
          <h3 className="text-xl font-semibold mb-6">Language Distribution</h3>

          <div className="space-y-6">
            {languages.topLanguages.map((lang) => (
              <div key={lang.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {lang.percentage}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: `${lang.percentage}%`,
                      backgroundColor: lang.color,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t">
            <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
              <Star className="h-6 w-6 mb-2 text-amber" />
              <span className="text-2xl font-bold">{languages.totalStars}</span>
              <span className="text-sm text-muted-foreground">Total Stars</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-lg bg-muted/50">
              <GitFork className="h-6 w-6 mb-2 text-rose" />
              <span className="text-2xl font-bold">{languages.totalForks}</span>
              <span className="text-sm text-muted-foreground">Total Forks</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          asChild
          variant="outline"
          className="border-orange text-orange hover:bg-orange hover:text-white"
        >
          <Link href={user.html_url} target="_blank">
            View Full GitHub Profile
          </Link>
        </Button>
      </div>
    </div>
  );
}
