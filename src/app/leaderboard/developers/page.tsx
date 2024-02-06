import { DeveloperData } from "../data/type";
import developer from "../data/developer.json";
import colors from "../data/colors.json";
import { Fragment } from "react";
import Image from "next/image";
import PageSwitcher from "../page-switcher";

const gridTemplate =
  "grid-cols-[minmax(0,_0.5fr)_minmax(0,_4fr)_minmax(0,_1fr)_minmax(0,_1fr)_minmax(0,_3fr)_minmax(0,_4fr)_minmax(0,_3fr)]";
const rowStyle = `grid gap-4 border-b border-b-[#334155] box-border ${gridTemplate}`;

function Developer(props: { data: DeveloperData; rank: number }) {
  const histogramBg =
    "w-[78px] h-[6px] rounded-[20px] bg-[#30313D] relative overflow-hidden";
  const { data, rank } = props;
  const langList = Object.keys(data.languageSum)
    .sort((a, b) => data.languageSum[b]! - data.languageSum[a]!)
    .slice(0, 3);
  const langSum = Object.keys(data.languageSum).reduce(
    (sum, lang) => sum + data.languageSum[lang]!,
    0
  );
  return (
    <div className={`${rowStyle} py-4 items-center text-xs text-[#F8FAFC]`}>
      <p>{rank}</p>
      <a href={`https://github.com/${data.login}`} className="flex">
        <Image
          src={data.avatar_url}
          alt={data.name || data.login}
          width={48}
          height={48}
          className="rounded-full mr-2"
        />
        <div>
          <p className="font-bold text-base text-[#F8FAFC] line-clamp-1 mb-2">
            {data.name || data.login}
          </p>
          <p className="text-xs text-[#CBD5E1]">@{data.login}</p>
        </div>
      </a>
      <p>{data.totalStars}</p>
      <p>{data.followers}</p>
      <p>Token & NFT, DeFi</p>
      <div className="overflow-hidden">
        <a href={`https://github.com/${data.projectArr?.[0]?.full_name}`}>
          <p className="text-sm leading-5 text-white mb-[9px] truncate">
            {data.projectArr?.[0]?.name ?? "N/A"}
          </p>
        </a>
        <p className="text-xs text-[#64748B] line-clamp-2">
          {data.projectArr?.[0]?.description}
        </p>
      </div>
      <div className="text-xs text-white grid grid-cols-[1fr_78px] gap-x-[13px] gap-y-2 items-center">
        {langList.map((lang, i) => (
          <Fragment key={i}>
            <p className="line-clamp-1">{lang}</p>
            <div className={histogramBg}>
              <div
                className={"h-[6px] rounded-[20px] absolute"}
                style={{
                  transform: "translateX(-6px)",
                  minWidth: "8px",
                  width: `calc(${Math.floor(
                    (data.languageSum[lang]! / langSum) * 100
                  )}% + 6px)`,
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
    <>
      <div
        className={`${rowStyle} py-2 font-medium text-[12px] leading-[22px] text-[#CBD5E1] uppercase`}
      >
        <p>Rank</p>
        <p>Name</p>
        <p>Stars</p>
        <p>Followers</p>
        <p>Topic</p>
        <p>Popular Repo</p>
        <p>Stack</p>
      </div>
      {developerList.map((data, index) => (
        <Developer data={data} rank={index + 1} key={index} />
      ))}
      {/* <PageSwitcher /> */}
    </>
  );
}
