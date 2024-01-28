"use client";
import {
  CreateOrganization,
  useClerk,
  useOrganization,
  useOrganizationList,
  useUser,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { icons } from "./icons";
import { RedirectType, redirect } from "next/navigation";

const styles = {
  section: "p-[6px] grid gap-[2px] grid-cols-1",
  sectionTitle: "px-2 pt-1 pb-2 text-xs text-slate-400 leader-4",
  item: "rounded-[2px] px-2 py-1 flex gap-2 font-bold text-sm leader-5 cursor-pointer hover:bg-[#FFF2] items-center",
  itemDescription: "text-xs text-gray-200 font-normal leading-4",
  divider: "mx-1 my-1 h-[1px] bg-[#FFF2]",
  icon: "rounded w-[24px] h-[24px] overflow-hidden",
  currentIcon: "border-[1px] border-white shadow-[0_0_0_1px_#02FFFF]",
  userIcon: "bg-[#FFF1] w-[24px] h-[24px] rounded relative",
};

const dialogStyle = {
  elements: {
    card: {
      maxHeight: "80vh",
    },
  },
};

export default function ProfileMenu(props: {
  user?: ReturnType<typeof useUser>["user"];
  organization?: ReturnType<typeof useOrganization>["organization"];
}) {
  const { user, organization } = props;
  const { signOut } = useClerk();
  const isOrganization = !!organization;
  const enableOrg = user?.publicMetadata?.enableOrg ?? false;
  const [show, setShow] = useState(false);
  const [showDialog, setShowDialog] = useState<"CreateOrganization" | null>(
    null
  );
  const { setActive, userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  const handleClose = () => {
    if (document.querySelector("#profile-menu *:hover")) return;
    setShow(false);
    window.removeEventListener("click", handleClose);
  };

  useEffect(() => {
    if (show) window.addEventListener("click", handleClose);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  if (!user) return null;
  return (
    <div
      id="profile-menu"
      className="w-full h-full py-1 px-2 flex text-white items-center relative select-none"
      style={{
        fontFamily: "var(--font-secondary)",
      }}
    >
      {showDialog && (
        <div className="fixed w-screen h-screen top-0 left-0 z-40 backdrop-blur-[4px] flex items-center justify-center">
          <div className="relative">
            {showDialog === "CreateOrganization" && (
              <CreateOrganization
                appearance={{
                  baseTheme: dark,
                  variables: { colorPrimary: "#00ffff" },
                  elements: {
                    formButtonPrimary:
                      "bg-day text-night hover:bg-[#00cccc] active:bg-[#009999] rounded-sm focus:shadow-none",
                    card: "bg-[#25263C] text-white p-0 gap-10",
                    headerSubtitle: "text-gray-500",
                    // socialButtons: "hidden",
                    // dividerRow: "hidden",
                    formFieldInput:
                      "bg-night text-white border-gray-800 rounded-sm placeholder-gray-600",
                    formFieldLabel: "text-gray-500",
                    formFieldLabelRow: "mb-2",
                    // footer: "hidden",
                    header: "text-xl gap-2",
                    identityPreviewEditButton: "text-gray-500",
                    formResendCodeLink:
                      "text-day hover:text-[#00cccc] active:text-[#009999] rounded-none focus:shadow-none",
                    // navbar: "hidden",
                  },
                }}
              />
            )}
            <div
              className="absolute right-[53px] top-[24px] cursor-pointer"
              onClick={() => setShowDialog(null)}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.583333"
                  y="0.583333"
                  width="26.8333"
                  height="26.8333"
                  rx="13.4167"
                  stroke="#334155"
                  strokeWidth="1.16667"
                />
                <path
                  d="M17.0625 10.9375L10.9375 17.0625"
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.9375 10.9375L17.0625 17.0625"
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      <div
        className="flex items-center select-none cursor-pointer"
        onClick={() => setShow(!show)}
      >
        <Image
          className="block rounded mr-2"
          src={isOrganization ? organization.imageUrl : user!.imageUrl}
          width={24}
          height={24}
          alt={
            isOrganization ? organization.name : user.fullName || user.username!
          }
        />
        <p className="text-sm font-bold mr-4">
          {isOrganization ? organization.name : user.fullName || user.username}
        </p>
        <div className={`h-fit ${show ? "-scale-100" : ""}`}>
          {icons.down_16}
        </div>
      </div>
      {show && (
        <div className="absolute bg-[#25263C] rounded top-10 w-[288px] z-50">
          {isOrganization && (
            <div className={styles.section}>
              <Link href="/host/settings">
                <div className={styles.item} onClick={() => setShow(false)}>
                  <div className="p-1 text-gray-100">{icons.settings_16}</div>
                  <p>Organization settings</p>
                </div>
              </Link>
            </div>
          )}
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Workspaces</p>
            <div
              className={`${styles.item} items-start`}
              onClick={() => setActive?.({ organization: null })}
            >
              <div
                className={`${styles.icon} ${
                  isOrganization ? "" : styles.currentIcon
                }`}
              >
                <Image
                  src={user!.imageUrl}
                  width={24}
                  height={24}
                  alt={user.fullName || user.username!}
                />
              </div>
              <div>
                <p>{user.fullName || user.username}</p>
                <p className={styles.itemDescription}>Personal Account</p>
              </div>
            </div>
            {userMemberships.data?.map((membership) => (
              <div
                key={membership.organization.id}
                className={`${styles.item} items-start`}
                onClick={() =>
                  setActive?.({ organization: membership.organization })
                }
              >
                <div
                  className={`${styles.icon} ${
                    organization?.id === membership.organization.id
                      ? styles.currentIcon
                      : ""
                  }`}
                >
                  <Image
                    src={membership.organization.imageUrl}
                    width={24}
                    height={24}
                    alt={membership.organization.name}
                  />
                </div>
                <div>
                  <p>{membership.organization.name}</p>
                  <p className={styles.itemDescription}>{membership.role}</p>
                </div>
              </div>
            ))}
            {enableOrg && (
              <div
                className={styles.item}
                onClick={() => {
                  setShow(false);
                  setShowDialog("CreateOrganization");
                }}
              >
                <div className="p-1 text-gray-100">{icons.add_16}</div>
                <p>Create a new organization</p>
              </div>
            )}
          </div>
          <div className={styles.divider} />
          <div className={styles.section}>
            <p className={styles.sectionTitle}>
              {user!.primaryEmailAddress?.toString()}
            </p>
            <Link href="/en/settings/basic">
              <div
                className={styles.item}
                onClick={() => {
                  setShow(false);
                }}
              >
                <div className={styles.userIcon}>
                  <div className="absolute top-[5px] left-[5px] w-[14px] h-[14px] rounded-[3px] overflow-hidden">
                    <Image
                      src={user!.imageUrl}
                      width={14}
                      height={14}
                      alt={user.fullName || user.username!}
                    />
                  </div>
                </div>
                <p>Account Settings</p>
              </div>
            </Link>
            <div
              className={styles.item}
              onClick={() => signOut(() => void (location.href = "/"))}
            >
              <div className="p-1 text-gray-100">{icons.arrowExit_16}</div>
              <p>Sign Out</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
