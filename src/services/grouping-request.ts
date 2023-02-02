import { compareDesc, parseISO } from 'date-fns';
import { agentAuthed } from './agent';
import {
  GroupingRequest,
  GroupingRequestFull,
  GroupingRequestId,
  Team,
} from './types';

interface SendGroupingRequestResponse {
  groupingRequest?: GroupingRequestFull;
  newRequest: boolean;
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
