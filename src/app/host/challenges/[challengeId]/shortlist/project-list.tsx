"use client";
import * as XLSX from "xlsx";
import { format } from 'date-fns';
import { useUser } from "@clerk/nextjs";
import { Project } from "@/services/types";
import Markdown from '@/components/markdown';
import { useState } from 'react';
import { pushShortlist, popShortlist } from '@/services/project.query';
import { openSaveDialog, workbook2Blob } from "@/utils/saver";
import { useLoadingWhen } from "@/components/loading/store";
import { teamMemInfo } from "./utils";

export function ProjectList({ challengeId, projects }: {
  challengeId: string;
  projects: Project[];
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  let [projects_, upProjects] =  useState(projects);

  useLoadingWhen(!isLoaded);

  if (!isLoaded) {
    return null;
  }

  const isAdmin = isSignedIn && user?.publicMetadata?.teamMember;

  const pickup = (project: Project) => () => {
    if (project.promoted) {
      popShortlist(project.id).then((res) => {
        if (res.status === 200) {
          for (const it of projects_) {
            if (it.id === project.id) {
              it.promoted = false;
              upProjects(JSON.parse(JSON.stringify(projects_)));
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
              upProjects(JSON.parse(JSON.stringify(projects_)));
              break;
            }
          }
        }
      });
    }
  };

  const excelOut = () => {
    let sheetTeam: any = [];
    for (const it of projects_) {
      if (!it.promoted) {
        continue;
      }
      const teamMem = teamMemInfo(it.team.teamMembers);
      const obj = {
        序号: -1,
        队名: it.team.name,
        队伍国别: it.team.nation,
        项目名称: it.name,
        赛道: it?.tags.join(',') ?? '',
        队长邮箱: teamMem.email,
        队长昵称: teamMem.userName,
        队长TG: teamMem.tg,
        队长钱包: teamMem.walletAddress,
        Demo地址: it.demoURI ?? '',
        Deck地址: it.deckURI ?? '',
        GitHub地址: it.githubURI ?? '',
        MediaURLs: it.mediaURLs?.join(',') ?? '',
        视频地址: it.videoURI ?? '',
        所有队员邮箱: teamMem.all.join('\n'),
        所有队员TG: teamMem.tgAll.join('\n'),
      };
      sheetTeam.push(obj);
    }
    sheetTeam.sort((a: any, b: any) => {
      return a['队名'].toLowerCase() > b['队名'].toLowerCase() ? 1 : -1;
    })
    {
      let i = 0;
      for (const it of sheetTeam) {
        it['序号'] = ++i;
      }
    }
    sheetTeam = XLSX.utils.json_to_sheet(sheetTeam);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheetTeam, 'Team与Project信息');
    const workbookBlob = workbook2Blob(wb);
    openSaveDialog(
      workbookBlob,
      `${format(new Date(), 'yyyy-MM-dd HH-mm')}[${
        challengeId
      }]初筛team和project信息统计.xlsx`
    );
  };

  return (
    <>
    {!isAdmin ? (
      <div className="max-w-[calc(100vw-150px)] grid gap-4 font-bold text-white/90 text-base mx-2 mt-2">
        <p>{`${!isSignedIn ? '请先登录' : '请联系管理员索要权限'}`}</p>
      </div>
    ) : (
      <>
        <div className="max-w-[calc(100vw-150px)] grid gap-4 font-bold text-white/90 text-base mx-2 mt-2">
          {projects_.map((it) => {
            return (
              <div key={it.id} className="">
                <p>{`${it.promoted ? '✅' : ''}${it.name}`}
                  <span className="text-[12px]">（{it.id}）</span>
                  <span className="inline-block">{"    "}</span>
                  <span className="text-[14px] cursor-pointer border border-grey-300 px-2 inline-block"
                    onClick={pickup(it)}
                  >{`${it.promoted ? '去除筛选' : '筛选'}`}</span>
                </p>
                <Markdown style={{ fontSize: '12px' }}>{`<details><summary>项目详情</summary>${it.description ?? ''
                  }</details><details><summary>队伍信息</summary>${it.team.name} ${it.team.nation}</details>`}</Markdown>
              </div>
            );
          })}
        </div>
        <div className="fixed top-[10px] right-[0px] max-w-[150px] grid gap-4 font-bold text-white/90 text-base mx-2">
          <p className="text-[14px] text-day cursor-pointer border border-grey-300 px-2 inline-block"
            onClick={excelOut}
          >导出筛选项目</p>
        </div>
      </>
    )}
    </>
  );
}
