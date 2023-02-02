import { useAlert } from '@/components/alert/store';
import { useLoadingStoreAction } from '@/components/loading/store';
import { TagRole } from '@/components/tag';
import { RoleSetOptions, RoleUnion } from '@/constants/options/role';
import { useOutsideClick } from '@/hooks/useClickOutside';
import { useNavigator } from '@/hooks/useNavigator';
import {
  getTeam,
  teamRemoveMember,
  teamUpdateMemberRole,
} from '@/services/team';
import { Team, TeamMember } from '@/services/types';
import { CaretDownIcon, CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { useDialogStore } from '../../store';

export function TeamMemberManager({ member }: { member: TeamMember }) {
  const showDialog = useDialogStore((s) => s.open);
  const router = useNavigator();
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const [editing, editingSet] = useState(false);
  const ref = useOutsideClick(() => editingSet(false));

  const { confirm } = useAlert();
  let removeMember = async (userId: string) => {
    let confirmed = await confirm({
      title: 'are you sure',
      description: 'You are going to remove this member',
      okCopy: 'confirm',
      cancelCopy: 'cancel',
    });
    if (!confirmed) return;
    showLoading();
    try {
      const team = await teamRemoveMember(member.teamId, userId);
      router.refresh();
      showDialog('team_manage_member', team);
    } catch (err) {
    } finally {
      dismissLoading();
    }
  };
  const updateRole = (role: RoleUnion) => async () => {
    showLoading();
    try {
      let newTM = await teamUpdateMemberRole(
        member.teamId,
        member.userId,
        role,
      );
      showDialog('team_manage_member', (team) => {
        return {
          ...team,
          teamMembers: team?.teamMembers.map((tm) => {
            return {
              ...tm,
              teamRole:
                tm.userId === newTM.userId ? newTM.teamRole : tm.teamRole,
            };
          }),
        } as Team;
      });
      router.refresh();
    } catch (err) {
    } finally {
      dismissLoading();
    }
  };
  return (
    <div className="relative cursor-pointer">
      {editing ? (
        //  {/* edting */}
        <div
          className="absolute top-0 right-0 bg-[#0F1021] border border-grey-800  z-10"
          onClick={() => editingSet(false)}
          ref={ref}
        >
          <div className="p-2">
            {RoleSetOptions.map((role) => {
              return (
                <div
                  key={role.value}
                  className="flex gap-2 justify-between py-1 hover:bg-grey-600 cursor-pointer"
                  onClick={updateRole(role.value)}
                >
                  <TagRole label={role.value} />
                  {member.teamRole === role.value ? (
                    <CheckIcon className="text-white" />
                  ) : null}
                </div>
              );
            })}
          </div>
          {member.isLeader ? null : (
            <div className="border-t border-t-grey-800 p-2 flex gap-2 items-center">
              <Cross1Icon className="text-danger"></Cross1Icon>
              <button
                className="bdoy-4 text-danger"
                onClick={() => {
                  removeMember(member.userId);
                }}
              >
                Remove
              </button>
            </div>
          )}
        </div>
      ) : (
        // {/* display */}
        <div
          className="flex gap-2 "
          onClick={() => {
            editingSet(true);
          }}
        >
          <TagRole label={member.teamRole} />
          <CaretDownIcon className="text-white" />
        </div>
      )}
    </div>
  );
}
