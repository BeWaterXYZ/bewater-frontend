"use client";
import * as XLSX from "xlsx";
import { format } from 'date-fns';
import { useUser } from "@clerk/nextjs";
import { Project, ProjectStatus } from "@/services/types";
import Markdown from '@/components/markdown';
import { useState } from 'react';
import clsx from 'clsx';
import { resetProjectStatus } from '@/services/project.query';
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

  const handleChange = (project: Project) => (ev: any) => {
    project.status = ev.target.value as ProjectStatus;
  }

  const pickup = (project: Project) => () => {
    resetProjectStatus(project.id, project.status).then((res) => {
      if (res.status === 201 || res.status === 200) {
        upProjects(JSON.parse(JSON.stringify(projects_)));
      }
    });
  };

  const excelOut = (promoted: boolean) => () => {
    let sheetTeam: any = [];
    let sheetMem: any = [];

    for (const it of projects_) {
      if (promoted) {
        if (it.status !== 'SELECTED' as ProjectStatus) {
          continue;
        }
      }
      const teamMem = teamMemInfo(it.team.teamMembers);
      const obj = {
        序号: -1,
        项目名称: it.name,
        赛道: it?.tags.join(',') ?? '',
        Demo地址: it.demoURI ?? '',
        Deck地址: it.deckURI ?? '',
        GitHub地址: it.githubURI ?? '',
        MediaURLs: it.mediaURLs?.join(',') ?? '',
        视频地址: it.videoURI ?? '',
        筛选状态: it.status,
        队名: it.team.name,
        队伍国别: it.team.nation,
        队长邮箱: teamMem.email,
        队长昵称: teamMem.userName,
        队长TG: teamMem.tg,
        队长钱包: teamMem.walletAddress,
        所有队员邮箱: teamMem.all.join('\n'),
        所有队员TG: teamMem.tgAll.join('\n'),
      };
      sheetTeam.push(obj);
      sheetMem = sheetMem.concat(teamMem.all);
    }

    sheetTeam.sort((a: any, b: any) => {
      return a['项目名称'].toLowerCase() > b['项目名称'].toLowerCase() ? 1 : -1;
    })

    sheetMem.sort((a: any, b: any) => {
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1
    })

    {
      let i = 0;
      for (const it of sheetTeam) {
        it['序号'] = ++i;
      }
    }

    sheetTeam = XLSX.utils.json_to_sheet(sheetTeam);
    sheetMem = XLSX.utils.json_to_sheet([
      {
        所有参赛成员邮箱: sheetMem.join('\n'),
      },
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheetTeam, 'Team与Project信息');
    XLSX.utils.book_append_sheet(wb, sheetMem, '成员邮箱')
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
      <div className="max-w-[calc(100vw-150px)] min-h-[calc(100vh-80px)] grid gap-4 font-bold text-white/90 text-base mx-2 mt-2 justify-center items-center">
        <p>{`${!isSignedIn ? '请先登录' : '请联系管理员索要权限'}`}</p>
      </div>
    ) : projects_.length > 0 ? (
      <>
        <div className="max-w-[calc(100vw-150px)] min-h-[calc(100vh-80px)] grid gap-4 font-bold text-white/90 text-base mx-2 mt-2">
          <div>
            <p>{'[项目名称]'}
              <span className="text-[12px]">[（项目 id）]</span>
            </p>
          </div>
          {projects_.map((it, i: number) => {
            return (
              <div key={it.id} className="">
                <p>
                  <span>{`${it.status === ('SELECTED' as ProjectStatus) ? '✅' : (
                    it.status === ('REJECTED' as ProjectStatus) ? '❌' : ''
                  )}${it.name}`}</span>
                  <span className="text-[12px]">（{it.id}）</span>
                  <select defaultValue={it.status}
                    onChange={handleChange(it)}
                    className="bg-[#0F1021] text-white text-[14px] border border-midnight font-normal">
                    <option value="INITIATED">INITIATED</option>
                    <option value="SELECTED">SELECTED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                  <span style={{whiteSpace:"pre"}}>{' '}</span>
                  <span className={clsx('text-[14px] cursor-pointer border border-grey-300 px-2 inline-block', {
                    ['text-day']: true,
                  })}
                    onClick={pickup(it)}
                  >设置</span>
                </p>
                <Markdown style={{ fontSize: '12px' }}>{`<details><summary>项目描述</summary>${it.description ?? ''
                  }</details><details><summary>队伍信息</summary>${it.team.name} ${it.team.nation}</details>`}</Markdown>
              </div>
            );
          })}
        </div>
        <div className="fixed top-[10px] right-[0px] max-w-[150px] grid gap-4 font-bold text-white/90 text-base mx-2">
          <p className="text-[14px] text-white/90 px-2 inline-block">
            {`项目总数：${projects_.length}`}
          </p>
          <p className="text-[14px] text-day cursor-pointer border border-grey-300 px-2 inline-block"
            onClick={excelOut(true)}
          >导出筛选项目</p>
          <p className="text-[14px] text-day cursor-pointer border border-grey-300 px-2 inline-block"
            onClick={excelOut(false)}
          >导出所有项目</p>
        </div>
      </>
    ) : (
      <div className="max-w-[calc(100vw-150px)] min-h-[calc(100vh-80px)] grid gap-4 font-bold text-white/90 text-base mx-2 mt-2 justify-center items-center">
        <p>没有项目数据</p>
      </div>
    ) }
    </>
  );
}
