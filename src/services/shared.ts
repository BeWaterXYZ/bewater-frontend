import { Role } from '@/components/tag';
import { Challenge, Team } from './challenge';
import { UserID, UserProfile } from './user';

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
