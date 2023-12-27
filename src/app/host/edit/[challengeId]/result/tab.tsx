"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Tab() {
  const pathname = usePathname();
  console.log(pathname);
  const currentTabStyle = "text-[#33FFFF] font-bold";
  return (
    <div
      className="mt-[42px] border-b border-[#FFFFFF33] pb-[14px] flex gap-6 text-sm text-gray-500 leader-5"
      style={{
        fontFamily: "var(--font-secondary)",
      }}
    >
      <Link
        href={pathname.substring(0, pathname.lastIndexOf("/")) + "/shortlist"}
      >
        <p className={pathname.endsWith("/shortlist") ? currentTabStyle : ""}>
          Shortlist
        </p>
      </Link>
      <Link href={pathname.substring(0, pathname.lastIndexOf("/")) + "/final"}>
        <p className={pathname.endsWith("/final") ? currentTabStyle : ""}>
          Final Result
        </p>
      </Link>
    </div>
  );
}
