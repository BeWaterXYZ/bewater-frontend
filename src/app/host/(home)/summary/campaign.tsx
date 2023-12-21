import { CurveData, OngoingChallenge } from "@/services/summary";
import { CardStyle } from "./summary";
import Image from "next/image";
import Link from "next/link";
import Chart from "./chart";

export default function Campaign(props: { campaign: OngoingChallenge }) {
  const {
    campaign: {
      bannerUrl,
      title,
      id,
      contestantNum,
      teamNum,
      projectNum,
      curveData,
      visitors,
    },
  } = props;
  return (
    <div className={`py-[40px] px-[25px] ${CardStyle} flex`}>
      <div className="grid gap-[16px] flex-1">
        <div className="w-[302px] h-[96px] mb-[16px]">
          {bannerUrl && (
            <Image alt="Banner image" width={302} height={96} src={bannerUrl} />
          )}
        </div>
        <p className="leading-[28px] text-lg font-bold">{title}</p>
        <div className="flex text-xs leading-[16px] w-fit">
          <div className="mr-[14px] px-[10px] py-[5px] bg-grey-800 rounded-[1000px] w-fit">
            <span className="mr-[10px]">Contestants</span>
            <span className="text-[#00FFFF]">{contestantNum}</span>
          </div>
          <div className="mr-[14px] px-[10px] py-[5px] bg-grey-800 rounded-[1000px] w-fit">
            <span className="mr-[10px]">Teams</span>
            <span className="text-[#00FFFF]">{teamNum}</span>
          </div>
          <div className="px-[10px] py-[5px] bg-grey-800 rounded-[1000px] w-fit">
            <span className="mr-[10px]">Projects</span>
            <span className="text-[#00FFFF]">{projectNum}</span>
          </div>
        </div>
      </div>
      <div className="relative">
        <div className="bg-[cyan]/10 w-[365px] h-[112px] relative">
          <Chart data={curveData} pageViews={visitors} />
        </div>
        <div className="flex justify-end absolute bottom-0 right-0">
          <Link
            href={`/host/edit/${id}`}
            className="btn btn-secondary rounded-[6px] mr-[10px] p-[10px]"
          >
            Setting
          </Link>
          <Link
            href={`/host/edit/${id}/contestant`}
            className="btn btn-secondary rounded-[6px] p-[10px]"
          >
            Contestants Manage
          </Link>
        </div>
      </div>
    </div>
  );
}
