"use client";
import { Challenge } from "@/services/types";
import Image from 'next/image';

export function EventVenue({
  challenge,
}: {
  challenge: Challenge;
}) {
  if (!challenge?.yotadata?.event_venue) {
    return null;
  }
  return (
    <div className="container text-white body-1">
      <p className="heading-4 text-center pb-12">{
          challenge.yotadata.event_venue.title.en
        }
      </p>
      {challenge.yotadata.event_venue?.content?.style_img ? (
        <div className="flex flex-col items-center py-10 pt-0 px-0 gap-10  from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[0px] border-midnight">
          {challenge.yotadata.event_venue.content.style_img.pc ? (
            <div className="hidden md:flex py-5 px-[20px]">
              <Image
                src={challenge.yotadata.event_venue.content.style_img.pc}
                alt=""
                width={2136}
                height={1543}
                className="w-full"
              />
            </div>
          ) :null}
          {(challenge.yotadata.event_venue.content.style_img.mobile ?? []).map((it: any, i: number ) => {
            return (
              <div className="flex md:hidden py-5 px-[15px]" key={i}>
                <Image
                  src={it}
                  alt=""
                  width={832}
                  height={778}
                  className="w-full"
                  style={{ borderRadius: '10px' }}
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
