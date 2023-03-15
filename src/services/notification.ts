import { compareDesc, parseISO } from 'date-fns';
import { agentAuthed } from './agent';
import {
  Challenge,
  GroupingRequest,
  GroupingRequestFull,
  GroupingRequestId,
  Team,
  UserProfile,
} from './types';
import { sortBy } from 'remeda';
interface SendGroupingRequestResponse {
  groupingRequest?: GroupingRequestFull;
  newRequest: boolean;
}

export interface OngoingNotifications {
  pendingNotifications: OngoingNotification[];
  readNotifications: OngoingNotification[];
}
export interface OngoingNotification {
  id: string;
  recipentId: string;
  notificationMessageId: string;
  status: 'PENDING';
  notificationMessage: OngoingNotificationBody;
}
export interface OngoingNotificationBody {
  id: string;
  type:
    | 'PROJECT_UPDATED'
    | 'TEAM_INFO_UPDATED'
    | 'CHALLENGE_UPDATED'
    | 'MEMBER_REMOVED'
    | 'MEMBER_JOINED'
    | 'MEMBER_LEFT'
    | 'MEMBER_ROLE_UPDATED'
    | 'TEAM_DISMISSED';

  messageBody: null;
  targetUserId: string;
  teamId: string;
  challengeId: null;
  challenge: Challenge;
  createdAt: string;
  updatedAt: string;
  targetUser: UserProfile;
  team: Team;
}

export async function sendGroupingRequest(
  teamId: Pick<Team, 'id'>['id'],
  request: Omit<GroupingRequest, 'senderId'>,
) {
  const { data } = await agentAuthed.post<SendGroupingRequestResponse>(
    `/team/${teamId}/request`,
    request,
  );
  return data;
}

export async function getAllGroupingRequest() {
  const { data } = await agentAuthed.get<{
    receivedApplications: GroupingRequestFull[];
    receivedInvitations: GroupingRequestFull[];
    sentApplications: GroupingRequestFull[];
    sentInvitations: GroupingRequestFull[];
  }>(`/user/requests`);
  return data;
}

export async function getAllOngoingNotifications() {
  let sort = (ns: OngoingNotification[]) => {
    return sortBy(ns, (n) => -parseISO(n.notificationMessage.createdAt));
  };
  const { data } = await agentAuthed.get<OngoingNotifications>(
    `/user/notifications`,
  );
  data.pendingNotifications = sort(data.pendingNotifications);
  data.readNotifications = sort(data.readNotifications);
  return data;
}

export function sortGroupingRequest(reqs: GroupingRequestFull[]) {
  return reqs.sort((a, b) => {
    return compareDesc(parseISO(a.createdAt), parseISO(b.createdAt));
  });
}

export async function revokeGroupingRequest(requestId: GroupingRequestId) {
  const { data } = await agentAuthed.put(`/team/request/${requestId}/revoke`);
  return data;
}

export async function acceptGroupingRequest(requestId: GroupingRequestId) {
  const { data } = await agentAuthed.put<{ success: boolean; reason: string }>(
    `/team/request/${requestId}/accept`,
  );
  return data;
}
export async function declineGroupingRequest(requestId: GroupingRequestId) {
  const { data } = await agentAuthed.put(`/team/request/${requestId}/decline`);
  return data;
}
