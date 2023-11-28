"use client";

import { segmentSchema } from "@/app/host/segment-params";
import { useFetchChallengeById } from "@/services/challenge.query";
import { useFetchChallengeProjects } from "@/services/project.query";
import { Shortlist } from "./form";

export default function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { data: challenge } = useFetchChallengeById(challengeId);
  const { data: projects } = useFetchChallengeProjects(challengeId);

  if (!challenge) return null;
  if (!projects) return null;
  return <Shortlist challenge={challenge} projects={projects} />;
}
