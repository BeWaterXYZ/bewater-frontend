import { SocialAuth, TeamMember } from "@/services/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getSocialConnectLink(con: SocialAuth) {
  if (con.platform.toLowerCase() === "github")
    return `https://github.com/${con.handle}`;
  if (con.platform.toLowerCase() === "figma")
    return `https://figma.com/@${con.handle}`;
  return "";
}

export const formatDate = (dateString?: string) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date
    .toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "/");
};

export const calculateMostPlayedRole = (teamMembers: TeamMember[] = []) => {
  if (!teamMembers.length) return 'N/A';

  
  
  const roleCount: Record<string, number> = {};
  
  
  for (const tm of teamMembers) {
    // console.log('Team Member:', tm);
    // 只有当 role 存在且不为空时才计数
    if (tm.teamRole && typeof tm.teamRole === 'string' && tm.team?.challenge?.title !== 'General') {
      const role = tm.teamRole;
      // console.log('Role:', role);
      roleCount[role] = (roleCount[role] || 0) + 1;
    }
  }

  // console.log('Role Count:', roleCount);

  let maxCount = 0;
  let mostPlayedRole = 'N/A';
  
  // 找出出现次数最多的角色
  for (const [role, count] of Object.entries(roleCount)) {
    if (count > maxCount) {
      maxCount = count;
      mostPlayedRole = role;
    }
  }

  // 如果没有有效的角色记录，返回 N/A
  if (maxCount === 0) {
    return 'N/A';
  }

  return mostPlayedRole;
};