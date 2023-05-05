/**
 * User
 */

import { ProjectTagUnion } from '@/constants/options/project-tag';
import { RoleUnion } from '@/constants/options/role';
import { SkillUnion } from '@/constants/options/skill';
import { string } from 'zod';

export type UserID = string;

export interface UserProfile {
  userId: UserID;
  email: string;
  walletAddress: string;
  userName?: string;
  avatarURI?: string;
  fullName?: string;
  bio?: string;
  roles: RoleUnion[];
  skills: SkillUnion[];
}
export interface SocialAuth {
  platform: 'GitHub' | 'Figma';
  authStatus: 'AUTHORIZED';
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
  title: string;
  hostName: string;
  description: string;
  bannerUrl: string;
  requirements: string[];
  reviewDimension: string[];
  startTime: string;
  endTime: string;
  totalAward: number;
  awardCurrency: string;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'CANCELED' | 'PAUSED';
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
    | 'Preparation'
    | 'Teaming'
    | 'Project Submission'
    | 'Review'
    | 'Result';
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
}

export type ProjectId = string;
export interface Project {
  id: ProjectId;
  name: string;
  description: string;
  tags: ProjectTagUnion[];
  status: string;
  teamId: string;
  team: Team;
  mediaURLs: string[];
  updatedAt: string;
  deckURI?: string;
  videoURI?: string;
  demoURI?: string;
  githubURI?: string;
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
  type: 'APPLICATION' | 'INVITATION';
  recipientId: UserID;
  teamRole: RoleUnion;
  message: string;
}
export interface GroupingRequestFull extends GroupingRequest {
  id: GroupingRequestId;
  status: 'PENDING' | 'REVOKED' | 'ACCEPTED' | 'DECLINED';
  teamId: number;
  createdAt: string;
  updatedAt: string;
  recipient?: UserProfile;
  senderId: UserID;
  sender?: UserProfile;
  team: Pick<Team, 'id' | 'name'> & {
    challenge: Pick<Challenge, 'id' | 'title'>;
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
