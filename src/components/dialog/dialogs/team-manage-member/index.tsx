import { useAlert, useAlertStore } from '@/components/alert/store';
import { Avatar } from '@/components/avatar';
import { TagRole } from '@/components/tag';
import { teamRemoveMember } from '@/services/team';
import clsx from 'clsx';

import { Dialogs, useDialogStore } from '../../store';

interface TeamManageMemberDialogProps {
  data: NonNullable<Dialogs['team_manage_member']>;
  close: () => void;
}

export default function TeamManageMemberDialog({
  data,
  close,
}: TeamManageMemberDialogProps) {
  let showDialog = useDialogStore((s) => s.open);

  const { confirm } = useAlert();
  let removeMember = async (userId: string) => {
    let confirmed = await confirm({
      title: 'are you sure',
      description: 'You are going to remove this member',
      okCopy: 'confirm',
      cancelCopy: 'cancel',
    });
    if (!confirmed) return;

    const team = await teamRemoveMember(data.id, userId);
    showDialog('team_manage_member', team);
  };

  const gotoInviteMember = () => {
    showDialog('team_invite_member', data);
    close();
  };

  return (
    <div className="flex flex-col justify-center w-[80vw] max-w-md">
      <p className="heading-6 text-grey-200">Manage Members</p>
      <div className="mt-4">
        {data?.teamMembers.map((m) => (
          <div
            key={m.userId}
            className="flex p-2 gap-2 border-b border-b-midnight"
          >
            <Avatar
              className="w-10 h-10"
              walletAddress={m.userProfile.walletAddress}
              src={m.userProfile.avatarURI}
            />
            <div className="flex flex-col justify-between">
              <p className="body-4 text-grey-300">
                {m.userProfile.fullName ?? m.userProfile.userName}
              </p>
              <p className="mono-4 text-grey-500">@{m.userProfile.userName}</p>
            </div>
            <div className="flex-1" />
            <div>
              <TagRole label={m.teamRole} />
            </div>
            <div className={clsx({ invisible: m.isLeader })}>
              <button
                className="btn btn-danger"
                onClick={() => {
                  removeMember(m.userId);
                }}
              >
                remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="py-4">
        <button className="text-grey-500 body-5" onClick={gotoInviteMember}>
          + Invite a new member
        </button>
      </div>
    </div>
  );
}
