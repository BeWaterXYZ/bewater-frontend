"use client";
import Image from "next/image";
import { SectionProps } from "../../section";
import { HeroData } from "./types";


export function Hero({ section, challenge }: SectionProps) {
  let data: HeroData = section.data;
  return (
    <div>
      <div
        id={`section-hero-${section.id}`}
        className={`relative h-[560px] overflow-hidden text-center flex flex-col gap-5 justify-center bg-cover bg-center `}
        style={{
          backgroundImage: `url(${data.background})`,
        }}
      >
        <div className="absolute top-8 right-8">
          {/* <EditBanner challenge={challenge} /> */}
        </div>
        <Image
          src={data.icon}
          width={120}
          height={24}
          alt="host logo"
          className="mx-auto h-8 md:h-10 object-contain" />
        <div className="space-y-6">
          <h1 className="text-xl leading-[30px] md:text-5xl font-black text-white">
            {data.title}
          </h1>
          <h2 className="text-[24px] md:text-2xl uppercase font-light text-white">
            {data.secondaryTitle}
          </h2>
          <h3 className="text-[20px] md:text-2xl uppercase font-light text-white">
            {data.tertiaryTitle}
          </h3>
        </div>
      </div>
    </div>
  );
}
