"use client";
import React, { useState } from "react";
import { useLoadingWhen } from "@/components/loading/store";
import { getHostChallengePage } from "@/services/challenge";
import { Challenge } from "@/services/types";
import { unsplash } from "@/utils/unsplash";
import { useOrganization, useUser } from "@clerk/nextjs";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { formatYYYYMMMDD } from "@/utils/date";
import { CardStyle } from "../summary/summary";
import { icons } from "../icons";
import CampaignMenu from "./campaignMenu";
import "./gridView.css";

function ChallengeStatusButton({ challenge }: { challenge: Challenge }) {
  return (
    <div
      className={clsx(
        "absolute top-4 left-4 py-2 px-3 border rounded-full flex gap-[6px] items-center text-xs font-bold",
        {
          "bg-green-500/10 border-green-500/20 text-green-500":
            challenge.status === "ACTIVE",
          "bg-[#64748B1A] border-[#64748B33] text-[#64748B]":
            challenge.status === "COMPLETED" || challenge.status === "DRAFT",
          "bg-yellow-500/10 border-yellow-500/20 text-yellow-500":
            challenge.status === "INREVIEW",
          "bg-red-500/10 border-red-500/20 text-red-500":
            challenge.status === "REFUSED",
        }
      )}
    >
      <div
        className={clsx("w-[6px] h-[6px] rounded-full border-[0.5px]", {
          "bg-green-500/30 border-green-600": challenge.status === "ACTIVE",
          "bg-gray-[#64748B4D] border-gray-600":
            challenge.status === "COMPLETED" || challenge.status === "DRAFT",
          "bg-yellow-500/30 border-yellow-600": challenge.status === "INREVIEW",
          "bg-red-500/30 border-red-600": challenge.status === "REFUSED",
        })}
      ></div>
      {challenge.status === "ACTIVE"
        ? "Active"
        : challenge.status === "COMPLETED"
        ? "Closed"
        : challenge.status === "DRAFT"
        ? "In Draft"
        : challenge.status === "INREVIEW"
        ? "In Review"
        : challenge.status === "REFUSED"
        ? "Audit Failed"
        : challenge.status}
    </div>
  );
}

export function Dashboard() {
  const containerRef = React.useRef(null);

  const { isLoaded, isSignedIn, user } = useUser();
  const [challenges, setChallenges] = useState([] as Challenge[]);
  const [loading, setLoading] = useState(false);
  const [more, setMore] = useState(true);
  const roleId = useOrganization().organization?.id ?? user?.id;
  const [version, setVersion] = useState(0);
  const [menu, setMenu] = useState(false);
  const [menuId, setMenuId] = useState("");
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const isAdmin = isLoaded && isSignedIn && user?.publicMetadata?.teamMember;
  useLoadingWhen(loading);

  const initChallengePage = () => {
    getHostChallengePage(version, "0").then((res) => {
      if (res.status === 200) {
        if (res.data.version === version) {
          setChallenges([].concat(res.data.challenges));
          if (res.data.challenges.length === 0) {
            setMore(false);
          }
          setLoading(false);
        }
      }
    });
    setLoading(true);
  };

  React.useEffect(() => {
    setMore(true);
    if (isLoaded && isSignedIn) {
      setVersion(version + 1);
      setTimeout(() => {
        initChallengePage();
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId, isLoaded, isSignedIn]);

  React.useEffect(() => {
    const node = containerRef.current;

    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (
          isLoaded &&
          isSignedIn &&
          challenges.length > 0 &&
          !loading &&
          more
        ) {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              getHostChallengePage(
                version,
                challenges[challenges.length - 1].id
              ).then((res) => {
                if (res.status === 200) {
                  if (res.data.version === version) {
                    setChallenges(challenges.concat(res.data.challenges));
                    if (res.data.challenges.length === 0) {
                      setMore(false);
                    }
                    setLoading(false);
                  }
                }
              });
              setLoading(true);
              observer.disconnect();
              break;
            }
          }
        } // end if
      },
      {
        root: null,
      }
    );

    if (node) {
      observer.observe(node);
    }

    return () => {
      observer.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerRef, isLoaded, isSignedIn, challenges, loading, more]);

  return (
    <>
      <div id="grid-view" className="grid gap-4">
        <div id="grid-view-header" className="flex justify-between mb-8">
          <p className="text-xl font-bold text-white">Campaigns</p>
          {challenges.length > 0 && (
            <Link
              href="/host/campaigns/new"
              className="btn btn-primary border-none h-auto py-2 px-4 text-[#003333]"
            >
              {icons.add_16}
              <span className="ml-2 text-sm">Draft a new campaign</span>
            </Link>
          )}
        </div>
        {challenges.length > 0 ? (
          <>
            {challenges.map((challenge) => {
              return (
                <div
                  className="bg-[#0B0C24] border border-[#24254E] rounded border-box"
                  key={challenge.id}
                >
                  <div className="relative">
                    <Image
                      src={challenge.bannerUrl ?? unsplash("host")}
                      alt={challenge.externalId!}
                      width={0}
                      height={0}
                      className="w-[254px] h-[186px] rounded-t object-cover"
                    />
                    <ChallengeStatusButton challenge={challenge} />
                  </div>
                  <div className="p-4">
                    <p className="font-bold text-white truncate mb-2">
                      {challenge.title}
                    </p>
                    <div className="text-xs text-gray-500 flex justify-between gap-2">
                      <p>
                        {formatYYYYMMMDD(challenge.startTime)}
                        {" -> "}
                        {formatYYYYMMMDD(challenge.endTime)}
                      </p>
                      {isAdmin === true && <p>{challenge.id}</p>}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="p-4">
                      <Link href={`/host/edit/${challenge.id}`}>
                        <button className="py-2 px-3 bg-[#2F3153] rounded-lg flex gap-4 items-center text-sm leading-5 text-white hover:bg-[#2F315380] transition-colors">
                          <span>EDIT</span>
                          {icons.campaignsIconsGo}
                        </button>
                      </Link>
                    </div>
                    <div className="p-4">
                      <button
                        className="p-[6px] text-gray-500"
                        onClick={(e) => {
                          setMenu(!menu);
                          setMenuId(challenge.id);
                          setMenuPosition({
                            x: e.pageX,
                            y: e.pageY,
                          });
                        }}
                      >
                        {icons.moreHorizontal_24}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={containerRef}></div>
            <p
              id="loading"
              className="text-sm leading-5 text-gray-500 text-center pt-4"
            >
              {more && "Loading..."}
            </p>
            {menu && (
              <CampaignMenu
                menuPosition={menuPosition}
                id={menuId}
                close={() => setMenu(false)}
              />
            )}
          </>
        ) : (
          <div
            id="grid-view-empty"
            className={`${CardStyle} py-[40px] px-[25px] flex flex-col justify-center items-center h-[308px]`}
          >
            <p className="text-xl mb-[36px] text-white font-secondary leading-[32px]">
              ⭐️ Create your first campaign
            </p>
            <Link
              href="/host/campaigns/new"
              className="btn btn-primary border-none h-auto py-[10px] px-4 text-[#003333]"
            >
              {icons.add_16}
              <span className="ml-[6px] text-sm">Draft a new campaign</span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
