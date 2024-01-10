import { Challenge, Project } from "@/services/types";

export function Ranking({
  projects,
  challenge,
}: {
  projects: Project[];
  challenge: Challenge;
}) {
  let top10 = projects
    .sort((a, b) => {
      let sa =
        a.projectScore
          .flatMap((s) => s.mark)
          .reduce((partialSum, c) => partialSum + c, 0) / a.projectScore.length;

      let sb =
        b.projectScore
          .flatMap((s) => s.mark)
          .reduce((partialSum, c) => partialSum + c, 0) / b.projectScore.length;

      return sb - sa;
    })
    .filter((c, i) => i < 10);
  return (
    <div className="bg-latenight border border-[#24254E] rounded p-4">
      <p className="body-2 mb-4 font-bold">Ranking</p>

      <div className="flex flex-col gap-[14px]">
        {top10.length === 0 && (
          <p className="font-secondary py-6 text-xs text-[#64748B] text-center">
            Ranking will be displayed when the milestone for judging begins.
          </p>
        )}
        {top10.map((proj) => {
          let score =
            proj.projectScore
              .flatMap((s) => s.mark)
              .reduce((partialSum, c) => partialSum + c, 0) /
            proj.projectScore.length;
          return (
            <div
              key={proj.id}
              className="flex justify-between items-center gap-2"
            >
              <div className="flex items-center gap-2 font-secondary text-sm text-grey-300 font-bold">
                {proj.projectScore.length ? score : "--"}
              </div>
              <div className="flex flex-1 justify-end font-secondary text-xs text-grey-300 text-right">
                {proj.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
