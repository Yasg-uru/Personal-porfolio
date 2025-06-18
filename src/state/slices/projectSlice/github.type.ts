export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface Week {
  contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: Week[];
}

export interface ContributionsCollection {
  contributionCalendar: ContributionCalendar;
}

export interface User {
  contributionsCollection: ContributionsCollection;
}

export interface githubData {
  user: User;
}

