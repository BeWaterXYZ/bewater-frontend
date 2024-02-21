"use client";

import { useState } from "react";
import { icons } from "./icons";

export const Callout = () => {
  const [callout, setCallout] = useState(
    globalThis.localStorage?.getItem("callout") === "true" ? true : false
  );

  callout
    ? globalThis.localStorage?.setItem("callout", "true")
    : globalThis.localStorage?.setItem("callout", "false");

  return (
    <>
      {callout && (
        <div className="w-full h-[40px] bg-gradient-to-r from-[#F62584] to-[#480CA7] sticky top-0 z-[12] font-secondary text-gray-50 flex items-center">
          <div className="ml-[40px] flex-1 flex justify-center">
            <div className="mr-2">{icons.partyPopper_16}</div>
            <p className="font-bold text-xs">
              <span>Discover groundbreaking insights in the new </span>
              <a href="https://docs.bewater.xyz/zh/aixcrypto/">
                <span className="text-day">AI × Crypto Report</span>
              </a>
            </p>
          </div>
          <div className="p-3">
            <div className="cursor-pointer" onClick={() => setCallout(false)}>
              {icons.close_16}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
