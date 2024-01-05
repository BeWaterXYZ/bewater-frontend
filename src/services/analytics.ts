import { agentAuthed } from "./agent";
import { CurveData } from "./summary";

interface Data {
  name: string;
  num: number;
}

interface ProjectData extends Data {
  id: number;
}

interface MostStarData extends ProjectData {
  githubLink: string;
}

interface RecentlyActiveData extends Omit<MostStarData, "num"> {
  text: string;
  lastUpdated: string;
}

export interface AnalyticsData {
  title: string;
  externalId: string;
  timeZone: number; // 计算用的时区
  interval: "day"; // curveData 的统计间隔，目前固定是day

  lastUpdated: string; // 最后更新时间

  teamNum: number; // 总队伍个数
  visitors: number; // 本活动不同用户访问量
  pageViews: number; // 本活动页面打开量，重复打开计算在内
  curveData: CurveData;

  topProjects: ProjectData[];
  topReferers: Data[];
  tags: Data[];
  locations: Data[];
  browsers: Data[];
  githubRepo: {
    mostStar: MostStarData[];
    recentlyActive: RecentlyActiveData[];
  };
}

export async function getAnalyticsData(challengeId: number) {
  const { data } = await agentAuthed.get<AnalyticsData>(
    `/host-utils/${challengeId}/analysis`
  );
  return data;
}
