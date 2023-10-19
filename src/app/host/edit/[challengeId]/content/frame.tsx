"use client";
import { ChallengeID } from "@/services/types";
import {
    useSelectedLayoutSegment
} from "next/navigation";
import { useEffect, useRef } from "react";

export function Frame({ challengeId }: { challengeId: ChallengeID }) {
  let segment = useSelectedLayoutSegment();
  let ref = useRef<HTMLIFrameElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.src = ` /en/campaigns/${challengeId}#${segment}`;
    }
  }, [segment]);
  return (
    <div className="m-4 rounded-md bg-[#25263C] pt-8">
      <iframe ref={ref} key={segment} className="w-full h-full" />
    </div>
  );
}
