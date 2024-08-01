import { TagRole } from "@/components/tag";
import { Team } from "@/services/types";
import clsx from "clsx";

export function TeamRoleReadiness({ team }: { team: Team }) {
  if (team.openingRoles.length === 0) return null;
  let rolesData = team.openingRoles
    .map((role) => ({
      role,
      ready: team.teamMembers.some((m) => m.teamRole === role),
    }))
    .sort((a, b) => {
      if (a.ready && !b.ready) return -1;
      else if (b.ready && !a.ready) return 1;
      else return 0;
    });

  return (
    <div className="flex rounded border border-[#333568] overflow-hidden  ">
      {rolesData.map((role) => {
        return (
          <div
            key={role.role}
            className={clsx(
              "h-[30px] w-[30px] flex justify-center items-center",
              role.ready ? "bg-night" : "bg-[#1A1C40]"
            )}
          >
            <TagRole label={role.role} simple></TagRole>
          </div>
        );
      })}
    </div>
  );
}
