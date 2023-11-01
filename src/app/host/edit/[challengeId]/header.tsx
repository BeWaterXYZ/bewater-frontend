"use client";
import { ChallengeID } from "@/services/types";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { PublishButton } from "./publish-button";
const links = [
  {
    path: 'content',
    label: "Content",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          d="M3 5a1 1 0 011-1h8a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V5zm9 0H4v2h8V5zm-2 4a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1v-1a1 1 0 00-1-1h-2zm0 1h2v1h-2v-1zm-7-.5a.5.5 0 01.5-.5h4a.5.5 0 010 1h-4a.5.5 0 01-.5-.5zm.5 1.5a.5.5 0 000 1h4a.5.5 0 000-1h-4zM1 4a3 3 0 013-3h8a3 3 0 013 3v8a3 3 0 01-3 3H4a3 3 0 01-3-3V4zm3-2a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H4z"
        ></path>
      </svg>
    ),
  },
  {
    path: 'contestant',
    label: "Contestant",
    icon: (
      <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill="currentColor"
        fillOpacity="0.4"
        d="M11.5 8A1.5 1.5 0 0113 9.5v.5c0 1.971-1.86 4-5 4-3.14 0-5-2.029-5-4v-.5A1.5 1.5 0 014.5 8h7zm0 1h-7a.5.5 0 00-.5.5v.5c0 1.438 1.432 3 4 3s4-1.562 4-3v-.5a.5.5 0 00-.5-.5zM8 1.5A2.75 2.75 0 118 7a2.75 2.75 0 010-5.5zm0 1A1.75 1.75 0 108 6a1.75 1.75 0 000-3.5z"
      ></path>
    </svg>
    ),
  },
  {
    path: `settings`,
    label: "Settings",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="none"
        viewBox="0 0 16 16"
      >
        <path
          fill="currentColor"
          fillOpacity="0.4"
          d="M8 6a2 2 0 100 4 2 2 0 000-4zM7 8a1 1 0 112 0 1 1 0 01-2 0zm3.618-3.602a.708.708 0 01-.824-.567l-.26-1.416a.354.354 0 00-.275-.282 6.072 6.072 0 00-2.519 0 .354.354 0 00-.275.282l-.259 1.416a.71.71 0 01-.936.538l-1.359-.484a.355.355 0 00-.382.095c-.569.627-1 1.367-1.262 2.173a.352.352 0 00.108.378l1.102.931a.704.704 0 010 1.076l-1.102.931a.352.352 0 00-.108.378A5.986 5.986 0 003.53 12.02a.355.355 0 00.382.095l1.36-.484a.708.708 0 01.936.538l.258 1.416c.026.14.135.252.275.281a6.075 6.075 0 002.52 0 .353.353 0 00.274-.281l.26-1.416a.71.71 0 01.936-.538l1.359.484c.135.048.286.01.382-.095.569-.627 1-1.367 1.262-2.173a.352.352 0 00-.108-.378l-1.102-.931a.703.703 0 010-1.076l1.102-.931a.352.352 0 00.108-.378A5.985 5.985 0 0012.47 3.98a.355.355 0 00-.382-.095l-1.36.484a.71.71 0 01-.111.03zm-6.62.58l.937.333a1.71 1.71 0 002.255-1.3l.177-.97a5.105 5.105 0 011.265 0l.178.97a1.708 1.708 0 002.255 1.3L12 4.977c.255.334.467.698.63 1.084l-.754.637a1.704 1.704 0 000 2.604l.755.637a4.99 4.99 0 01-.63 1.084l-.937-.334a1.71 1.71 0 00-2.255 1.3l-.178.97a5.099 5.099 0 01-1.265 0l-.177-.97a1.708 1.708 0 00-2.255-1.3L4 11.023a4.987 4.987 0 01-.63-1.084l.754-.638a1.704 1.704 0 000-2.603l-.755-.637c.164-.386.376-.75.63-1.084z"
        ></path>
      </svg>
    ),
  },
];
export function Header({ challengeId }: { challengeId: ChallengeID }) {
  let segment = useSelectedLayoutSegment();

  

  return (
    <div className="text-white flex justify-between w-full h-14 items-center p-4 border-b border-b-white/20">
      <div className="">
        <Link href="/host">
        <Image
          src="/logo/bewater-h.svg"
          width={120}
          height={24}
          alt="bewater logo"
        />
        </Link>

      </div>
      <div className="flex">
        {links.map((link) => (
          <Link
            key={link.label}
            className={clsx(
              "body-2 p-3   rounded-[6px] flex  gap-2 items-center",
              link.path === segment ? "text-day" : "text-gray-500"
            )}
            href={`/host/edit/${challengeId}/${link.path ?? ""}`}
          >
            {link.icon}
            {link.label}
          </Link>
        ))}
      </div>
      <div>
        <PublishButton challengeId={challengeId} />
      
      </div>
    </div>
  );
}
