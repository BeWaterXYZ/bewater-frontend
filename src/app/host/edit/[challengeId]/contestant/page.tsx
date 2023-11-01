"use client";

import { segmentSchema } from "@/app/host/segment-params";
import { useFetchChallengeById } from "@/services/challenge.query";
import { EditContestant } from "./form";

export default function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { data: challenge } = useFetchChallengeById(challengeId);
  if (!challenge) return null;
  return (
    <div className="container m-auto">
      <EditContestant challenge={challenge} />
    </div>
  );
}
