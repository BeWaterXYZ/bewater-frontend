"use client";
import clsx from "clsx";
import * as XLSX from "xlsx";
import { format } from "date-fns";
import { useUser } from "@clerk/nextjs";
import { Project, ProjectStatus } from "@/services/types";
import Markdown from "@/components/markdown";
import { useState } from "react";
import { resetProjectStatus } from "@/services/project.query";
import { openSaveDialog, workbook2Blob } from "@/utils/saver";
import { useLoadingWhen } from "@/components/loading/store";
import { SearchInput } from "@/components/molecules/search-input";
import { teamMemInfo } from "./utils";

export function ProjectList({
  challengeId,
  projects,
  challenge,
}: {
  challengeId: string;
  projects: Project[];
  challenge: any;
}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [projects_, upProjects] = useState(projects);
  const [search, searchSet] = useState("");

  useLoadingWhen(!isLoaded);

  if (!isLoaded) {
    return null;
  }

  // console.log(challenge)
  // console.log(projects)

  const isAdmin = isSignedIn && user?.publicMetadata?.teamMember;

  let projectsFiltered: Project[] = [];

  if (search) {
    for (const it of projects_) {
      if (it.name && it.name.toLowerCase().includes(search.toLowerCase())) {
        projectsFiltered.push(it);
      }
    }
  } else {
    projectsFiltered = projects_;
  }

  function score(prjID: string, reviewerID: string) {
    let obprj: any;
    for (const it of projects) {
      if (it.id === prjID) {
        obprj = it;
        break;
      }
    }
    for (const it of obprj?.projectScore ?? []) {
      if (it.reviewerId === reviewerID) {
        return it.mark.reduce((tot: number, cur: number) => {
          return tot + cur;
        }, 0);
      }
    }
    return -1;
  }

  const handleChange = (project: Project) => (ev: any) => {
    project.status = ev.target.value as ProjectStatus;
    resetProjectStatus(project.id, project.status).then((res) => {
      if (res.status === 201 || res.status === 200) {
        upProjects(JSON.parse(JSON.stringify(projects_)));
      }
    });
  };

  const excelOut = (promoted: boolean) => () => {
    let sheetTeam: any = [];
    let sheetMem: any = [];

    for (const it of projectsFiltered) {
      if (promoted) {
        if (it.status !== ("SELECTED" as ProjectStatus)) {
          continue;
        }
      }
      const teamMem = teamMemInfo(it.team.teamMembers);

      const obj: any = {
        序号: -1,
        项目名称: it.name,
        项目描述: it.description,
        赛道: it?.tags.join(",") ?? "",
        Demo地址: it.demoURI ?? "",
        Deck地址: it.deckURI ?? "",
        GitHub地址: it.githubURI ?? "",
        官网地址: it.siteURI ?? "",
        微信或tg: it.contact ?? "",
        MediaURLs: it.mediaURLs?.join("\n") ?? "",
        视频地址: it.videoURI ?? "",
        筛选状态: it.status,
        队名: it.team.name,
        队员数: it.membersCount,
        队伍国别: it.team.nation,
        队长邮箱: teamMem.email,
        队长昵称: teamMem.userName,
        队长TG: teamMem.tg,
        队长钱包: teamMem.walletAddress,
        所有队员邮箱: teamMem.all.join("\n"),
        // 所有队员TG: teamMem.tgAll.join("\n"),
        是否参加过Hackathon: it.experience ? "是" : "否",
        历史融资奖项: it.pastGrant ?? "",
        何时创建的项目: it.builtDate ?? "",
        推荐自: it.recommendedFrom ?? "",
        是否线下DemoDay: it.offlineDemoDay ? "是" : "否",
      };
      let total = 0;
      let judgeNum = 0;

      for (const item of challenge.reviewers ?? []) {
        let tmpcur = score(it.id, item.id);
        if (tmpcur < 0) {
          obj[item.userName ?? item.firstName ?? item.id!] = "-";
          continue;
        }
        obj[item.userName ?? item.firstName ?? item.id!] = `${tmpcur}`;
        total += tmpcur;
        ++judgeNum;
      }
      obj["平均分"] = judgeNum < 1 ? "-" : (total / judgeNum).toFixed(2);
      sheetTeam.push(obj);

      const members = teamMem.teamMembers.map((member: any) => ({
        队员昵称: member.userName,
        所属项目: it.name,
        所属队伍: it.team.name,
        是否队长: member.isLeader ? "是" : "否",
        队员角色: member.roles,
        队员技能: member.skills,
        队员GitHub: member.githubLink,
        队员邮箱: member.email,
        队员TG: member.telegramLink,
      }));

      sheetMem.push(members);
      sheetMem = sheetMem.flat();
      console.log(sheetMem);
    }

    sheetTeam.sort((a: any, b: any) => {
      return a["项目名称"].toLowerCase() > b["项目名称"].toLowerCase() ? 1 : -1;
    });

    sheetMem.sort((a: any, b: any) => {
      return a["所属项目"].toLowerCase() > b["所属项目"].toLowerCase() ? 1 : -1;
    });

    {
      let i = 0;
      for (const it of sheetTeam) {
        it["序号"] = ++i;
      }
    }

    sheetTeam = XLSX.utils.json_to_sheet(sheetTeam);
    sheetMem = XLSX.utils.json_to_sheet(sheetMem);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheetTeam, "Team与Project信息");
    XLSX.utils.book_append_sheet(wb, sheetMem, "成员列表");
    const workbookBlob = workbook2Blob(wb);
    openSaveDialog(
      workbookBlob,
      `${format(new Date(), "yyyy-MM-dd HH-mm")}[${challengeId}]${
        promoted ? "初筛" : "所有"
      }team和project信息统计.xlsx`
    );
  };

  return (
    <>
      {!isAdmin ? (
        <div className="max-w-[100vw] min-h-[calc(100vh-80px)] grid gap-4 font-bold text-white/60 text-base mx-2 mt-2 justify-center items-center">
          <p>{`${!isSignedIn ? "请先登录" : "请联系管理员索要权限"}`}</p>
        </div>
      ) : projects_.length > 0 ? (
        <>
          <div className="max-w-[calc(100vw-210px)] min-h-[calc(100vh-80px)] grid gap-4 font-bold text-white/60 text-base mx-2 mt-2">
            <div className="pt-4">
              <p className="inline-block">
                {"[项目名称]"}
                <span className="text-[12px]">[（项目 id）]</span>
              </p>
              <div className="inline-block lg:min-w-[300px] ml-5">
                <SearchInput
                  placeholder="Search for project name"
                  value={search}
                  onChange={(e) => searchSet(e.target.value)}
                />
              </div>
            </div>
            {projectsFiltered.map((it, i: number) => {
              return (
                <div key={it.id} className="border-b border-grey-800 pt-4 pb-4">
                  <div className="flex justify-between">
                    <p>
                      <span className="text-white">{`${
                        it.status === ("SELECTED" as ProjectStatus)
                          ? "✅"
                          : it.status === ("REJECTED" as ProjectStatus)
                          ? "❌"
                          : ""
                      } `}</span>
                      <span>{it.name}</span>
                      <span className="text-[12px]">（{it.id}）</span>
                    </p>
                    <div style={{ whiteSpace: "pre" }}>
                      <select
                        defaultValue={it.status}
                        onChange={handleChange(it)}
                        className="bg-[#0F1021] text-white/90 text-[14px] font-normal"
                      >
                        <option value="INITIATED">INITIATED（默认)</option>
                        <option value="REJECTED">REJECTED（排除)</option>
                        <option disabled={true} value="SELECTED">
                          SELECTED（筛选)
                        </option>
                      </select>
                    </div>
                  </div>
                  <Markdown
                    style={{ fontSize: "12px" }}
                  >{`<details><summary>项目描述</summary>${
                    it.description ?? ""
                  }</details><details><summary>队伍信息</summary>${
                    it.team.name
                  }, ${it.team.nation}</details>`}</Markdown>
                </div>
              );
            })}
          </div>
          <div className="fixed top-[10px] right-[5px] max-w-[210px] grid gap-4 font-bold text-white/60 text-base mx-2">
            <p className="text-center text-[14px] text-white/60 px-2 inline-block">
              {`SL：${projectsFiltered.reduce((tot, cur) => {
                return (
                  tot + (cur.status === ("SELECTED" as ProjectStatus) ? 1 : 0)
                );
              }, 0)}；RJ：${projectsFiltered.reduce((tot, cur) => {
                return (
                  tot + (cur.status === ("REJECTED" as ProjectStatus) ? 1 : 0)
                );
              }, 0)}；TL：${projectsFiltered.length}`}
            </p>
            <p
              className="text-center mx-auto text-[14px] cursor-pointer border border-grey-300 px-2 inline-block max-w-[120px]"
              onClick={excelOut(true)}
            >
              导出筛选项目
            </p>
            <p
              className="text-center mx-auto text-[14px] cursor-pointer border border-grey-300 px-2 inline-block max-w-[120px]"
              onClick={excelOut(false)}
            >
              导出所有项目
            </p>
          </div>
        </>
      ) : (
        <div className="max-w-[100vw] min-h-[calc(100vh-80px)] grid gap-4 font-bold text-white/60 text-base mx-2 mt-2 justify-center items-center">
          <p>没有项目数据</p>
        </div>
      )}
    </>
  );
}
