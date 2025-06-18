// Platform API services for GitHub, LeetCode, and Codeforces
const GITHUB_USERNAME = 'yashs33244';
const LEETCODE_USERNAME = 'yashs33244';
const CODEFORCES_USERNAME = 'yashs33244';

// GitHub API Types
export interface GitHubUser {
  login: string;
  name: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  company: string | null;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  html_url: string;
  fork: boolean;
  size: number;
}

export interface GitHubContribution {
  date: string;
  contributionCount: number;
}

export interface GitHubLanguageStats {
  [language: string]: number;
}

// LeetCode API Types
export interface LeetCodeUser {
  username: string;
  realName?: string;
  ranking: number;
  submissionCount: number;
  acceptedCount: number;
  acSubmissionNum: Array<{
    difficulty: string;
    count: number;
  }>;
  streak: number;
  totalSolved: number;
}

export interface LeetCodeSubmission {
  timestamp: number;
  statusDisplay: string;
  title: string;
  difficulty: string;
}

// Codeforces API Types
export interface CodeforcesUser {
  handle: string;
  rating?: number;
  maxRating?: number;
  rank?: string;
  maxRank?: string;
  titlePhoto?: string;
  avatar?: string;
  firstName?: string;
  lastName?: string;
  country?: string;
  city?: string;
  organization?: string;
  contribution: number;
  lastOnlineTimeSeconds: number;
  registrationTimeSeconds: number;
}

export interface CodeforcesSubmission {
  id: number;
  contestId?: number;
  creationTimeSeconds: number;
  relativeTimeSeconds: number;
  problem: {
    contestId?: number;
    index: string;
    name: string;
    type: string;
    rating?: number;
    tags: string[];
  };
  author: {
    contestId?: number;
    members: Array<{
      handle: string;
    }>;
  };
  programmingLanguage: string;
  verdict?: string;
  testset: string;
  passedTestCount: number;
  timeConsumedMillis: number;
  memoryConsumedBytes: number;
}

export interface CodeforcesContest {
  id: number;
  contestId: number;
  contestName: string;
  handle: string;
  rank: number;
  ratingUpdateTimeSeconds: number;
  oldRating: number;
  newRating: number;
}

interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  payload?: {
    commits?: any[];
  };
}

// GitHub API Service - Updated to use internal API routes
export class GitHubAPIService {
  private baseURL = '/api/github';

