/**
 * User
 */
import { CAMPAIGN_TYPE } from "@/constants";
import { RoleUnion } from "@/constants/options/role";
import { SkillUnion } from "@/constants/options/skill";

export type UserID = string;

export interface UserProfile {
  id: UserID;
  email: string;
  walletAddress: string;
  userName?: string;
  avatarURI?: string;
  fullName?: string;
  firstName?: string;
  bio?: string;
  websiteLink?: string;
  telegramLink?: string;
  roles: RoleUnion[];
  skills: SkillUnion[];
  clerkId: string;
  githubLink?: string;
  discordLink?: string;
  twitterLink?: string;
  aspectaLink?: string;
  aboutMe?: string;
  externalNa?: string;
}

export interface SocialAuth {
  platform: "GitHub" | "Figma";
  authStatus: "AUTHORIZED";
  handle: string;
}

export interface UserProfileFull extends UserProfile {
  teamMembers: TeamMember[];
  socialAuths: SocialAuth[];
}

/**
 *  Challenge
 */
export type ChallengeID = string;
export interface Challenge {
  id: ChallengeID;
  externalId?: string;
  title: string;
  hostName: string;
  description: string;
  bannerUrl: string;
  requirements: string;
  reviewDimension: string;
  startTime: string;
  endTime: string;
  totalAward: number;
  awardCurrency: string;
  status:
    | "DRAFT"
    | "INREVIEW"
    | "ACTIVE"
    | "COMPLETED"
    | "CANCELED"
    | "PAUSED"
    | "REFUSED";
  location: string;
  milestones: Milestone[];
  scoreDimension: {
    text: string;
    locked?: boolean;
  }[];
  judges: Judge[];
  reviewers: Reviewer[];
  wechatURL?: string;
  telegramLink?: string;
  discordLink?: string;
  twitterLink?: string;

  sponsors: {
    defname: string;
    members?: (
      | string
      | {
          uri: string;
          href?: string;
        }
    )[];
    descriptions?: {
      name: string;
      org: string;
      uri: string;
    }[];
  }[];

  awardAssorts?: {
    name: string;
    awards: {
      awardName: string;
      amount: number;
      count: number;
      goodsName?: string;
      goodsCount?: number;
    }[];
  }[];
  keySponsors?: (
    | string
    | {
        uri: string;
        href?: string;
      }
  )[];
  city?: string;
  hostIcon?: string | null;
  type: CAMPAIGN_TYPE;
  metadata?: any;
  yotadata?: any;
  joinLink?: string;
  track?: string[];
  otherInfo?: {[key:string]: unknown};
  linkText?: string;
  result?: Array<ChallengeTrackResult>;
  agenda?: Array<AgendaDay>;
  future: {
    announceShortlist?: string;
    announceResult?: string;
  };
  shortlist?: Shortlist[];
  timeZone?: number;
}

export interface AgendaDay {
  label: string;
  time: string;
  locations: [
    {
      location?: string;
      sessions: [
        {
          time: string;
          topic: string;
          speaker?: {
            name?: string;
            title?: string;
          };
        }
      ];
    }
  ];
}
export interface ChallengeTrackResult {
  track: string;
  display?: boolean;
  awards: Array<TrackAward>;
}

export interface TrackAward {
  awardName?: string;
  prize?: number;
  award?: number;
  teamId: number;
  score?: number;
}

export interface Award {
  awardName: string;
  amount: number;
  count: number;
}

export interface Judge {
  id?: string;
  name: string;
  title?: string | null;
  avatarURI: string;

  organization?: string | null;
  description?: string | null;
  twitterLink?: string | null;
  email?: string | null;
}

export interface Reviewer {
  id: string;
  challengeId: ChallengeID;
  userId: UserID;
  email: string;
  userName?: string;
  fullName?: string;
  firstName?: string;
  avatarURI?: string;
}

export const minusMileStones = ["Preparation", "Teaming", "Result"] as const;

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
  stageName:
    | "NOP"
    | "Preparation"
    | "Teaming"
    | "Project Submission"
    | "Review"
    | "Result";
  showName?: string;
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

/**
 *  Team
 */
export type TeamID = string;

export interface Team {
  id: TeamID;
  name: string;
  status: string;
  challengeId: ChallengeID;
  openingRoles: RoleUnion[];
  skills: SkillUnion[];
  teamMembers: TeamMember[];
  project: Project;
  challenge?: Challenge;
  nation?: string;
  experience?: number;
  pastGrant?: string;
  builtDate?: string;
}

export type ProjectId = string;
export type ProjectStatus = "INITIATED | REJECTED | SELECTED"; // 后台不会返回 TERMINATED
export interface Project {
  id: ProjectId;
  externalId:string;
  name: string;
  description: string;
  tags: string[];
  bountyTrack?: string[];
  status: ProjectStatus;
  teamId: string;
  team: Team;
  mediaURLs: string[];
  updatedAt: string;
  deckURI?: string;
  videoURI?: string;
  demoURI?: string;
  githubURI?: string;
  projectScore: {
    mark: number[];
    reviewerId: string;
  }[];
  experience?: number;
  pastGrant?: string;
  builtDate?: string;
  siteURI?: string;
  contact?: string;
  recommendedFrom?: string;
  membersCount?: number;
  offlineDemoDay?: number;
}

export interface TeamMember {
  id: string;
  teamId: TeamID;
  userId: UserID;
  teamRole: RoleUnion;
  isLeader: boolean;
  userProfile: UserProfile;
  team?: Team;
}

/**
 * Grouping Request
 */
export type GroupingRequestId = string;

export interface GroupingRequest {
  type: "APPLICATION" | "INVITATION";
  recipientId: UserID;
  teamRole: RoleUnion;
  message?: string;
}
export interface GroupingRequestFull extends GroupingRequest {
  id: GroupingRequestId;
  status: "PENDING" | "REVOKED" | "ACCEPTED" | "DECLINED";
  teamId: number;
  createdAt: string;
  updatedAt: string;
  recipient?: UserProfile;
  senderId: UserID;
  sender?: UserProfile;
  team: Pick<Team, "id" | "name"> & {
    challenge: Pick<Challenge, "id" | "title">;
  };
}

export interface RepoStats {
  languages: Record<string, number>;
  openIssuesCount: number;
  totalPullRequests: number;
  totalCommits: number;
  latestCommits: RepoLatestCommit[];
}
export interface RepoLatestCommit {
  commitURI: string;
  commitMessage: string;
  commitAuthor: string;
  commitDate: string;
}

export interface ChallengeInvitation {
  email: string;
  status: "WaitingToJoin" | "Joined";
}

export interface Shortlist {
  name: string;
  display: boolean;
  projectIdArr: string[];
  projects?: Project[];
}
