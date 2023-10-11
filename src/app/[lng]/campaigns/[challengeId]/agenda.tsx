"use client";

import { Challenge } from "@/services/types";
import * as Tabs from "@radix-ui/react-tabs";
import clsx from "clsx";

let data = [
  {
    label: "Day1",
    time: "22 OCT, GMT+8",
    locations: [
      {
        location: "Room1",
        sessions: [
          { time: "Morning", topic: "Opening Ceremony & Talks" },
          { time: "Afternoon", topic: "Workshops" },
        ],
      },
      {
        location: "Room2",
        sessions: [
          { time: "Morning", topic: "Joint Session with Room1" },
          { time: "Afternoon", topic: "Panel & Talks" },
        ],
      },
    ],
  },
  {
    label: "Day2",
    time: "23 OCT, GMT+8",
    locations: [
      {
        location: "Room1",
        sessions: [
          { time: "Morning", topic: "Workshops" },
          { time: "Afternoon", topic: "Workshops" },
        ],
      },
      {
        location: "Room2",
        sessions: [
          { time: "Morning", topic: "Panel & Talks" },
          { time: "Afternoon", topic: "Panel & Talks" },
        ],
      },
    ],
  },
  {
    label: "Day3",
    time: "24 OCT, GMT+8",
    locations: [
      {
        location: "Room1",
        sessions: [
          { time: "Morning", topic: "Workshops" },
          { time: "Afternoon", topic: "Workshops" },
        ],
      },
      {
        location: "Room2",
        sessions: [
          { time: "Morning", topic: "Demo Day" },
          { time: "Afternoon", topic: "Demo Day" },
        ],
      },
    ],
  },
];
let data61 = [
  {
    label: "Fri, Oct 13",
    time: "",
    locations: [
      {
        location: "",
        sessions: [
          { time: "12:00 AM", topic: "Check-in starts" },
          { time: "06:00 PM", topic: "Dinner" },
          { time: "07:00 PM", topic: "Project introduction (2 minutes for each team)" },
          { time: "12:00 PM", topic: "Check-in ends" },
        ],
      },

    ],
  },
  {
    label:  "Sat, Oct 14 - Sun, Oct 15",
    time: "",
    locations: [
      {
        location: "",
        sessions: [
          { time: "All Day", topic: "Project Buidl" },
          { time: "12:00 AM", topic: "Lunch" },
          { time: "01:00 PM", topic: "Workshop" },
          { time: "06:00 PM", topic: "Dinner" },
          { time: "07:00 PM", topic: "Project progress report" },
        ],
      },

    ],
  },
  {
    label: "Mon, Oct 16",
    time: "",
    locations: [
      {
        location: "",
        sessions: [
          { time: "All Day", topic: "Project Buidl" },
          { time: "12:00 AM", topic: "Lunch" },
          { time: "02:00 PM", topic: "Project submission & First round of judging" },
          { time: "06:00 PM", topic: "Dinner" },
          { time: "07:00 PM", topic: "Demo Day (5 minutes for each project in the top 5 of each track)" },
          { time: "09:00 PM", topic: "After Party" },
        ],
      },

    ],
  },
];

let data71 = [
  {
    label: "10月14日",
    time: "",
    locations: [
      {
        location: "",
        sessions: [
          { time: "13:30", topic: "签到" },
          { time: "14:00", topic: "主持人开场" },
          { time: "14:05", topic: "主办方致辞: Starbase" },
          { time: "14:25", topic: "在Telegram中做去中心化小程序" },
          { time: "14:40", topic: "Q&A" },
          { time: "14:50", topic: "圆桌" },
          { time: "15:40", topic: "5 * 8握手会: 初创企业Keynote" },
          { time: "16:50", topic: "自由交流（茶歇）" },
        ],
      },

    ],
  },
];

function getData(challenge: Challenge) {
  // console.log(challenge);
  if(challenge.id === '61'){
    return data61;
  }
  if(challenge.id === '71') {
    return data71;
  }
  return null;
}
interface Props {
  challenge: Challenge;
}
export function Agenda(props: Props) {
  const data = getData(props.challenge);
  if (!data) return null;
  return (
    <div className="text-white body-1">
      <p className="heading-4 text-center py-12">Agenda</p>
      <Tabs.Root className="w-full" defaultValue="tab0">
        <Tabs.List className="w-full flex" aria-label="agenda">
          {data.map((d, index) => (
            <Tabs.Trigger
              key={index}
              className="border border-gray-800 flex-1 heading-6 py-5 data-[state=active]:bg-gray-900"
              value={"tab" + index}
            >
              {d.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {data.map((d, index) => (
          <Tabs.Content
            key={index}
            className="border border-gray-800 p-6"
            value={"tab" + index}
          >
            <p className="body-2">{d.time}</p>
            <div className={clsx("grid grid-cols-1  gap-4 ", d.locations.length>1 ? "md:grid-cols-2":"md:grid-cols-1" )}>
              {d.locations.map((l, index) => {
                return (
                  <div className="py-4" key={index}>
                    <p className="text-day">{l.location}</p>
                    {l.sessions.map((s, i) => {
                      return (
                        <div
                          className="flex flex-wrap items-center gap-4 py-3"
                          key={i}
                        >
                          <div className="p-3 w-40 text-center border border-gray-600 rounded-full">
                            {s.time}
                          </div>
                          <div>{s.topic}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </Tabs.Content>
        ))}
      </Tabs.Root>
    </div>
  );
}
