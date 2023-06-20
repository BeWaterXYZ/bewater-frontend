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
      className="my-2 w-full flex justify-between items-center bg-[#0B0C24] rounded-md border border-[#474ABD] p-4"
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
    <div className="mb-8">
      <p className="text-[16px] text-grey-600 my-4">{challenge.title}</p>
      {todos}
    </div>
  );
}

function ChallengeStatusButton({ challenge }: { challenge: Challenge }) {
  return (
    <button
      className={clsx("btn rounded flex gap-2", {
        "bg-[rgba(100,_116,_139,_0.1)] border-[rgba(100,_116,_139,_0.2)] text-grey-500":
          challenge.status === "DRAFT",
        "bg-[rgba(234,_179,_8,_0.1)] border-[rgba(234,_179,_8,_0.2)] text-[#EAB308]":
          challenge.status === "INREVIEW",
      })}
    >
      <div className={clsx("w-3 h-3 rounded-full",{
        "bg-[rgba(234,_179,_8,_0.1)] border-[rgba(234,_179,_8,_0.2)]":challenge.status === "INREVIEW",
        "bg-[rgba(100,_116,_139,_0.1)] border-[rgba(100,_116,_139,_0.2)]":challenge.status === "DRAFT"

      })}>

      </div>
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
        <div className="h-16">filters</div>
        <div>
          {challenges.map((challenge) => {
            return (
              <Link
                href={`/challenges/${challenge.id}`}
                className="flex  border-b border-grey-800 p-4 justify-between"
                key={challenge.id}
              >
                <div className="flex gap-4">
                  <div className="relative rounded-full overflow-hidden w-[60px] h-[60px]">
                    <Image
                      src={challenge.bannerUrl ?? unsplash("host")}
                      fill
                      alt={challenge.title}
                    />
                  </div>
                  <div>
                    <p className="text-[16px]">{challenge.title}</p>
                    <p className="text-[14px] text-grey-500">
                      {/* fixme */}
                      {challenge.startTime.substring(0, 10)} {"->"}
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
        <div className="w-full flex justify-end h-16">
          <Link href="/challenges/new" className="btn btn-primary">
            + Draft a new campaign
          </Link>
        </div>
        <div>
          <p className="text-[24px] my-4">CHECKLIST</p>

          {challenges.map((c) => {
            return <Todo key={c.id} challenge={c}></Todo>;
          })}
        </div>
      </div>
    </div>
  );
}
