"use client";
import { ChallengeID } from "@/services/types";

export function Frame({ challengeId }: { challengeId: ChallengeID }) {
  return (
    <div className="m-4 rounded-md bg-[#25263C] pt-8">
      <iframe id="preview" src={`/en/campaigns/${challengeId}`}  className="w-full h-full" />
    </div>
  );
}