  async getUser(): Promise<GitHubUser> {
    try {
      const response = await fetch(`${this.baseURL}?endpoint=user`);
      const data = await response.json();
      
      // Check if we got fallback data (API route handles errors gracefully)
      if (!response.ok && !data.login) {
        throw new Error(`Failed to fetch GitHub user: ${response.status}`);
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching GitHub user:', error);
      // Return fallback data instead of throwing
      return {
        login: 'yashs33244',
        name: 'Yash Singh',
        public_repos: 0,
        followers: 0,
        following: 0,
        created_at: new Date().toISOString(),
        avatar_url: 'https://github.com/yashs33244.png',
        bio: null,
        location: null,
        company: null
      };
    }
  }

  async getRepos(): Promise<GitHubRepo[]> {
    try {
      const response = await fetch(`${this.baseURL}?endpoint=repos`);
      const data = await response.json();
      
      // Check if we got fallback data (API route handles errors gracefully)
      if (!response.ok && !Array.isArray(data)) {
        console.warn('GitHub API returned error, using empty repos list');
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching GitHub repos:', error);
      // Return empty array instead of throwing
      return [];
    }
  }

  async getLanguageStats(): Promise<Record<string, number>> {
    try {
      const repos = await this.getRepos();
      const languageStats: Record<string, number> = {};
      
      // Limit to top 15 repos to avoid too many API calls
      const topRepos = repos
        .filter(repo => !repo.fork && repo.size > 0)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 15);

      // Process repos sequentially with delay to avoid rate limiting
      for (const repo of topRepos) {
        try {
          const response = await fetch(`${this.baseURL}?endpoint=languages&repo=${repo.name}`);
          if (response.ok) {
            const languages = await response.json();
            for (const [lang, bytes] of Object.entries(languages)) {
              languageStats[lang] = (languageStats[lang] || 0) + (bytes as number);
            }
          }
          // Add small delay between requests
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.warn(`Failed to fetch languages for ${repo.name}:`, error);
        }
      }

      return languageStats;
    } catch (error) {
      console.error('Error fetching language stats:', error);
      // Return basic language stats as fallback
      return {
        'TypeScript': 45000,
        'JavaScript': 35000,
        'Python': 25000,
        'Java': 20000,
        'CSS': 15000
      };
    }
  }

  async getCommitActivity(): Promise<GitHubEvent[]> {
    try {
      const response = await fetch(`${this.baseURL}?endpoint=events`);
      const data = await response.json();
      
      if (!response.ok && !Array.isArray(data)) {
        console.warn('GitHub API returned error for events, using empty array');
        return [];
      }
      
      return data;
    } catch (error) {
      console.error('Error fetching commit activity:', error);
      // Return empty array instead of throwing
      return [];
    }
  }

  async getContributionCalendar(): Promise<{ date: string; count: number }[]> {
    try {
      const events = await this.getCommitActivity();
      const contributionMap = new Map<string, number>();
      
      // Process events to create contribution calendar
      events.forEach(event => {
        if (event.type === 'PushEvent') {
          const date = event.created_at.split('T')[0];
          contributionMap.set(date, (contributionMap.get(date) || 0) + 1);
        }
      });
      
      // Generate calendar data for the last year
      const calendar: { date: string; count: number }[] = [];
      const today = new Date();
      const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
      
      for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        calendar.push({
          date: dateStr,
          count: contributionMap.get(dateStr) || 0
        });
      }
      
      return calendar;
    } catch (error) {
      console.error('Error fetching contribution calendar:', error);
      // Return empty calendar instead of throwing
      return [];
    }
  }
}

// LeetCode API Service - Updated to use internal API routes
export class LeetCodeAPIService {
  private baseURL = '/api/leetcode';

  async getUser(): Promise<LeetCodeUser | null> {
    try {
      const response = await fetch(`${this.baseURL}?endpoint=user`);
      if (!response.ok) throw new Error('Failed to fetch LeetCode data');
      
      const data = await response.json();
      
      if (!data.matchedUser) return null;

      const user = data.matchedUser;
      const acStats = user.submitStats.acSubmissionNum;
      
      // Calculate total solved correctly - sum of Easy + Medium + Hard (not All)
      const totalSolved = acStats
        .filter((stat: any) => stat.difficulty !== 'All')
        .reduce((acc: number, curr: any) => acc + curr.count, 0);
      
      return {
        username: user.username,
        realName: user.profile?.realName,
        ranking: user.profile?.ranking || 0,
        submissionCount: user.submitStats.totalSubmissionNum.reduce((acc: number, curr: any) => acc + curr.count, 0),
        acceptedCount: acStats.reduce((acc: number, curr: any) => acc + curr.count, 0),
        acSubmissionNum: acStats,
        streak: this.calculateStreak(user.userCalendar?.submissionCalendar || '{}'),
        totalSolved: totalSolved,
      };
    } catch (error) {
      console.error('Error fetching LeetCode user:', error);
      return null;
    }
  }

  private calculateStreak(submissionCalendar: string): number {
    try {
      const calendar = JSON.parse(submissionCalendar);
      const dates = Object.keys(calendar).sort((a, b) => parseInt(b) - parseInt(a));
      
      let streak = 0;
      const today = Math.floor(Date.now() / 1000);
      const oneDaySeconds = 24 * 60 * 60;

      for (let i = 0; i < dates.length; i++) {
        const dateTimestamp = parseInt(dates[i]);
        const daysDiff = Math.floor((today - dateTimestamp) / oneDaySeconds);
        
        if (daysDiff === i && calendar[dates[i]] > 0) {
          streak++;
        } else {
          break;
        }
      }

      return streak;
    } catch (error) {
      console.error('Error calculating streak:', error);
      return 0;
    }
  }

