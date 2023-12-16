"use client";
import { useLoadingWhen } from "@/components/loading/store";
import { useFetchSummary } from "@/services/summary.query";
import { useOrganization, useUser } from "@clerk/nextjs";
import { formatDistance, parseISO } from "date-fns";
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
