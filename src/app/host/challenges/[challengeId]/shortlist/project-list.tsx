"use client";
import { useUser } from "@clerk/nextjs";
import { Project } from "@/services/types";
import Markdown from '@/components/markdown';
import { useState } from 'react';
import { pushShortlist, popShortlist } from '@/services/project.query';

export function ProjectList({ challengeId, projects }: {
  challengeId: string;
  projects: Project[];
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const isAdmin = isLoaded && isSignedIn && user?.publicMetadata?.teamMember;

  const  [projects_, setProjects] =  useState(projects);

  const pickup = (project: Project) => () => {
    if (project.promoted) {
      popShortlist(project.id).then((res) => {
        if (res.status === 200) {
          for (const it of projects_) {
            if (it.id === project.id) {
              it.promoted = false;
              setProjects(JSON.parse(JSON.stringify(projects_)));
              break;
            }
          }
        }
      });
    } else {
      pushShortlist(challengeId, project.id).then((res) => {
        if (res.status === 200) {
          for (const it of projects_) {
            if (it.id === project.id) {
              it.promoted = true;
              setProjects(JSON.parse(JSON.stringify(projects_)));
              break;
            }
          }
        }
      });
    }
  };

  return (
    <>
    {!isAdmin ? null : (
      <div className="w-full grid gap-4 font-bold text-white/90 text-base mx-4">
        {projects_.map((it) => {
          return (
            <div key={it.id} className="">
              <p>{`${it.promoted ? '✅' : ''}${it.name}`}
                <span className="text-[12px]">（{it.id}）</span>
                <span>{"    "}</span>
                <span className="text-[14px] cursor-pointer border border-grey-300 px-2"
                  onClick={pickup(it)}
                >{`${it.promoted ? '去除筛选' : '筛选'}`}</span>
              </p>
              <Markdown style={{ fontSize: '12px' }}>{`<details><summary>项目详情</summary>${it.description ?? ''
                }</details><details><summary>队伍信息</summary>${it.team.name} ${it.team.nation}</details>`}</Markdown>
            </div>
          );
        })}
      </div>
    )}
    </>
  );
}
