import { Dialogs, useDialogStore } from '../../store';
import { TeamMemberRow } from './member-row';

interface TeamManageMemberDialogProps {
  data: NonNullable<Dialogs['team_manage_member']>;
  close: () => void;
}

export default function TeamManageMemberDialog({
  data,
  close,
}: TeamManageMemberDialogProps) {
  let showDialog = useDialogStore((s) => s.open);

  const gotoInviteMember = () => {
    showDialog('team_invite_member', data);
    close();
  };

  return (
    <div className="flex flex-col justify-center w-[80vw] max-w-md">
      <p className="heading-6 text-gray-200">Manage Members</p>
      <div className="mt-4">
        {data?.teamMembers.map((m) => (
          <TeamMemberRow key={m.id} member={m} />
        ))}
      </div>

      <div className="py-4">
        <button className="text-gray-500 body-5" onClick={gotoInviteMember}>
          + Invite a new member
        </button>
      </div>
    </div>
  );
}
