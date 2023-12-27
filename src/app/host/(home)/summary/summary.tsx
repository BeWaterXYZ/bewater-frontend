"use client";
import { useLoadingWhen } from "@/components/loading/store";
import { useFetchSummary } from "@/services/summary.query";
import { useOrganization, useUser } from "@clerk/nextjs";
import { formatDistance, parseISO, format } from "date-fns";
import Link from "next/link";
import { useEffect } from "react";
import Campaign from "./campaign";
import MetricCard from "./metric-card";
import Activity from "./activity";

export const SectionTitleStyle = "text-gray-100 text-xl font-bold mb-[18px]";
export const CardStyle = "border rounded border-[#24254E] bg-[#0B0C24]";

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
        {(data?.ongoing.length ?? 0) > 0 && (
          <Link href="/host/campaigns/new" className="btn btn-primary">
            + Draft a new campaign
          </Link>
        )}
      </div>
      <div>
        {(data?.ongoing.length ?? 0) > 0 ? (
          <>
            <p className={SectionTitleStyle}>
              {data?.ongoing[0].status === "ACTIVE"
                ? "Ongoing Campaign"
                : "Latest Campaign"}
            </p>
            <Campaign campaign={data?.ongoing[0]!} />
          </>
        ) : (
          <div
            className={`${CardStyle} py-[40px] px-[25px] flex flex-col items-center`}
          >
            <p className="text-xl mb-[18px]">⭐️ Create your first campaign</p>
            <Link href="/host/campaigns/new" className="btn btn-primary w-fit">
              + Draft a new campaign
            </Link>
          </div>
        )}
      </div>
      <div>
        <div className="w-full relative flex items-center">
          <p className={`${SectionTitleStyle} flex-1`}>Metrics</p>
          <p className="text-[#64748B] text-xxs leading-[12px] h-fit pb-[18px]">
            {data?.ongoing.length
              ? `Last Update: ${format(
                  parseISO(data?.lastUpdated!),
                  "yyyy-MM-dd HH:MM"
                )} UTC${`+${data?.ongoing[0]!.timeZone}`.replace("+-", "-")}`
              : ""}
          </p>
        </div>
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
          {(data?.activitys?.length ?? 0) > 0 ? (
            data?.activitys?.map((activity, index) => (
              <Activity
                key={index}
                description={activity.description}
                dateDistance={formatDistance(
                  parseISO(activity.createdAt),
                  Date.now()
                )}
              />
            ))
          ) : (
            <p
              className={`py-[6px] text-[#64748B] text-sm text-center leading-[20px]`}
            >
              No activity recorded yet.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
