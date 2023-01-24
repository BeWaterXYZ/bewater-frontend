import { useMutation, useQueryClient } from '@tanstack/react-query';
import { compareDesc, parseISO } from 'date-fns';
import { agentAuthed } from './agent';
import {
  GroupingRequest,
  GroupingRequestFull,
  GroupingRequestId,
  Team,
} from './types';

export async function sendGroupingRequest(
  teamId: Pick<Team, 'id'>['id'],
  request: Omit<GroupingRequest, 'senderId'>,
) {
  const { data } = await agentAuthed.post(`/team/${teamId}/request`, request);
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
  const { data } = await agentAuthed.put(`/team/request/${requestId}/accept`);
  return data;
}
export async function declineGroupingRequest(requestId: GroupingRequestId) {
  const { data } = await agentAuthed.put(`/team/request/${requestId}/decline`);
  return data;
}

export function useRevokeGroupingRequest() {
  const queryClient = useQueryClient();
  return useMutation(revokeGroupingRequest, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['user', 'requests']);
    },
  });
}
export function useAcceptGroupingRequest() {
  const queryClient = useQueryClient();
  return useMutation(acceptGroupingRequest, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['user', 'requests']);
    },
  });
}
export function useDeclineGroupingRequest() {
  const queryClient = useQueryClient();
  return useMutation(declineGroupingRequest, {
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(['user', 'requests']);
    },
  });
}
