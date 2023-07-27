"use client";
import { useLoadingWhen } from "@/components/loading/store";
import { useFetchChallenges } from "@/services/challenge.query";
import { Challenge } from "@/services/types";
import { unsplash } from "@/utils/unsplash";
import { CaretRightIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

function TodoLink({
  // challenge,
  copy,
  link,
}: {
  // challenge: Challenge;
  copy: string;
  link: string;
}) {
  return (
    <Link
      href={link}
      className="mt-2 w-full text-sm text-white flex justify-between items-center bg-[#0B0C24] rounded-md border border-[#474ABD] p-4"
    >
      <div>{copy}</div>
      <div>
        <CaretRightIcon />
      </div>
    </Link>
  );
}

function Todo({ challenge }: { challenge: Challenge }) {
  let todos = [];
  if (!challenge.bannerUrl || !challenge.hostIcon) {
    todos.push(
      <TodoLink
        key={"banner"}
        copy="Add banner or host image"
        link={`/challenges/${challenge.id}#section-banner`}
      />
    );
  }
  if (!challenge.milestones) {
    todos.push(
      <TodoLink
        key={"milestones"}
        copy="Add milestones"
        link={`/challenges/${challenge.id}#section-milestones`}
      />
    );
  }
  if (!challenge.awardAssorts) {
    todos.push(
      <TodoLink
        key={"awards"}
        copy="Add Awards"
        link={`/challenges/${challenge.id}#section-awards`}
      />
    );
  }
  if (!challenge.judges || challenge.judges.length === 0) {
    todos.push(
      <TodoLink
        key={"judge"}
        copy="Add Judges"
        link={`/challenges/${challenge.id}#section-judges`}
      />
    );
  }
  if (!challenge.requirements || !challenge.reviewDimension) {
    todos.push(
      <TodoLink
        key={"requirements"}
        copy="Add Requirements"
        link={`/challenges/${challenge.id}#section-requirements`}
      />
    );
  }
  if (!challenge.sponsors || challenge.sponsors.length === 0) {
    todos.push(
      <TodoLink
        key={"sponsors"}
        copy="Add Sponsors"
        link={`/challenges/${challenge.id}#section-sponsors`}
      />
    );
  }
  if (todos.length === 0) {
    return null;
  }

  return (
    <div className="">
      <p className="text-base font-bold text-grey-600 mb-4">
        {challenge.title}
      </p>
      {todos}
    </div>
  );
}

function ChallengeStatusButton({ challenge }: { challenge: Challenge }) {
  return (
    <button
      className={clsx("btn rounded flex gap-2 border", {
        "bg-grey-500/10 border-grey-500/20 text-grey-500":
          challenge.status === "DRAFT",
        "bg-yellow-500/10 border-yellow-500/20 text-yellow-500":
          challenge.status === "INREVIEW",
      })}
    >
      <div
        className={clsx("w-3 h-3 rounded-full border-[0.5px]", {
          "bg-yellow-500/30 border-yellow-600": challenge.status === "INREVIEW",
          "bg-grey-500/30 border-grey-600": challenge.status === "DRAFT",
        })}
      ></div>
      {challenge.status === "DRAFT"
        ? "In Draft"
        : challenge.status === "INREVIEW"
        ? "In Review"
        : challenge.status}
    </button>
  );
}

export function Dashboard() {
  let { data: challenges, isLoading } = useFetchChallenges();
  useLoadingWhen(isLoading);
  if (!challenges) return;
  return (
    <div className="w-full grid  md:grid-cols-[2fr,_1fr] gap-16">
      <div>
        {/* <div className="h-16">filters</div> */}
        <div>
          {challenges.map((challenge) => {
            return (
              <Link
                href={`/challenges/${challenge.id}`}
                className="flex border-b border-grey-800 py-8 px-4 justify-between"
                key={challenge.id}
              >
                <div className="flex gap-4 items-center">
                  <Image
                    src={challenge.bannerUrl ?? unsplash("host")}
                    // fill
                    alt={challenge.title}
                    width={60}
                    height={60}
                    className="rounded-full border border-grey-800 w-[60px] h-[60px]"
                  />
                  <div className="space-y-2">
                    <p className="text-base font-bold text-white">
                      {challenge.title}
                    </p>
                    <p className="text-sm text-grey-500">
                      {/* fixme */}
                      {challenge.startTime.substring(0, 10)} {"-> "}
                      {challenge.endTime.substring(0, 10)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <ChallengeStatusButton challenge={challenge} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div>
        <div className="w-full flex justify-end mb-14">
          <Link href="/challenges/new" className="btn btn-primary">
            + Draft a new campaign
          </Link>
        </div>
        {challenges.length > 0 ? (
          <div className="space-y-8">
            <p className="text-2xl text-white">CHECKLIST</p>

            {challenges.map((c) => {
              return <Todo key={c.id} challenge={c}></Todo>;
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}