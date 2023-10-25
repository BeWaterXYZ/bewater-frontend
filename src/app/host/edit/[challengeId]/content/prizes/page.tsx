"use client";
import { segmentSchema } from "@/app/host/segment-params";
import { useFetchChallengeById } from "@/services/challenge.query";
import { Prizes } from "./form";
import { useScrollTo } from "../scroll";

export default function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { data: challenge } = useFetchChallengeById(challengeId);
  useScrollTo("prizes");
  if (!challenge) return null;
  return <Prizes challenge={challenge} />;
}
