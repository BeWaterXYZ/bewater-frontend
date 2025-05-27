import { Challenge, Milestone } from "@/services/types";
// import { format, parseISO, subDays, addDays } from "date-fns";
const YYYYMMDD = "yyyy-MM-dd";
const bewaterLogo = "https://build.bewater.pro/sponsors/bewater.png";
import { defMilestoneArr as defValArr } from "@/utils/default";

export function mock(challenge: Challenge) {
  let c = { ...challenge };

  if (!c.description) {
    c.description = "";
  }

  if (!c.sponsors) {
    c.sponsors = [
      {
        defname: "Sponsors Examples",
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
    c.awardAssorts = [];
  }

  if (!c.keySponsors) {
    c.keySponsors = [bewaterLogo];
  }

  if (!c.requirements) {
    c.requirements = "Please describe the requirements for this campaign";
  }

  if (!c.reviewDimension) {
    c.reviewDimension = "Please describe the criteria for this campaign";
  }

  return c;
}
