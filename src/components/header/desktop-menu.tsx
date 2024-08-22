"use client";
import { useTranslation } from "@/app/i18n/client";
import Link from "next/link";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

interface DesktopMenuProps {
  lng: string;
}
enum MenuItems {
  CAMPAIGN = "campaign",
  PROJECT = "project",
  NONE = "none",
}
const DesktopMenu: React.FC<DesktopMenuProps> = (params) => {
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(
    MenuItems.CAMPAIGN
  );
  const pathname = usePathname();
  useEffect(() => {
    if (pathname.includes("/campaigns")) {
      setSelectedMenuItem(MenuItems.CAMPAIGN);
    } else if (pathname.includes("/projects")) {
      setSelectedMenuItem(MenuItems.PROJECT);
    } else {
      setSelectedMenuItem(MenuItems.NONE);
    }
  }, [pathname]);
  const lng = (params || {}).lng ? params.lng : "en";
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = useTranslation(lng, "translation");
  return (
    <div className="hidden sm:flex absolute left-[130px]">
      <Link href={params?.lng === lng ? `/${lng}/` : "/"}>
        <div
          className="text-day body-2 [text-shadow:0_0_6px_theme(colors.day)] flex flex-row gap-2 items-center"
          style={
            selectedMenuItem === MenuItems.CAMPAIGN
              ? {}
              : { color: "#FFF", textShadow: "none" }
          }
        >
          <div className="font-bold">/</div>
          <div className="font-bold uppercase whitespace-nowrap">
            {t("header.campaign")}
          </div>
        </div>
      </Link>
      <Link href={params?.lng === lng ? `/${lng}/projects` : "/en/projects"}>
        <div
          className="ml-2 text-day body-2 [text-shadow:0_0_6px_theme(colors.day)] flex flex-row gap-2 items-center"
          style={
            selectedMenuItem === MenuItems.PROJECT
              ? {}
              : { color: "#FFF", textShadow: "none" }
          }
        >
          <div className="font-bold">/</div>
          <div className="font-bold uppercase whitespace-nowrap">
            {t("header.project")}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default DesktopMenu;
