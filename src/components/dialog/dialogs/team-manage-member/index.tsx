import { useAlert, useAlertStore } from '@/components/alert/store';
import { Avatar } from '@/components/avatar';
import { TagRole } from '@/components/tag';
import { teamRemoveMember } from '@/services/team';

import { Dialogs, useDialogStore } from '../../store';
import { InviteMember } from './invite-member';

interface TeamManageMemberDialogProps {
  data: NonNullable<Dialogs['team_manage_member']>;
  close: () => void;
}

export default function TeamManageMemberDialog({
  data,
  close,
}: TeamManageMemberDialogProps) {
  let updateDialog = useDialogStore((s) => s.open);
  let nonLeaders = data?.teamMembers.filter((m) => !m.isLeader)!;

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
    updateDialog('team_manage_member', team);
  };

  return (
    <div className="flex flex-col justify-center  w-[80vw]  max-w-md ">
      <p className="heading-6">Manage Members</p>
      <InviteMember team={data} close={close} />
      {nonLeaders.map((m) => (
        <div
          key={m.userId}
          className="flex p-2 gap-2 border-b border-b-midnight"
        >
          <Avatar
            size="small"
            walletAddress={m.userProfile.walletAddress}
            src={m.userProfile.avatarURI}
          />
          <div className="flex flex-col justify-between">
            <p className="body-4">
              {m.userProfile.fullName ?? m.userProfile.userName}
            </p>
            <p className="mono-4 text-grey">@{m.userProfile.userName}</p>
          </div>
          <div className="flex-1" />
          <div>
            <TagRole label={m.teamRole} />
          </div>
          <div>
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
  );
}
