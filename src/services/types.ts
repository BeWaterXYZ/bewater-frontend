import { Role, Skill } from '@/components/tag';

/**
 * User
 */

export type UserID = string;

export interface UserProfile {
  userId: UserID;
  email: string;
  walletAddress: string;
  userName?: string | undefined;
  avatarURI?: string | undefined;
  fullName?: string | undefined;
}

/**
 *  Challenge
 */
export type ChallengeID = string;
export interface Challenge {
  id: ChallengeID;
  title: string;
  description: string;
  requirements: string[];
  startTime: string;
  endTime: string;
  teamUpDeadline: string;
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
}

export interface Milestone {
  dueDate: string;
  stageName: string;
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
  openingRoles: Role[];
  skills: Skill[];
  teamMembers: TeamMember[];
  project: Project;
}
export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  status: string;
  teamId: string;
}
export interface TeamMember {
  id: string;
  teamId: number;
  userId: UserID;
  teamRole: Role;
  isLeader: boolean;
  userProfile: UserProfile;
}

/**
 * Grouping Request
 */
export type GroupingRequestId = string;

export interface GroupingRequest {
  type: 'APPLICATION' | 'INVITATION';
  recipientId: UserID;
  teamRole: Role;
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
