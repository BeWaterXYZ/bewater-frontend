"use client";

import * as Tabs from "@radix-ui/react-tabs";

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
export function Agenda() {
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
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
