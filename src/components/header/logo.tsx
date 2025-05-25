'use client'
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Menu from "./menu";
import DesktopMenu from "./desktop-menu";

export const BeWaterLogo = ({ lng }: { lng: string }) => {
  const { t } = useTranslation("translation");

  return (
    <div className="flex flex-row relative">
      <Menu lng={lng}></Menu>
      <Link href="https://bewater.pro">
        <Image
          src="/logo/bewater_black.svg"
          width={120}
          height={24}
          alt="bewater logo"
        />
        {/* <div className="body-5 text-day absolute left-full top-[-12px] rounded-full p-[1px] bg-gradient-108 from-[#057382] to-[#66FFFF]">
          <div className="bg-night rounded-full px-[5px] leading-[12px]">
            Alpha
          </div>
        </div> */}
      </Link>
      <DesktopMenu lng={lng}></DesktopMenu>
    </div>
  );
};
