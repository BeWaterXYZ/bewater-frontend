"use client";

import { segmentSchema } from "@/app/segment-params";
import { useFetchChallengeById } from "@/services/challenge.query";
import Link from "next/link";
import { Section } from "./section";

export default function Page({ params }: any) {
  let { challengeId } = segmentSchema.challengeId.parse(params);
  let { lang } = segmentSchema.lang.parse(params);
  console.log({
    lang,
    challengeId,
  });
  let { data: challenge } = useFetchChallengeById(challengeId);
  if (!challenge) return null;
  let publish = () => {};
  let metadata = challenge.metadata[lang];
  return (
    <div className="bg-night">
      {/* top bar */}
      <div className="px-8 sticky top-0 bg-night z-10 h-[72px] flex flex-row justify-between items-center">
        <Link href="/" className="text-sm text-white">
          {"<- Back"}
        </Link>
        <div className="text-sm text-white">
          {" Now You're Editing"}{" "}
          <span className="text-day">{challenge.title}</span>
        </div>
        <button className="btn btn-primary" onClick={publish}>
          Publish Request
        </button>
      </div>
      {/* banner section */}
      {metadata.sections.map((section) => {
        return (
          <Section key={section.id} section={section} challenge={challenge!} lang={lang}/>
        );
      })}
    </div>
  );
}
