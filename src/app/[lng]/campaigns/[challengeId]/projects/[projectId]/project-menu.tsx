'use client';

import { useDialogStore } from '@/components/dialog/store';
import { useNavigator } from '@/hooks/useNavigator';
import { teamRemoveMember } from '@/services/team';
import { Project, Team } from '@/services/types';
import { useClerk } from '@clerk/nextjs';

interface ProjectMenuProps {
  project: Project;
}
export default function ProjectMenu({ project }: ProjectMenuProps) {
  const showDialog = useDialogStore((s) => s.open);
  const user = useClerk().user;
  // todo use isTeamMember instead
  const isLeader = project.team.teamMembers
    // .filter((m) => m.isLeader)
    .some((m) => m.userProfile.clerkId === user?.id);
  const onProjectEdit = () => {
    showDialog('project_edit', project);
  };
  return isLeader ? (
    <button className="btn btn-secondary" onClick={onProjectEdit}>
      Edit
    </button>
  ) : null;
}
