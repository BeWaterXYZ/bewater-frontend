import { boolean } from "zod";

export function teamMemInfo(teamMembers: any) {
  const res: any = {
    email: "", // 队长邮箱
    walletAddress: "", // 队长钱包
    tg: "", // 队长TG
    all: [],
    tgAll: [],
    teamMembers: [],
  };

  for (const it of teamMembers) {
    if (it.isLeader) {
      res.email = it.userProfile.email;
      res.userName = it.userProfile.userName ?? "";
      res.walletAddress = it.userProfile.walletAddress;
      res.tg = it.userProfile.telegramLink ?? "";
    }
    res.all.push(it.userProfile.email);
    if (it.userProfile.telegramLink) {
      res.tgAll.push(it.userProfile.telegramLink);
    }
    res.teamMembers.push({
      userName: it.userProfile.userName ?? "",
      isLeader: it.isLeader,
      roles: it.userProfile.roles.join(),
      skills: it.userProfile.skills.join(),
      gitHubLink: it.userProfile.gitHubLink,
      email: it.userProfile.email,
      telegramLink: it.userProfile.telegramLink,
    });
  }
  return res;
}
