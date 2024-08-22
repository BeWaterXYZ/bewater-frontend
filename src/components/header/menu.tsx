"use client";
import { useTranslation } from "@/app/i18n/client";
import React, { useEffect } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HamburgerMenuIcon, TriangleRightIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";
type MenuProps = {
  lng: string;
};
enum MenuItems {
  CAMPAIGN = "campaign",
  PROJECT = "project",
}
const Menu: React.FC<MenuProps> = ({ lng }) => {
  const { t } = useTranslation(lng || "en", "translation");
  const pathname = usePathname();
  const [selectedMenuItem, setSelectedMenuItem] = React.useState(
    MenuItems.CAMPAIGN
  );
  const routeToPage = (menuItem: string) => {
    setSelectedMenuItem(menuItem as MenuItems);
    console.log(menuItem);
  };
  useEffect(() => {
    if (pathname.includes("/campaigns")) {
      setSelectedMenuItem(MenuItems.CAMPAIGN);
    } else {
      setSelectedMenuItem(MenuItems.PROJECT);
    }
  }, [pathname]);
  return (
    <div className="flex mr-1 sm:hidden flex-row gap-2 items-center">
      <DropdownMenu.Root modal={false}>
        <DropdownMenu.Trigger asChild>
          <button className="w-[35px] h-[35px] text-day inline-flex items-center justify-center bg-transparent outline-none">
            <HamburgerMenuIcon width={30} height={30} />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="text-day uppercase [text-shadow:0_0_6px_theme(colors.day)] z-[99] border-day border w-auto min-w-24 h-24 bg-black p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            sideOffset={5}
            align="start"
          >
            <DropdownMenu.RadioGroup
              value={selectedMenuItem}
              onValueChange={routeToPage}
            >
              <DropdownMenu.RadioItem
                className="text-base leading-none flex items-center w-auto h-10 relative px-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                style={
                  selectedMenuItem !== MenuItems.CAMPAIGN
                    ? { color: "#FFF", textShadow: "none" }
                    : {}
                }
                value={MenuItems.CAMPAIGN}
              >
                <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <TriangleRightIcon />
                </DropdownMenu.ItemIndicator>
                {t("header.campaign")}
              </DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem
                className="text-base leading-none flex items-center w-auto h-10 relative px-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                style={
                  selectedMenuItem !== MenuItems.PROJECT
                    ? { color: "#FFF", textShadow: "none" }
                    : {}
                }
                value={MenuItems.PROJECT}
              >
                <DropdownMenu.ItemIndicator className="absolute left-0 w-[25px] inline-flex items-center justify-center">
                  <TriangleRightIcon />
                </DropdownMenu.ItemIndicator>
                {t("header.project")}
              </DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
};

export default Menu;
