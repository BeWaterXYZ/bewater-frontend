import { Languages } from "@/i18n";

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
  status: "DRAFT" | "INREVIEW" | "ACTIVE" | "COMPLETED" | "CANCELED" | "PAUSED";
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
  wechatURL: string;
  telegramLink: string;
  discordLink: string;
  twitterLink: string;

  awardAssorts?: {
    name: string;
    awards: {
      awardName: string;
      amount: number;
      count: number;
    }[];
  }[];
  keySponsors?: string[];
  sponsors: {
    defname: string;
    members: string[];
  }[];
  metadata: Record<Languages, MetaData>;
}

export interface MetaData {
  sections: {
    id: string;
    component: string;
    data: any;
  }[];
}

export interface Award {
  awardName: string;
  amount: number;
  count: number;
}

export interface Judge {
  id?: string;
  name: string;
  title: string;
  avatarURI: string;
  description: string;
  twitterLink: string;
}

export const defaultMileStones = [
  "Preparation",
  "Teaming",
  "Project Submission",
  "Review",
  "Result",
] as const;

export type DefaultMileStones = (typeof defaultMileStones)[number];

export interface Milestone {
  dueDate: string;
  stageName: DefaultMileStones | string;
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