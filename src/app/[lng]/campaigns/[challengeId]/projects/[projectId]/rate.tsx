"use client";

import { useDialogStore } from "@/components/dialog/store";
import { useFetchProjectRating } from "@/services/project.query";
import { Challenge, Project } from "@/services/types";
import { useClerk } from "@clerk/nextjs";

const textMaps = [
  " Innovation:  Hackathons encourage participants to think of novel solutions, so a unique and creative project would catch the attention. Innovation often means the project has the potential to make substantial improvements in society, industry, or the tech field.",
  "Feasibility: Feasibility of the project is a crucial factor. This includes technical feasibility, resource availability, and a realistic timeline.",
  "Completeness: The completeness of the project is also crucial. Even a brilliant idea needs to be implemented in practice.",
  "User Experience: User experience is critical for any application.  A good user experience can attract more users and enhance the project's chances of success.",
  "Social Impact: A project with social impact is often more appealing.",
  "Technical Depth: The technical depth of the project is also crucial. This includes the innovative use of technology and the adaptability of the tech stack.",
];

interface Props {
  challenge: Challenge;
  project: Project;
}
export function Rate(props: Props) {
  const showDialog = useDialogStore((s) => s.open);
  let user = useClerk().user;
  let isJudge = props.challenge.judges.some(
    (judge) =>
      judge.email?.toLowerCase() ===
      user?.emailAddresses[0].emailAddress.toLowerCase()
  );

  const { data: rating } = useFetchProjectRating(props.project.id, isJudge);
  if (!user) return null;
  if (!isJudge) return null;

  let rate = () => {
    showDialog("project_rating", {
      project: props.project,
      // fixme
      rating: (rating?.length ?? 0 > 0
        ? rating
        : new Array(textMaps.length).fill(0))!.map((r, i) => ({
        label: props.challenge.scoreDimension[i].text ?? textMaps[i],
        rate: r,
      })),
    });
  };
  let totalRating = rating?.reduce((p, c) => p + c, 0) ?? 0;
  return (
    <div className="border border-grey-800 p-3 mt-6 flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <p className="font-secondary text-[12px] font-bold text-grey-500">
          Score
        </p>
        {totalRating > 0 ? (
          <>
            <div className="text-day text-[24px] font-secondary">
              {totalRating}/{(rating?.length ?? 0) * 10}
            </div>
            <p className="font-secondary text-[12px] text-grey-500">
              You can change the score before the event ends.
            </p>
          </>
        ) : (
          <>
            <p className="font-secondary text-[18px]  text-grey-300">NA</p>
            <p className="font-secondary text-[12px] text-grey-500">
              No score yet, rate it before end day.
            </p>
          </>
        )}
      </div>
      <div>
        <button className="btn btn-primary" onClick={rate}>
          Rate
        </button>
      </div>
    </div>
  );
}
