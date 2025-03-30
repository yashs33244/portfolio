export interface LeetCodeStats {
  totalSolved: number;
  totalQuestions: number;
  easySolved: number;
  totalEasy: number;
  mediumSolved: number;
  totalMedium: number;
  hardSolved: number;
  totalHard: number;
  acceptanceRate: number;
  ranking: number;
  contributionPoints?: number;
  reputation?: number;
  submissionCalendar?: string; // JSON string of date -> count mappings
}

export interface LeetCodeCalendarEntry {
  date: string; // ISO format date string
  count: number;
}

export interface LeetCodeProblemCounts {
  total: number;
  solved: number;
  percentage: number;
}

export interface LeetCodeProblemDifficulty {
  easy: LeetCodeProblemCounts;
  medium: LeetCodeProblemCounts;
  hard: LeetCodeProblemCounts;
}

export interface LeetCodeUserProfile {
  username: string;
  realName: string | null;
  about: string | null;
  skills: string[];
  ranking: number;
  reputation: number;
  starRating: number;
  location: string | null;
  websites: string[];
  company: string | null;
  school: string | null;
  avatarUrl: string | null;
  joinDate: string;
  lastActive: string;
  githubUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
}

export interface LeetCodeContestInfo {
  attendedContests: number;
  totalParticipants: number;
  topPercentage: number;
  rating: number;
  globalRanking: number;
  badges: {
    name: string;
    icon: string;
  }[];
} 