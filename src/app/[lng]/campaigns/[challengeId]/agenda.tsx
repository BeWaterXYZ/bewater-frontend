"use client";
import { Challenge } from "@/services/types";
import * as Tabs from "@radix-ui/react-tabs";
import clsx from "clsx";

interface Props {
  challenge: Challenge;
}
export function Agenda(props: Props) {
  const { agenda } = props.challenge;
  if (!agenda || agenda.length == 0) return null;
  return (
    <div className="container text-white body-1">
      <p className="heading-4 text-center pb-12">Agenda</p>
      <Tabs.Root className="w-full" defaultValue="tab0">
        <Tabs.List className="w-full flex" aria-label="agenda">
          {agenda.map((d, index) => (
            <Tabs.Trigger
              key={index}
              className="border border-gray-800 flex-1 heading-6 py-4 data-[state=active]:bg-gray-900"
              value={"tab" + index}
            >
              {d.label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {agenda.map((d, index) => (
          <Tabs.Content
            key={index}
            className="border border-t-0 border-gray-800 p-6"
            value={"tab" + index}
          >
            <p className="body-2">{d.time}</p>
            <div
              className={clsx(
                "grid grid-cols-1 gap-4 text-base ",
                d.locations.length > 1 ? "lg:grid-cols-2" : "lg:grid-cols-1"
              )}
            >
              {d.locations.map((l, index, lArray) => {
                return (
                  <div className="py-4" key={index}>
                    <p className="text-day font-bold my-2">{l.location}</p>
                    {l.sessions.map((s, i) => {
                      return (
                        <div
                          className={`flex items-center ${lArray.length > 1 ? "gap-4" : "gap-6"} py-3 font-normal`}
                          key={i}
                        >
                          <div className={`p-3 ${lArray.length > 1 ? "min-w-[6rem] w-24" : "min-w-[7.5rem] w-30"} text-center border border-gray-600 rounded-full font-normal`}>
                            {s.time}
                          </div>
                          <div className="">
                            {s.topic}
                            {s.speaker &&
                              <div className="text-xs pt-[6px] flex flex-wrap gap-1">
                                {s.speaker.name &&
                                  <div className="pr-3 font-semibold opacity-75">
                                    {s.speaker.name}
                                  </div>
                                }
                                {s.speaker.title &&
                                  <div className="opacity-50">
                                    {s.speaker.title}
                                  </div>
                                }
                              </div>}
                          </div>
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
