import Link from "next/link";
import Image from "next/image";
import IconNew from "./icon-new";
import { HeaderScrollHelper } from "@/components/header/scroll-helper";
import UserArea from "@/components/header/user";

const NavItem = "ml-8 text-sm leading-5 text-bold";

export default function Header() {
  return (
    <div className="mx-[152px] flex items-center h-[72px]">
      <Link href="https://bewater.pro">
        <Image
          src="/logo/bewater-h.svg"
          width={120}
          height={24}
          alt="BeWater"
        />
      </Link>
      <div className="flex-1 flex text-white">
        <a href="/campaigns">
          <p className={NavItem}>Campaigns</p>
        </a>
        <a href="https://docs.bewater.pro/">
          <p className={NavItem}>Docs</p>
        </a>
        <a href="/host">
          <p className={NavItem}>Host</p>
        </a>
        <a href="https://bewater.pro/venturestudio">
          <p className={`${NavItem} flex items-center gap-1`}>
            Venture Studio
            <IconNew />
          </p>
        </a>
      </div>
      <UserArea lng="en" />
      <HeaderScrollHelper />
    </div>
  );
}
