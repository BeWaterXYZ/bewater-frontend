import { Avatar } from '@/components/avatar';
import { TagRole } from '@/components/tag';

import { Dialogs } from '../store';

interface TeamManageMemberDialogProps {
  data: Dialogs['team_manage_member'];
  close?: () => void;
}

export default function TeamManageMemberDialog({
  data,
  close,
}: TeamManageMemberDialogProps) {
  let nonLeaders = data?.teamMembers.filter((m) => !m.isLeader)!;

  return (
    <div className="flex flex-col justify-center  ">
      <p className="heading-6">Manage Members</p>

      {nonLeaders.map((m) => (
        <div
          key={m.userId}
          className="flex p-2 gap-2 border-b border-b-[#1E293B]"
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
            <button className="btn btn-danger">remove</button>
          </div>
        </div>
      ))}
    </div>
  );
}
