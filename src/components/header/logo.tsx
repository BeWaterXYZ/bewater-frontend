import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "@/app/i18n";
import Menu from "./menu";
import DesktopMenu from "./desktop-menu";
export const BeWaterLogo = async (params: { lng: string }) => {
  const lng = (params || {}).lng ? params.lng : "en";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, "translation");

  return (
    <div className="flex flex-row relative">
      <Menu lng={lng}></Menu>
      <Link href="https://bewater.xyz">
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
