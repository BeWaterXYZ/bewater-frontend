"use client";
import { useDialogStore } from "@/components/dialog/store";
import { Challenge } from "@/services/types";
import { CaretRightIcon } from "@radix-ui/react-icons";

export function EditRating({ challenge }: { challenge: Challenge }) {
  let dialog = useDialogStore();

  let openRatingDimension = () => {
    dialog.open("rating_dimensions", { challenge });
  };
  let openRatingJudge = () => {
    dialog.open("rating_judge_invite", { challenge });
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
          <div></div>
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
            {challenge.scoreDimension.map((d) => (
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
            <div className="p-4 bg-[#1A1C40] rounded flex justify-between items-center">
              <div className="flex-1">
                <p className="body-3">Yet anothjer layer 2</p>
                <p className="body-4 text-grey-300">Dream team</p>
              </div>
              <div className="flex flex-1 justify-between items-center">
                <div>
                  <p className="text-grey-300 body-3">All Judges done</p>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-grey-300 body-3">score</p>
                    <p className="text-day body-1">48/60</p>
                  </div>
                  <div>
                    <CaretRightIcon />
                  </div>
                </div>
              </div>
            </div>
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
