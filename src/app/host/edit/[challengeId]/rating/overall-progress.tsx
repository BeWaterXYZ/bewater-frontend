import { Avatar } from "@/components/avatar/avatar";
import { Challenge, Project } from "@/services/types";

export function OverallProgress({
  projects,
  challenge,
}: {
  projects: Project[];
  challenge: Challenge;
}) {
  return (
    <div className="bg-latenight border border-[#24254E] rounded p-4 mb-4">
      <p className="body-2 mb-2">Overall Progress</p>

      <div className="flex flex-col gap-2">
        {challenge.reviewers.map((rv) => {
          let left = projects.filter(
            (proj) => !proj.projectScore.some((s) => s.reviewerId === rv.userId)
          ).length;
          return (
            <div key={rv.id} className="flex  justify-between items-center gap-2">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8" src={rv.avatarURI} />
                <p className="body-3">
                  {rv.fullName || rv.userName || rv.firstName}
                </p>
              </div>
              <div className="flex flex-1 justify-end">
                {left === 0 ? (
                  <p className="body-4 text-grey-600">Completed</p>
                ) : (
                  <p className="body-4 text-grey-600">
                    {" "}
                    <strong className="body-2 text-white">{left}</strong>{" "}
                    projects left
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
