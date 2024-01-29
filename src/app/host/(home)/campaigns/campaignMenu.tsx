import Link from "next/link";
import clsx from "clsx";
import { icons } from "../icons";

export default function CampaignMenu(props: {
  menuPosition: { x: number; y: number };
  id: string;
  close: () => void;
}) {
  const { menuPosition, id, close } = props;

  const menuItems = [
    {
      icon: icons.open_16_filled,
      label: "Open Campaign Page",
      href: `/campaigns/${id}`,
    },
    {
      icon: icons.settings_16_filled,
      label: "Settings",
      href: `/host/edit/${id}/settings`,
    },
  ];

  return (
    <div
      className="w-[100vw] h-[100vh] fixed top-0 left-0 z-10"
      onClick={close}
    >
      <div
        className="fixed rounded-lg p-[6px] bg-[#0B0C24] border border-[#FFFFFF33] shadow-[0_24px_48px_-12px_#1018282E] font-secondary text-xs text-gray-300 flex flex-col gap-[2px]"
        style={{ top: menuPosition.y - 80, left: menuPosition.x - 202 }}
      >
        {menuItems.map((item) => {
          return (
            <Link key={item.label} href={item.href}>
              <button className="w-[188px] flex items-center gap-2 p-2 rounded-md hover:bg-[#FFFFFF1A] transition-colors">
                {item.icon}
                <span>{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
