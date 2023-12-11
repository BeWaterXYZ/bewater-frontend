"use client";
import { useLoadingWhen } from "@/components/loading/store";
import { OngoingChallenge } from "@/services/summary";
import { useFetchSummary } from "@/services/summary.query";
import { useOrganization, useUser } from "@clerk/nextjs";
import clsx from "clsx";
import { formatDistance, parseISO } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

const SectionTitleStyle = "text-gray-100 text-xl font-bold mb-[18px]";
const CardStyle = "border rounded border-[#24254E] bg-[#0B0C24]";

function IconRise() {
  return (
    <svg
      width="6"
      height="6"
      viewBox="0 0 6 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.49991 0.37501C2.49991 0.167898 2.6678 0 2.87492 0H5.62499C5.8321 0 6 0.167898 6 0.37501V3.12508C6 3.33219 5.8321 3.50009 5.62499 3.50009C5.41788 3.50009 5.24998 3.33219 5.24998 3.12508V1.28038L0.640186 5.89032C0.493738 6.03677 0.256295 6.03677 0.109842 5.89032C-0.0366108 5.74388 -0.0366144 5.50643 0.109834 5.35998L4.71966 0.75002H2.87492C2.6678 0.75002 2.49991 0.582122 2.49991 0.37501Z"
        fill="#29CC6A"
      />
    </svg>
  );
}

function IconFlat() {
  return (
    <svg
      width="12"
      height="10"
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 5C2 4.75147 2.20147 4.55 2.45 4.55L7.72218 4.55L5.74994 2.78536C5.56472 2.61965 5.54892 2.33516 5.71464 2.14995C5.88035 1.96473 6.16484 1.94893 6.35005 2.11465L9.20005 4.66464C9.29546 4.75001 9.34999 4.87197 9.34999 5C9.34999 5.12802 9.29546 5.24999 9.20005 5.33536L6.35005 7.88535C6.16484 8.05107 5.88035 8.03527 5.71464 7.85005C5.54892 7.66484 5.56472 7.38036 5.74994 7.21464L7.72218 5.45L2.45 5.45C2.20147 5.45 2 5.24853 2 5Z"
        fill="#0099FF"
      />
    </svg>
  );
}

function Campaign(props: { campaign: OngoingChallenge }) {
  const {
    campaign: {
      bannerUrl,
      title,
      id,
      contestantNum,
      teamNum,
      projectNum,
      curveData,
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
        <div className="bg-[cyan]/10 w-[365px] h-[112px]"></div>
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

function MetricCard(props: {
  title: string;
  current?: number;
  previous?: number;
}) {
  const current = props.current ?? 0;
  const diff = current - (props.previous ?? 0);
  return (
    <div className={`${CardStyle} w-[23.5%] py-[20px] px-[15px]`}>
      <div className="text-xxs leading-[12px] text-[#B6B6B6]">
        {props.title}
      </div>
      <div className="text-3xl text-bold leading-[40px] mt-[12px] mb-[12px]">
        {props.current}
      </div>
      <div className="flex text-xxs leading-[12px]">
        <p
          className={clsx(
            "mr-[6px] rounded-[1000px] border-[0.5px] flex justify-center items-center h-[12px] w-[24px]",
            diff > 0
              ? "border-[#29CC6A]/20 bg-[#29CC6A]/10"
              : "border-[#65A9FF]/20 bg-[#65A9FF]/10"
          )}
        >
          {diff > 0 ? <IconRise /> : <IconFlat />}
        </p>
        <p
          className={clsx(
            "mr-[6px]",
            diff > 0 ? "text-[#29CC6A]" : "text-[#65A9FF]"
          )}
        >
          {diff}
        </p>
        <p className="text-[#B6B6B6]">this month</p>
      </div>
    </div>
  );
}

function Activity(props: { description: string; dateDistance: string }) {
  return (
    <div
      className={`${CardStyle} py-[6px] px-[15px] flex text-sm leading-[20px]`}
    >
      <p className="flex-1">{props.description}</p>
      <p className="opacity-70">{props.dateDistance} ago</p>
    </div>
  );
}

export default function Summary() {
  const user = useUser();
  const organization = useOrganization();
  const roleId = organization.organization?.id ?? user.user?.id;
  const { isLoading, data, refetch } = useFetchSummary(roleId);
  useLoadingWhen(!user.isSignedIn && !organization.isLoaded && isLoading);
  useEffect(() => {
    roleId && refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId]);
  return (
    <div
      className="container my-4 pt-20 grid gap-12 text-white"
      style={{
        fontFamily: "var(--font-secondary)",
      }}
    >
      <div className="flex items-center justify-between">
        <p className="text-3xl font-bold text-[#64748B]">
          Hello, {user.user?.username}
        </p>
        <Link href="/host/campaigns/new" className="btn btn-primary">
          + Draft a new campaign
        </Link>
      </div>
      <div>
        <p className={SectionTitleStyle}>Ongoing Campaign</p>
        {data?.ongoing[0] && <Campaign campaign={data?.ongoing[0]} />}
        <div></div>
      </div>
      <div>
        <p className={SectionTitleStyle}>Metrics</p>
        <div className="flex justify-between">
          <MetricCard
            title="Total Visitors"
            current={data?.totalVisitors.current}
            previous={data?.totalVisitors.previous}
          />
          <MetricCard
            title="Total Builders"
            current={data?.totalBuilder.current}
            previous={data?.totalBuilder.previous}
          />
          <MetricCard
            title="Total Projects"
            current={data?.totalProjects.current}
            previous={data?.totalProjects.previous}
          />
          <MetricCard
            title="Total Awards"
            current={data?.totalAwards.current}
            previous={data?.totalAwards.previous}
          />
        </div>
      </div>
      <div>
        <p className={SectionTitleStyle}>Activity</p>
        <div className="grid gap-[10px]">
          {data?.activitys?.map((activity, index) => (
            <Activity
              key={index}
              description={activity.description}
              dateDistance={formatDistance(
                parseISO(activity.createdAt),
                Date.now()
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
