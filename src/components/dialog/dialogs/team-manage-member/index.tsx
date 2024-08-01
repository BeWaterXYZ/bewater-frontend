import { Dialogs, useDialogStore } from "../../store";
import { TeamMemberRow } from "./member-row";

interface TeamManageMemberDialogProps {
  data: NonNullable<Dialogs["team_manage_member"]>;
  close: () => void;
}

export default function TeamManageMemberDialog({
  data,
  close,
}: TeamManageMemberDialogProps) {
  let showDialog = useDialogStore((s) => s.open);

  const gotoInviteMember = () => {
    showDialog("team_invite_member", data);
    close();
  };

  return (
    <div className="flex flex-col justify-center w-[80vw] max-w-md">
      <p className="heading-6 text-grey-200">Manage Members</p>
      <div className="mt-4">
        {data?.teamMembers.map((m) => (
          <TeamMemberRow key={m.id} member={m} lng={"en"} />
        ))}
      </div>

      <div className="py-4">
        <button className="text-grey-500 body-4" onClick={gotoInviteMember}>
          + Invite a new member
        </button>
      </div>
    </div>
  );
}
