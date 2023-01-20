import { Role } from '@/components/tag';
import { Team } from './challenge';
import { UserID, UserProfile } from './user';

export type GroupingRequestId = string;

export interface GroupingRequest {
  type: 'APPLICATION' | 'INVITATION';
  senderId: UserID;
  recipientId: UserID;
  teamRole: Role;
  message: string;
}
export interface GroupingRequestFull extends GroupingRequest {
  id: GroupingRequestId;
  status: string;
  teamId: number;
  createdAt: string;
  updatedAt: string;
  recipient?: UserProfile;
  sender?: UserProfile;
  team: Pick<Team, 'id' | 'name'>;
}
