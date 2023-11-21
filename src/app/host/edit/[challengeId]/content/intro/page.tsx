"use client";
import { useState } from 'react'
import { segmentSchema } from "@/app/host/segment-params";
import { useFetchChallengeById } from "@/services/challenge.query";
import { Intro } from "./form";
import { useScrollTo } from "../scroll";
import Script from 'next/script'

/*
  intro tinymce
*/
export default function Page({ params }: any) {
  const [tinymce, setMce] = useState(null);
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { data: challenge } = useFetchChallengeById(challengeId);
  useScrollTo("intro");
  if (!challenge) return null;
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://cdn.staticfile.org/tinymce/6.7.3/tinymce.min.js"
        onLoad={() => {
          const thisWin: any = window;
          setMce(thisWin.tinymce);
        }}
      />
      <Intro challenge={challenge} tinymce={tinymce} />
    </>
  );
}
