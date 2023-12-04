"use client";
import { Avatar } from "@/components/avatar/avatar";
import { useDialogStore } from "@/components/dialog/store";
import { Challenge, Project } from "@/services/types";
import { CaretRightIcon } from "@radix-ui/react-icons";
import { ScoreDetails } from "./score-details";
import { OverallProgress } from "./overall-progress";
import { Ranking } from "./ranking";

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
      <div className="grid grid-cols-[1fr,300px] text-white gap-8">
        <ScoreDetails challenge={challenge} projects={projects} />
        <div>
         <OverallProgress challenge={challenge} projects={projects}/>
         <Ranking challenge={challenge} projects={projects}/>
         
        </div>
      </div>
    </div>
  );
}
