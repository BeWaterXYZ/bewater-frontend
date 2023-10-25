"use client";
import Page from "@/app/host/challenges/[challengeId]/page";
import { ChallengeID } from "@/services/types";

export function Frame({ challengeId }: { challengeId: ChallengeID }) {
  return (
    <div className="m-4 rounded-md bg-[#25263C] pt-8 max-h-[100vh] overflow-scroll " id="frame">
      <Page params={{challengeId:challengeId}}/>
      {/* <iframe id="preview" src={`/host/challenges/${challengeId}`}  className="w-full h-full overflow-hidden" /> */}
    </div>
  );
}
