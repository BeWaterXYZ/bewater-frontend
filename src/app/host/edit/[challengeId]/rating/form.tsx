"use client";
import { Avatar } from "@/components/avatar/avatar";
import { useDialogStore } from "@/components/dialog/store";
import { Challenge, Project } from "@/services/types";
import { CaretRightIcon } from "@radix-ui/react-icons";

export function EditRating({
  challenge,
  projects,
}: {
  challenge: Challenge;
  projects: Project[];
}) {
  let dialog = useDialogStore();

  let openRatingDimension = () => {
    dialog.open("rating_dimensions", { challenge });
  };
  let openRatingJudge = () => {
    dialog.open("rating_judge_invite", { challengeId: challenge.id });
  };
  return (
    <div>
      <div className="text-xl leading-8 text-white py-4 ">Rating</div>
      <p className="body-2 text-white/40">
        Select judges, define scoring criteria, and rate the selected projects.
      </p>

      <div className="bg-latenight border border-[#24254E] rounded px-4 my-6">
        <div className=" border-b border-b-white/10 py-6 flex justify-between items-center">
          <div>
            <p className="body-2">Judges</p>
            <p className="body-3 text-grey-600">
              Selected users can submit scores
            </p>
          </div>
          <div>
            <div className="flex ">
              {challenge.reviewers.map((rv, index) => {
                return (
                  <div
                    key={rv.userId}
                    className="relative"
                    style={{ left: -8 * index }}
                  >
                    <Avatar src={rv.avatarURI} className="w-8 h-8" />
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <button className="btn btn-secondary" onClick={openRatingJudge}>
              Select Judges
            </button>
          </div>
        </div>

        <div className="  py-6 flex justify-between items-center">
          <div>
            <p className="body-2">Rating Dimensions</p>
            <p className="body-3 text-grey-600">
              Set the dimensions for judges to score
            </p>
          </div>
          <div>
            {(challenge.scoreDimension ?? []).map((d) => (
              <div key={d.text} className="body-3 text-grey-300">
                {d.text}
              </div>
            ))}
          </div>
          <div>
            <button className="btn btn-secondary" onClick={openRatingDimension}>
              Set Dimensions
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr,250px] text-white gap-8">
        <div className="bg-latenight border border-[#24254E] rounded p-4">
          <p className="body-2">Score Details</p>

          <div>
            {projects.map((proj) => {
              return (
                <div
                  className="p-4 bg-[#1A1C40] rounded flex justify-between items-center my-2"
                  key={proj.id}
                >
                  <div className="flex-1">
                    <p className="body-3">{proj.name}</p>
                    <div className="flex gap-2 items-center">
                      <p className="body-4 text-grey-300">{proj.team.name}</p>
                      {proj.tags.map((t) => {
                        return (
                          <div key={t} className="text-grey-300 body-5 px-1 rounded-sm border ">
                            {t}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex flex-1 justify-between items-center">
                    <div>
                      <p className="text-grey-300 body-4">
                        {proj.projectScore.length === challenge.reviewers.length
                          ? "All Judges done"
                          : `${proj.projectScore.length}/${challenge.reviewers.length} judges done`}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-grey-300 body-3">score</p>
                        <p className="text-day body-1">
                          {proj.projectScore.length > 0
                            ? `${
                                proj.projectScore
                                  .flatMap((s) => s.mark)
                                  .reduce(
                                    (partialSum, a) => partialSum + a,
                                    0
                                  ) / proj.projectScore.length
                              }/${(challenge.scoreDimension ?? []).length * 10}`
                            : "--"}
                        </p>
                      </div>
                      <div>
                        <CaretRightIcon />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="bg-latenight border border-[#24254E] rounded p-4 mb-4">
            <p className="body-2">Overall Progress</p>
          </div>
          <div className="bg-latenight border border-[#24254E] rounded p-4 mb-4">
            <p className="body-2">Ranking</p>
          </div>
        </div>
      </div>
    </div>
  );
}
