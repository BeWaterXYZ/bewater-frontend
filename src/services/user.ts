import { APIResponse } from "@/types/response";

import { agentAnon, agentAuthed } from "./agent";
import {
  AddGithubRepo,
  GithubRepo,
  Project,
  UserID,
  UserProfile,
  UserProfileFull,
} from "./types";

export interface GetUserProfileByIdResponse extends APIResponse {
  userExist: boolean;
  userProfile?: UserProfile;
}

export interface CreateUserProfileResponse extends APIResponse {
  userId: UserID;
  createUserProfile: boolean;
  verified: boolean;
  userProfile?: UserProfile;
}

export interface UpdateUserProfileResponse extends APIResponse {
  userProfile?: UserProfile;
}

export interface UpdateUserProjectResponse extends APIResponse {
  project?: Project;
}

export async function getUserProfile() {
  const { data } = await agentAuthed.get<UserProfileFull>(`/user`);
  return data;
}
export async function getUserProjects(userId: UserID) {
  const { data } = await agentAuthed.get<{ projects: Project[] }>(
    `/project/user/${userId}`
  );
  return data.projects;
}

export async function getUserProfileFull(userId: UserID) {
  const { data } = await agentAuthed.get<UserProfileFull>(`/user/${userId}`);
  return data;
}

export async function getEmailVerificationCode(emailAddress: string) {
  const { data } = await agentAuthed.post<{ sentVerificationCode: boolean }>(
    "/user/email",
    null,
    { params: { emailAddress } }
  );
  return data;
}

// todo del
export async function submitCreateUserProfile(
  userProfile: Partial<UserProfile>
) {
  const { data } = await agentAuthed.post<CreateUserProfileResponse>(
    "/user/email/create",
    userProfile
  );
  return data;
}

export async function updateEmail({
  emailAddress,
  verificationCode,
}: {
  emailAddress: string;
  verificationCode: string;
}) {
  const { data } = await agentAuthed.put<{
    verified?: boolean;
    updated?: boolean;
    userProfile?: UserProfile;
  }>("/user/email/update", null, {
    params: { emailAddress, verificationCode },
  });
  return data;
}

export async function submitUpdateUserProfile(
  userProfile: Omit<Partial<UserProfile>, 'pinnedProjects'> & { pinnedProjectIds?: string[] }
) {
  const { data } = await agentAuthed.put<UpdateUserProfileResponse>(
    `/user`,
    userProfile
  );
  return data;
}

export async function addUserGithubRepo(githubRepo: GithubRepo) {
  const { data } = await agentAuthed.post<Project>(
    `/user/github-repo`,
    githubRepo
  );
  return data;
}

export async function updateUserGithubRepo(githubRepo: GithubRepo) {
  const { data } = await agentAuthed.put<Project>(
    `/user/github-repo/${githubRepo.externalId}`,
    githubRepo
  );
  return data;
}

export async function deleteUserGithubRepo(projectId: string) {
  const { data } = await agentAuthed.delete<UpdateUserProfileResponse>(
    `/user/github-repo/${projectId}`
  );
  return data;
}

export async function searchUsers(keyword: string) {
  const { data } = await agentAuthed.get<UserProfile[]>("/user/search", {
    params: { keyword },
  });
  return data ?? [];
}

export function checkUsername(currentUserName: string) {
  return async function (username: string) {
    if (username === currentUserName) return true;
    const { data } = await agentAnon.get<{ userNameAvailable: boolean }>(
      `/user/availability/${username}`
    );
    return data.userNameAvailable;
  };
}

export async function getSocialConnections() {
  const { data } = await agentAuthed.get<{
    socialAccounts: { platform: string; handle: string }[];
  }>("/user/social");
  return data.socialAccounts;
}

export async function disconnectSocialConnections(platform: string) {
  const { data } = await agentAuthed.post(`/auth/oauth/disconnect/${platform}`);
  return data;
}
