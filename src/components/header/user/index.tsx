"use client";
import Image from "next/image";
import Link from "next/link";
import { NotificationBell } from "./notification";
import { useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { icons } from "./icons";

const styles = {
  section: "p-[6px] grid gap-[2px] grid-cols-1",
  item: "rounded-[2px] px-2 py-1 flex gap-2 font-bold text-sm leader-5 cursor-pointer hover:bg-[#FFF2] items-center transition-colors ease-out duration-300",
  itemDescription: "text-xs text-gray-200 font-normal leading-4",
  itemIcon: "text-gray-50 p-1",
  divider: "my-1 h-[1px] bg-[#FFF2]",
  icon: "rounded w-[24px] h-[24px] overflow-hidden",
};

export default function UserArea({ lng }: { lng: string }) {
  const clerk = useClerk();
  const { signOut } = useClerk();
  const [userMenu, setUserMenu] = useState(false);
  const handleClose = () => {
    if (document.querySelector("#user-menu:hover")) return;
    setUserMenu(false);
    window.removeEventListener("click", handleClose);
  };
  useEffect(() => {
    if (userMenu) window.addEventListener("click", handleClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMenu]);

  return !clerk.user ? (
    <Link
      href={`/sign-in`}
      className="btn btn-primary-invert h-10 py-4 px-8 uppercase body-4 text-day"
    >
      Sign In
    </Link>
  ) : (
    <div id="user-menu" className="flex gap-4 items-center">
      <NotificationBell lng={lng} />
      <Image
        src={clerk.user!.imageUrl}
        width={36}
        height={36}
        alt={clerk.user.fullName || clerk.user.username!}
        className="rounded-full cursor-pointer"
        onClick={() => setUserMenu(true)}
      />
      {userMenu && (
        <div className="absolute bg-[#25263C] rounded top-[64px] right-[52px] w-[288px] py-1 z-50 font-secondary text-white select-none shadow-lg">
          <div className={styles.section}>
            <div className={`${styles.item} items-start`}>
              <div className={styles.icon}>
                <Image
                  src={clerk.user!.imageUrl}
                  width={24}
                  height={24}
                  alt={clerk.user.fullName || clerk.user.username!}
                />
              </div>
              <div>
                <p>{clerk.user.fullName || clerk.user.username}</p>
                <p className={styles.itemDescription}>
                  {clerk.user.fullName && clerk.user.username}
                </p>
              </div>
            </div>
          </div>
          <div className={styles.divider} />
          <div className={styles.section}>
            <Link href="/en/settings/basic">
              <div
                className={styles.item}
                onClick={() => {
                  setUserMenu(false);
                }}
              >
                <div className={styles.itemIcon}>{icons.settings_16}</div>
                <p>Manage account</p>
              </div>
            </Link>
            <Link href="/host">
              <div
                className={styles.item}
                onClick={() => {
                  setUserMenu(false);
                }}
              >
                <div className={styles.itemIcon}>{icons.hero_16}</div>
                <p>Host</p>
              </div>
            </Link>
            <div
              className={styles.item}
              onClick={() => signOut(() => void (location.href = "/"))}
            >
              <div className={styles.itemIcon}>{icons.arrowExit_16}</div>
              <p>Sign out</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
