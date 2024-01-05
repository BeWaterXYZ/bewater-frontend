"use client";
import { useFetchAnalyticsData } from "@/services/analytics.query";
import DataCardView from "./dataCardView";
import localFont from "next/font/local";
import { segmentSchema } from "@/app/host/segment-params";
import Chart from "./chart";
import { format, parseISO } from "date-fns";
import { useLoadingWhen } from "@/components/loading/store";

const BasementGrotesque = localFont({
  src: "../../../../../font/BasementGrotesque-Regular.woff2",
});

export default function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  const { data } = useFetchAnalyticsData(+challengeId);
  useLoadingWhen(!data);
  const analyticsData = {
    topProjects: {
      title: "Top Projects",
      secondary: "Page Views",
      histogram: true,
      data: data?.topProjects ?? [],
    },
    topReferrers: {
      title: "Top Referrers",
      secondary: "Page Views",
      histogram: true,
      data: data?.topReferers ?? [],
    },
    tags: {
      title: "Tags",
      secondary: "Projects",
      histogram: true,
      data: data?.tags ?? [],
    },
    locations: {
      title: "Locations",
      secondary: "Page Views",
      histogram: true,
      data: data?.locations ?? [],
    },
    browsers: {
      title: "Browsers",
      secondary: "Page Views",
      histogram: true,
      data: data?.browsers ?? [],
    },
    stars: {
      title: "Stars",
      secondary: "",
      histogram: true,
      data: data?.githubRepo.mostStar ?? [],
    },
    commits: {
      title: "Commits",
      secondary: "",
      histogram: true,
      data: data?.githubRepo.mostStar ?? [],
    },
    recentlyActive: {
      title: "Recently Active",
      secondary: "",
      histogram: false,
      data: data?.githubRepo.recentlyActive ?? [],
    },
  };

  const card =
    "bg-[#0B0C24] border-[1px] border-[#24254E] rounded-[4px] mb-[28px]";
  const lineChartModule = "pb-[20px] flex";
  const currentlineChartModule = `${lineChartModule} border-b-[2px] border-b-[#00FFFF]`;
  const lineChartTitle =
    "font-secondary text-base text-white w-[100px] mr-4 mb-2";
  const lineChartSecondary = "font-secondary text-xs text-[#64748B] uppercase";
  const lineChartBigNum = `${BasementGrotesque.className} text-5xl text-white font-normal`;

  return (
    <div className="mx-auto mt-[32px] mb-[120px] w-[1068px]">
      <div className="font-secondary text-2xl font-bold text-white mb-2">
        Analytics
      </div>
      <div className="font-secondary text-xs text-[#FFFFFF66] mb-[30px]">
        Leverage our analytics for data-driven decision making.
      </div>
      <div className={card}>
        <div className="font-secondary text-[10px] leading-[12px] text-[#64748B] float-right pt-[10px] pr-4">
          {data &&
            `Last Update: ${format(
              parseISO(data?.lastUpdated!),
              "yyyy-MM-dd HH:MM"
            )} UTC${`+${data?.timeZone}`.replace("+-", "-")}`}
        </div>
        <div className="pt-[36px] pl-[36px] flex gap-[80px]">
          <div className={currentlineChartModule}>
            <div>
              <div className={lineChartTitle}>Projects</div>
              <div className={lineChartSecondary}>LAST 20 DAYS</div>
            </div>
            <div className={lineChartBigNum}>{data?.teamNum}</div>
          </div>
          <div className={lineChartModule}>
            <div>
              <div className={lineChartTitle}>Vistors</div>
              <div className={lineChartSecondary}>LAST 30 DAYS</div>
            </div>
            <div className={lineChartBigNum}>{data?.visitors}</div>
          </div>
          <div className={lineChartModule}>
            <div>
              <div className={lineChartTitle}>Pageviews</div>
              <div className={lineChartSecondary}>LAST 30 DAYS</div>
            </div>
            <div className={lineChartBigNum}>{data?.pageViews}</div>
          </div>
        </div>
        <div className="px-[22px] pt-[33px] pb-5">
          <div className="h-[363px] text-white">
            <Chart data={data?.curveData ?? []} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <DataCardView source={analyticsData.topProjects} />
        <DataCardView source={analyticsData.topReferrers} />
      </div>
      <div className="grid grid-cols-3 gap-6 mb-[42px]">
        <DataCardView source={analyticsData.tags} />
        <DataCardView source={analyticsData.locations} />
        <DataCardView source={analyticsData.browsers} />
      </div>
      <div className="mb-6 font-secondary text-xl font-bold text-white">
        GitHub Repo
      </div>
      <div className="grid grid-cols-3 gap-6 mb-[-28px]">
        <DataCardView source={analyticsData.stars} />
        <DataCardView source={analyticsData.commits} />
        <DataCardView source={analyticsData.recentlyActive} />
      </div>
    </div>
  );
}