  async getSubmissionCalendar(): Promise<{ [date: string]: number }> {
    try {
      const response = await fetch(`${this.baseURL}?endpoint=calendar`);
      if (!response.ok) throw new Error('Failed to fetch submission calendar');
      
      const data = await response.json();
      
      if (!data.matchedUser?.userCalendar?.submissionCalendar) return {};

      return JSON.parse(data.matchedUser.userCalendar.submissionCalendar);
    } catch (error) {
      console.error('Error fetching submission calendar:', error);
      return {};
    }
  }
}

// Codeforces API Service - Updated to use internal API routes
export class CodeforcesAPIService {
  private baseURL = '/api/codeforces';

  async getUser(): Promise<CodeforcesUser | null> {
    try {
      const response = await fetch(`${this.baseURL}?endpoint=user`);
      if (!response.ok) throw new Error('Failed to fetch Codeforces user');
      
      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) return null;
      
      return data[0];
    } catch (error) {
      console.error('Error fetching Codeforces user:', error);
      return null;
    }
  }

  async getSubmissions(count: number = 100): Promise<CodeforcesSubmission[]> {
    try {
      const response = await fetch(`${this.baseURL}?endpoint=submissions`);
      if (!response.ok) throw new Error('Failed to fetch Codeforces submissions');
      
      const data = await response.json();
      if (!Array.isArray(data)) return [];
      
      return data.slice(0, count);
    } catch (error) {
      console.error('Error fetching Codeforces submissions:', error);
      return [];
    }
  }

  async getRatingHistory(): Promise<CodeforcesContest[]> {
    try {
      const response = await fetch(`${this.baseURL}?endpoint=rating`);
      if (!response.ok) throw new Error('Failed to fetch rating history');
      
      const data = await response.json();
      if (!Array.isArray(data)) return [];
      
      return data;
    } catch (error) {
      console.error('Error fetching rating history:', error);
      return [];
    }
  }

  async getProblemStats(): Promise<{ [difficulty: string]: number }> {
    try {
      const submissions = await this.getSubmissions(1000);
      const solvedProblems = new Set<string>();
      const difficultyStats: { [difficulty: string]: number } = {};

      submissions.forEach(submission => {
        if (submission.verdict === 'OK') {
          const problemKey = `${submission.problem.contestId}-${submission.problem.index}`;
          if (!solvedProblems.has(problemKey)) {
            solvedProblems.add(problemKey);
            const rating = submission.problem.rating;
            if (rating) {
              const difficulty = this.getRatingCategory(rating);
              difficultyStats[difficulty] = (difficultyStats[difficulty] || 0) + 1;
            }
          }
        }
      });

      return difficultyStats;
    } catch (error) {
      console.error('Error fetching problem stats:', error);
      return {};
    }
  }

  private getRatingCategory(rating: number): string {
    if (rating < 1200) return 'Beginner';
    if (rating < 1600) return 'Intermediate';
    if (rating < 2000) return 'Advanced';
    if (rating < 2400) return 'Expert';
    return 'Master';
  }

  async getLanguageStats(): Promise<{ [language: string]: number }> {
    try {
      const submissions = await this.getSubmissions(1000);
      const languageStats: { [language: string]: number } = {};

      submissions.forEach(submission => {
        if (submission.verdict === 'OK') {
          const lang = submission.programmingLanguage;
          languageStats[lang] = (languageStats[lang] || 0) + 1;
        }
      });

      return languageStats;
    } catch (error) {
      console.error('Error fetching language stats:', error);
      return {};
    }
  }
}

// Export service instances
export const githubAPI = new GitHubAPIService();
export const leetcodeAPI = new LeetCodeAPIService();
export const codeforcesAPI = new CodeforcesAPIService(); 