'use client';

import { useAlert } from '@/components/alert/store';
import { useDialogStore } from '@/components/dialog/store';
import { useNavigator } from '@/hooks/useNavigator';
import { useFetchChallengeById } from '@/services/challenge.query';
import { teamRemoveMember } from '@/services/team';
import { Team } from '@/services/types';
import { useFetchUser } from '@/services/user.query';
import { useClerk } from '@clerk/nextjs';

interface TeamMenuProps {
  team: Team;
  lng: string;
}

export default function TeamMenu({ team, lng }: TeamMenuProps) {
  const { confirm } = useAlert();
  const { data: challenge } = useFetchChallengeById(team.challengeId);
  const router = useNavigator(lng);
  const user = useClerk().user;
  const { data: userProfile } = useFetchUser(user?.id);
  const isAuthed = !!user;
  const navigator = useNavigator(lng);
  const showDialog = useDialogStore((s) => s.open);
  const isJoined = team.teamMembers.some(
    (m) => m.userProfile.clerkId === user?.id,
  );
  const isLeader = team.teamMembers
    .filter((m) => m.isLeader)
    .some((m) => m.userProfile.clerkId === user?.id);

  const clerk = useClerk();
  const requestJoin = () => {
    if (!clerk.user) {
      clerk.redirectToSignIn();
      return;
    }
    showDialog('team_join', team);
  };
  const manageMembers = () => {
    showDialog('team_manage_member', team);
  };
  const editTeam = () => {
    showDialog('team_create', { team });
  };

  const quitTeam = async () => {
    let confirmed = await confirm({
      title: 'Are you sure?',
      description: 'You are going to leave the team',
      okCopy: 'Confirm',
      cancelCopy: 'Cancel',
    });
    if (!confirmed) return;
    await teamRemoveMember(team.id, userProfile?.id!);
    router.refresh();
  };

  const share = () => {
    if (!window) return;
    let url =
      window.location.origin +
      `/campaigns/${team.challengeId}/teams/${team.id}`;

    let usp = new URLSearchParams();
    usp.append(
      'text',
      isJoined
        ? `我在 ${challenge!.title} 上创建了队伍! 快来加入吧!`
        : `快来加入 我在 ${challenge!.title} 上发现的队伍吧!`,
    );

    usp.append('url', url);
    usp.append('hashtags', 'BeWaterWeb3Campaigns');
    let twitterURL = 'http://twitter.com/share?' + usp.toString();
    window!.open(twitterURL, '_blank')!.focus();
  };
  return (
    <div className="flex gap-2">
      <button className="btn btn-secondary" onClick={share}>
        Share
      </button>
      {!isAuthed || !isJoined ? (
        <button className="btn btn-primary" onClick={requestJoin}>
          Request to join
        </button>
      ) : isLeader ? (
        <>
          <button className="btn btn-secondary" onClick={manageMembers}>
            Manage Members
          </button>
          <button className="btn btn-secondary" onClick={editTeam}>
            Edit
          </button>
        </>
      ) : (
        <button className="btn btn-danger" onClick={quitTeam}>
          Quit
        </button>
      )}
    </div>
  );
}
