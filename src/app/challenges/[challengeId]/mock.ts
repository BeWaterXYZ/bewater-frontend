"use client";
import { Challenge } from "@/services/types";
import { unsplash } from "@/utils/unsplash";
import { format, parseISO, subDays, addDays } from "date-fns";
const YYYYMMDD = "yyyy-MM-dd";
export function mock(challenge: Challenge) {
  let c = { ...challenge };
  if (!c.sponsors) {
    c.sponsors = [
      {
        defname: "golden sponsors",
        members: ["https://build.bewater.xyz/sponsors/bewater.png"],
      },
    ];
  }

  if (!c.milestones) {
    let startDate = parseISO(challenge.startTime);
    let endDate = parseISO(challenge.endTime);

    console.log(format(parseISO(challenge.startTime), YYYYMMDD));
    console.log(format(parseISO(challenge.endTime), YYYYMMDD));
    console.log(format(subDays(endDate, 1), YYYYMMDD));

    c.milestones = [
      {
        dueDate: format(startDate, YYYYMMDD),
        stageName: "Preparation",
      },
      {
        dueDate: format(addDays(startDate, 1), YYYYMMDD),

        stageName: "Teaming",
      },
      {
        dueDate: format(subDays(endDate, 2), YYYYMMDD),

        stageName: "Project Submission",
      },
      {
        dueDate: format(subDays(endDate, 1), YYYYMMDD),
        stageName: "Review",
      },
      {
        dueDate: format(endDate, YYYYMMDD),
        stageName: "Result",
      },
    ];
  }
  if (!c.judges || c.judges.length === 0) {
    c.judges = [
      {
        name: "John Smith",
        title: "BeFire CEO",
        avatarURI: unsplash("men"),
        id: undefined,
      },
    ];
  }
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

  return c;
}
