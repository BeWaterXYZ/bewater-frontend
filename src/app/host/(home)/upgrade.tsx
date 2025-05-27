import { useEffect, useRef, useState } from "react";

export default function Upgrade() {
  const elRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (elRef.current) {
      const hideUpgradeNotify =
        globalThis.localStorage?.getItem("hideUpgradeNotify") === "1"
          ? true
          : false;
      if (!hideUpgradeNotify) {
        elRef.current.classList.remove("hidden");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elRef.current]);

  return (
    <div
      ref={elRef}
      className="bg-[#25263C] w-[262px] mb-4 ml-2 py-[20px] px-4 rounded-lg font-['Inter'] hidden fixed bottom-0 left-0"
    >
      <p className="font-semibold text-sm text-white mb-2">
        Upgrade to Organization
      </p>
      <p className="text-sm text-[#F1F5F9] mb-5">
        Elevate your hosting experience with our Organization Plan, featuring
        exclusive functions such as teamwork and advanced data analysis.
        Streamline your hosting operations, enhance efficiency, and maintain
        control over your data.
      </p>
      <div>
        <button
          className="font-semibold text-sm text-[#F1F5F9] mr-3"
          onClick={() => {
            elRef.current?.classList.add("hidden");
            globalThis.localStorage?.setItem("hideUpgradeNotify", "1");
          }}
        >
          Dismiss
        </button>
        <button className="font-semibold text-sm text-[#00FFFF]">
          <a href="mailto:support@bewater.pro">Contact us</a>
        </button>
      </div>
    </div>
  );
}
