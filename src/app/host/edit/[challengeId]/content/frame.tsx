"use client";
import Page from "@/app/host/challenges/[challengeId]/page";
import { ChallengeID } from "@/services/types";
import clsx from "clsx";
import { use, useEffect, useRef, useState } from "react";

let desktop = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="#94A3B8"
      d="M6.75 22a.75.75 0 01-.102-1.493l.102-.007h1.749v-2.498H4.25a2.25 2.25 0 01-2.245-2.096L2 15.752V5.25a2.25 2.25 0 012.096-2.245L4.25 3h15.499a2.25 2.25 0 012.245 2.095l.005.155v10.502a2.25 2.25 0 01-2.096 2.245l-.154.005h-4.25V20.5h1.751a.75.75 0 01.102 1.493L17.25 22H6.75zm7.248-3.998h-4l.001 2.498h4l-.001-2.498zM19.748 4.5H4.25a.75.75 0 00-.743.648L3.5 5.25v10.502c0 .38.282.693.648.743l.102.007h15.499a.75.75 0 00.743-.648l.007-.102V5.25a.75.75 0 00-.648-.744l-.102-.006z"
    ></path>
  </svg>
);

let mobile = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      fill="#94A3B8"
      d="M15.75 2A2.25 2.25 0 0118 4.25v15.5A2.25 2.25 0 0115.75 22h-7.5A2.25 2.25 0 016 19.75V4.25A2.25 2.25 0 018.25 2h7.5zm0 1.5h-7.5a.75.75 0 00-.75.75v15.5c0 .414.336.75.75.75h7.5a.75.75 0 00.75-.75V4.25a.75.75 0 00-.75-.75zm-2.501 14a.75.75 0 01.002 1.5l-2.5.004a.75.75 0 01-.002-1.5l2.5-.004z"
    ></path>
  </svg>
);

let fullscreen = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
  >
    <path
      stroke="#94A3B8"
      strokeWidth="1.5"
      d="M18.25 5.75L13.5 10.5M5.75 18.25l4.75-4.75M14 5.75h4.25V10M10 18.25H5.75V14"
    ></path>
  </svg>
);

export function Frame({ challengeId }: { challengeId: ChallengeID }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<"desktop" | "mobile" | "fullscreen">(
    "desktop"
  );
  const [frameWidth, setFrameWidth] = useState(0);
  useEffect(() => {
    if (frameRef.current) {
      setFrameWidth(frameRef.current.offsetWidth);
    }
    window.addEventListener("resize", () => {
      if (frameRef.current) {
        setFrameWidth(frameRef.current.offsetWidth);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameRef.current]);

  return (
    <div
      className={clsx("overflow-hidden", {
        "border-[1px] border-grey-800 rounded-lg my-4 mr-4":
          mode !== "fullscreen",
        "fixed w-full h-full top-0 left-0 m-0": mode === "fullscreen",
      })}
    >
      <div className="bg-[#25263C] flex justify-end gap-2">
        <div className="flex p-3 gap-2">
          {mode === "desktop" ? (
            <div
              onClick={() => {
                setMode("mobile");
              }}
            >
              {mobile}
            </div>
          ) : (
            <div
              onClick={() => {
                setMode("desktop");
              }}
            >
              {desktop}
            </div>
          )}
          <div
            onClick={() => {
              setMode(mode === "fullscreen" ? "desktop" : "fullscreen");
            }}
          >
            {fullscreen}
          </div>
        </div>
      </div>
      <div
        id="frame"
        className="flex flex-row justify-center overflow-y-auto bg-[#25263C33]"
        style={{ scrollbarColor: "#FFFFFF33 #25263C", scrollbarWidth: "thin" }}
        ref={frameRef}
      >
        <div
          className={clsx("", {
            "max-h-[calc(100vh-138px)]": mode === "desktop",
            "max-h-[calc(100vh-138px)] w-[480px]": mode === "mobile",
            "max-h-[calc(100vh-48px)] flex-1": mode === "fullscreen",
          })}
        >
          <Page
            params={{ challengeId: challengeId }}
            mode={mode}
            frameWidth={frameWidth}
          />
        </div>
      </div>
    </div>
  );
}
