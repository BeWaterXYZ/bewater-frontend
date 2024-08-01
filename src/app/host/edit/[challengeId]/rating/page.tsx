"use client";

import { segmentSchema } from "@/app/host/segment-params";
import { useFetchChallengeById } from "@/services/challenge.query";
import { EditRating } from "./form";
import { useFetchChallengeProjects } from "@/services/project.query";

export default function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { data: challenge } = useFetchChallengeById(challengeId);
  const { data: projects } = useFetchChallengeProjects(challengeId);

  if (!challenge) return null;
  if (!projects) return null;
  return (
    <div className="container m-auto">
      <EditRating challenge={challenge} projects={projects} />
    </div>
  );
}
