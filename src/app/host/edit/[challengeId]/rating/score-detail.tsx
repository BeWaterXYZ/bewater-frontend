"use client";
import { Aspect } from "@/components/aspect";
import { Avatar } from "@/components/avatar/avatar";
import { Challenge, Project } from "@/services/types";
import { unsplash } from "@/utils/unsplash";
import * as Dialog from "@radix-ui/react-dialog";
import { CaretRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function ScoreDetail({
  challenge,
  project,
}: {
  challenge: Challenge;
  project: Project;
}) {
  let [open, openSet] = useState(false);

  const closeIcon = (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.583333"
        y="0.583333"
        width="26.8333"
        height="26.8333"
        rx="13.4167"
        fill="#141527"
      />
      <rect
        x="0.583333"
        y="0.583333"
        width="26.8333"
        height="26.8333"
        rx="13.4167"
        stroke="#334155"
        strokeWidth="1.16667"
      />
      <path
        d="M17.0625 10.9375L10.9375 17.0625"
        stroke="#E2E8F0"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.9375 10.9375L17.0625 17.0625"
        stroke="#E2E8F0"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <Dialog.Root open={open} onOpenChange={(open) => openSet(open)}>
      <Dialog.Trigger asChild>
        <div className="p-4 bg-[#1A1C40] border-[1px] border-[#1F2937] rounded flex justify-between items-center mt-[10px] cursor-pointer">
          <div className="flex-1">
            <p className="font-secondary text-sm font-bold mb-2">
              {project.name}
            </p>
            <div className="flex gap-2 items-center">
              <p className="body-4 text-grey-300">{project.team.name}</p>
              {project.tags.map((t) => {
                return (
                  <div
                    key={t}
                    className="text-grey-300 body-5 px-1 rounded border uppercase"
                  >
                    {t}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-1 justify-between items-center">
            <div>
              <p className="text-grey-300 body-4">
                {project.projectScore.length === challenge.reviewers.length
                  ? "All Judges done"
                  : `${project.projectScore.length}/${challenge.reviewers.length} judges done`}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <p className="font-secondary font-bold text-xs text-grey-500 text-right">
                  Score
                </p>
                <p className="text-day body-1 text-right">
                  {project.projectScore.length > 0
                    ? `${
                        project.projectScore
                          .flatMap((s) => s.mark)
                          .reduce((partialSum, a) => partialSum + a, 0) /
                        project.projectScore.length
                      }/${(challenge.scoreDimension ?? []).length * 10}`
                    : "--"}
                </p>
              </div>
              <CaretRightIcon className="scale-[1.333] text-[#94A3B8]" />
            </div>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 z-20 fixed inset-0" />
        <Dialog.Content className="z-30 bg-[#141527] outline-none fixed top-0 right-0 h-full w-full md:w-[1000px] p-8 overflow-y-auto">
          <Dialog.Close className="absolute top-[10px] right-[10px] outline-none">
            {closeIcon}
          </Dialog.Close>
          <Dialog.Title className="font-secondary text-xl leading-8 text-white py-4 mb-4 border-b border-b-white/20">
            Score - {project.name}
          </Dialog.Title>
          <div className="flex flex-wrap rounded border border-[#24254E] my-8">
            <div className="w-full lg:w-[400px]">
              <div className="hidden lg:block h-full relative">
                <Image
                  width={450}
                  height={300}
                  src={project?.mediaURLs?.[0] ?? unsplash("conference")}
                  alt={project.name}
                  className="object-cover block h-full absolute w-full top-0 left-0"
                />
              </div>
            </div>
            <div className="flex-1 p-7">
              <div className="flex justify-between ">
                <p className="heading-6 ">{project.name}</p>
              </div>

              <div className="body-3 text-grey-300 my-3">
                {project.description.split("\n").map((s, i) => (
                  <p key={i} className="py-2">
                    {s}
                  </p>
                ))}
              </div>

              <div className="flex justify-between">
                <p className="body-3 text-grey-500 my-3">{project.team.name}</p>

                <Link
                  href={`/campaigns/${challenge.id}/projects/${project.id}`}
                  className="btn btn-secondary-invert"
                >
                  Visit
                </Link>
              </div>
            </div>
          </div>
          <p className="body-2">Score Detail</p>

          <table className="w-full body-3">
            <thead>
              <tr>
                <th></th>
                {(challenge.scoreDimension ?? []).map((d) => {
                  return (
                    <th
                      key={d.text}
                      className="body-4 text-grey-600 truncate max-w-[150px] text-left  p-2"
                    >
                      {d.text}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {challenge.reviewers.map((r) => {
                let m = project.projectScore.find(
                  (s) => s.reviewerId === r.userId
                );
                return (
                  <tr key={r.userId} className="">
                    <th>
                      <div className="flex gap-2 items-center">
                        <Avatar
                          className="w-8 h-8 m-2"
                          src={r.avatarURI}
                        ></Avatar>
                        <p className="body-3 text-grey-300">
                          {r.fullName || r.userName || r.firstName}
                        </p>
                      </div>
                    </th>
                    {(
                      m?.mark ??
                      new Array(challenge.scoreDimension.length).fill("--")
                    ).map((mark, i) => {
                      return (
                        <td key={i} className=" body-3">
                          <div className="flex p-2">{mark}</div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}

              <tr>
                <th className="text-grey-300 border-t border-t-grey-600">
                  Average
                </th>
                {(challenge.scoreDimension ?? []).map((d, i) => {
                  let score =
                    project.projectScore
                      .map((s) => s.mark[i])
                      .reduce((acc, c) => acc + c, 0) /
                    project.projectScore.length;
                  return (
                    <td key={i} className="border-t border-t-grey-600">
                      <div className="flex p-2">
                        {isNaN(score) ? "--" : score}
                      </div>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
