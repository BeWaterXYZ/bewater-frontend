'use client';
import { Project } from '@/services/types';
import { useFetchUserSocialConnections } from '@/services/user.query';
import { useAuthStore } from '@/stores/auth';
import { UserConnectGithub } from './connect';
import { ProjectConnectGithub } from './repos';

export function GithubStatsSetup({ project }: { project: Project }) {
  const user = useAuthStore((s) => s.user);
  const isLeader = project.team.teamMembers
    .filter((m) => m.isLeader)
    .some((m) => m.userProfile.userId === user?.userId);

  const { data: socialConnections, isLoading } = useFetchUserSocialConnections(
    user?.userId,
  );

  if (!socialConnections || isLoading || !isLeader) return null;

  const userHasConnectedGithub = (socialConnections ?? []).some(
    (sc) => sc.platform.toLowerCase() === 'github' && !!sc.handle,
  );

  return userHasConnectedGithub ? (
    <ProjectConnectGithub project={project} />
  ) : (
    <UserConnectGithub />
  );
}
