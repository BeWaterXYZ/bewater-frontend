/**
 *  Challenge
 */
export type ChallengeID = string;
export interface Challenge {
  id: ChallengeID;
  title: string;
  hostName: string;
  hostIcon: string;
  city?: string;
  description: string;
  bannerUrl: string;
  requirements: string;
  reviewDimension: string;
  startTime: string;
  endTime: string;
  totalAward: number;
  awardCurrency: string;
  status: "DRAFT" | "ACTIVE" | "COMPLETED" | "CANCELED" | "PAUSED";
  location: string;
  judgeIDs: string[];
  userIDs: string[];
  awards: Award[];
  milestones: Milestone[];
  judges: Judge[];
  sponsorships: Sponsorship[];
  socialLinks: {
    twitterURI?: string;
    discordURI?: string;
    officialWebsiteURI?: string;
    email?: string;
  };
  awardAssorts?: {
    name: string;
    awards: {
      awardName: string;
      amount: number;
      count: number;
    }[];
  }[];
  keySponsors?: string[];
}

export interface Award {
  awardName: string;
  amount: number;
  count: number;
}

export interface Judge {
  id: string;
  name: string;
  title: string;
  organization: string;
  avatarURI: string;
  challengeIDs: number[];
  order: number;
}

export interface Milestone {
  dueDate: string;
  stageName:
    | "Preparation"
    | "Teaming"
    | "Project Submission"
    | "Review"
    | "Result"
    | string;
}

export interface Sponsorship {
  id: number;
  amount: number;
  currency: string;
  challengeId: number;
  sponsorId: string;
  sponsor: Sponsor;
}

export interface Sponsor {
  id: string;
  sponsorName: string;
  logoURI: string;
}
