import { agentAuthed } from "./agent";
import { APIResponse } from "@/types/response";
import { Challenge } from "./types";

export interface Activity {
  description: string;
  createdAt: string;
  type: number; // 活动类型信息，用数字表示。目前可取 0，1，2，3，4，5
}

export type CurveData = {
  [time: string]: number;
}[];

export interface OngoingChallenge {
  id: string; // challenge的数据库id
  externalId: string;
  totalAward: number; // 奖金额
  awardCurrency: string; // 奖金货币单位
  title: string;
  bannerUrl: string; // 背景图
  location: string; // 赛事类型
  city: string; // 地点
  hostIcon: string; // 赛事 logo，可能为null或者空字符串
  contestantNum: number; // 本赛事总参与人数
  teamNum: number; // 总队伍个数
  projectNum: number; // 项目个数
  curveData: CurveData; // 曲线图的数组数据
  visitors: number; // 不同用户数
  pageViews: number; // 页面打开数，包含重复
  status: Challenge["status"]; // 这个字段用来判断有没有active的活动。
  timeZone: number;
}

interface Metric {
  current: number;
  previous: number;
}

export interface SummaryData {
  ongoing: OngoingChallenge[];
  activitys: Activity[];
  totalAwards: Metric;
  totalBuilder: Metric;
  totalProjects: Metric;
  totalVisitors: Metric;
  lastUpdated: string;
}

export async function getSummary() {
  const { data } = await agentAuthed.get<SummaryData>(`/host-utils/summary`);
  return data;
}
