import { Challenge, Milestone } from "@/services/types";
import { format, parseISO, subDays, addDays } from "date-fns";
const YYYYMMDD = "yyyy-MM-dd";
const bewaterLogo = "https://build.bewater.xyz/sponsors/bewater.png";
import { defMilestoneArr as defValArr } from "@/utils/default";

export function mock(challenge: Challenge) {
  let c = { ...challenge };
  if (!c.sponsors) {
    c.sponsors = [
      {
        defname: "golden sponsors",
        members: [bewaterLogo],
      },
    ];
  }

  if (!c.milestones) {
    c.milestones = defValArr as Milestone[];
  }
  // if (!c.judges || c.judges.length === 0) {
  //   c.judges = [
  //     {
  //       name: "John Smith",
  //       title: "BeFire CEO",
  //       avatarURI: unsplash("men"),
  //       id: undefined,
  //     },
  //   ];
  // }
  if (!c.awardAssorts || c.awardAssorts.length === 0) {
    c.awardCurrency = "USD";
    c.totalAward = 6000;
    c.awardAssorts = [
      {
        name: "Award track #1",
        awards: [
          { awardName: "1st award", amount: 3000, count: 1 },
          { awardName: "2nd award", amount: 2000, count: 1 },
          { awardName: "3rd award", amount: 1000, count: 1 },
        ],
      },
    ];
  }
  if (!c.keySponsors) {
    c.keySponsors = [bewaterLogo];
  }
  if (!c.requirements) {
    c.requirements ='Please describe the requirements for this campaign'
  }
  if (!c.reviewDimension) {
    c.reviewDimension ='Please describe the criteria for this campaign'
  }
  return c;
}
