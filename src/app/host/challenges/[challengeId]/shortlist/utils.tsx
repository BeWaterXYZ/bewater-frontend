export function teamMemInfo(teamMembers: any) {
  const res: any = {
    email: '', // 队长邮箱
    walletAddress: '', // 队长钱包
    tg: '', // 队长TG
    all: [],
    tgAll: [],
  };

  for (const it of teamMembers) {
    if (it.isLeader) {
      res.email = it.userProfile.email;
      res.userName = it.userProfile.userName ?? '';
      res.walletAddress = it.userProfile.walletAddress;
      res.tg = it.userProfile.telegramLink ?? '';
    }
    res.all.push(it.userProfile.email);
    if (it.userProfile.telegramLink) {
      res.tgAll.push(it.userProfile.telegramLink);
    }
  }
  return res;
}
