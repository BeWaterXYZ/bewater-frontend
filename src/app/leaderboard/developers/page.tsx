import { DeveloperData } from "../data/type";
import developer from "../data/developer.json";
import colors from "../data/colors.json";
import { Fragment } from "react";
import Image from "next/image";

function Developer(props: { data: DeveloperData; rank: number }) {
  const histogramBg = "w-[78px] h-[6px] rounded-[20px] bg-[#30313D]";
  const { data, rank } = props;
  const langList = Object.keys(data.languageSum)
    .sort((a, b) => data.languageSum[b]! - data.languageSum[a]!)
    .slice(0, 3);
  const langSum = Object.keys(data.languageSum).reduce(
    (sum, lang) => sum + data.languageSum[lang]!,
    0
  );
  return (
    <div className="grid grid-cols-[2fr_1fr_1fr] gap-6 items-center">
      <div className="flex items-center">
        <p className="font-bold text-[16px] leading-[21px] text-white mr-6">
          #{rank}
        </p>
        <a href={`https://github.com/${data.login}`}>
          <Image
            src={data.avatar_url}
            alt={data.name || data.login}
            width={60}
            height={60}
            className="rounded-full mr-6"
          />
        </a>
        <div>
          <a href={`https://github.com/${data.login}`}>
            <p className="font-bold text-[16px] leading-[21px] text-white mb-4">
              {data.name}
            </p>
          </a>
          <div className="text-xs">
            <div className="text-[#94A3B8]">
              <span className="mr-[20px]">Total Stars: {data.totalStars}</span>
              <span>Followers: {data.followers}</span>
            </div>
            {/* <p className="text-white">Token & NFT, DeFi</p> */}
          </div>
        </div>
      </div>
      <div>
        <p className="text-xs text-[#94A3B8] mb-[9px]">POPULAR REPO</p>
        <a href={`https://github.com/${data.projectArr?.[0]?.full_name}`}>
          <p className="text-[14px] leading-[18px] text-white mb-[9px]">
            {data.projectArr?.[0]?.name ?? "N/A"}
          </p>
        </a>
        <p className="text-[11px] leading-[15px] text-[#64748B] line-clamp-2">
          {data.projectArr?.[0]?.description}
        </p>
      </div>
      <div className="text-xs text-white grid grid-cols-[1fr_78px] gap-x-[13px] gap-y-2 items-center">
        {langList.map((lang, i) => (
          <Fragment key={i}>
            <p className="line-clamp-1">{lang}</p>
            <div className={histogramBg}>
              <div
                className={"h-[6px] rounded-[20px]"}
                style={{
                  width: `${Math.floor(
                    (data.languageSum[lang]! / langSum) * 100
                  )}%`,
                  backgroundColor: colors[lang]?.color ?? "#FFF",
                }}
              ></div>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

export default function Page() {
  const developerList = developer
    // .sort((a, b) => b.totalStars - a.totalStars)
    .slice(0, 50);
  return (
    <div className="w-[900px] flex flex-col gap-[24px] font-secondary">
      {developerList.map((data, index) => (
        <Developer data={data} rank={index + 1} key={index} />
      ))}
    </div>
  );
}
