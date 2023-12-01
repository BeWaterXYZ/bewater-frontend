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
    <div className="bg-latenight border border-[#24254E] rounded p-4 mb-4">
      <p className="body-2 mb-2">Overall Progress</p>

      <div className="flex flex-col gap-2 ">
        {top10.map((proj) => {
          let score =
            proj.projectScore
              .flatMap((s) => s.mark)
              .reduce((partialSum, c) => partialSum + c, 0) /
            proj.projectScore.length;
          return (
            <div key={proj.id}className="flex  justify-between items-center gap-2">
              <div className="flex items-center gap-2 body-3">{proj.projectScore.length ? score :'--'}</div>
              <div className="flex flex-1 justify-end body-3 text-grey-300 text-right">{proj.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}