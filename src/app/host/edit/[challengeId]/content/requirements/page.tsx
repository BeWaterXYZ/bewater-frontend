"use client";
import { segmentSchema } from "@/app/host/segment-params";
import { useFetchChallengeById } from "@/services/challenge.query";
import { Requirements } from "./form";
import { useScrollTo } from "../scroll";

export default function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { data: challenge } = useFetchChallengeById(challengeId);
  useScrollTo("requirements");

  if (!challenge) return null;
  return <Requirements challenge={challenge} />;
}
