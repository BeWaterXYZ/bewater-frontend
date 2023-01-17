import { Roles } from '@/components/tag';
import { Team } from './challenge';
import { UserID, UserProfile } from './user';

export type GroupingRequestId = string;

export interface GroupingRequest {
  type: 'APPLICATION' | 'INVITATION';
  senderId: UserID;
  recipientId: UserID;
  teamRole: Roles;
  message: string;
}
export interface GroupingRequestFull extends GroupingRequest {
  id: GroupingRequestId;
  status: string;
  teamId: number;
  createdAt: Date;
  updatedAt: Date;
  recipient?: UserProfile;
  sender?: UserProfile;
  team: Pick<Team, 'id' | 'name'>;
}
