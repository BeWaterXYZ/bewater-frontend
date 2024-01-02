import {
  CreateOrganization,
  OrganizationProfile,
  UserProfile,
  useOrganization,
  useOrganizationList,
  useUser,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  const isOrganization = !!organization;
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
      className="w-full h-full py-1 px-2 flex text-white items-center relative"
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
                  stroke-width="1.16667"
                />
                <path
                  d="M17.0625 10.9375L10.9375 17.0625"
                  stroke="#E2E8F0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.9375 10.9375L17.0625 17.0625"
                  stroke="#E2E8F0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
          className="block rounded mr-[8px]"
          src={isOrganization ? organization.imageUrl : user!.imageUrl}
          width={24}
          height={24}
          alt={
            isOrganization ? organization.name : user.fullName || user.username!
          }
        />
        <p className="text-sm font-bold leading-5 mr-4">
          {isOrganization ? organization.name : user.fullName || user.username}
        </p>
        <div className={`h-fit ${show ? "-scale-100" : ""}`}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6L8 10L12 6"
              stroke="white"
              strokeOpacity="0.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
      {show && (
        <div className="absolute bg-[#25263C] rounded top-10 w-[288px] z-50">
          <div className={styles.section}>
            {isOrganization && (
              <Link href="/host/settings/org">
                <div className={styles.item} onClick={() => setShow(false)}>
                  <div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.9999 10C10.8954 10 9.99994 10.8954 9.99994 12C9.99994 13.1046 10.8954 14 11.9999 14C13.1045 14 13.9999 13.1046 13.9999 12C13.9999 10.8954 13.1045 10 11.9999 10ZM10.9999 12C10.9999 11.4477 11.4477 11 11.9999 11C12.5522 11 12.9999 11.4477 12.9999 12C12.9999 12.5523 12.5522 13 11.9999 13C11.4477 13 10.9999 12.5523 10.9999 12ZM14.618 8.39833C14.233 8.46825 13.8639 8.21413 13.7937 7.83074L13.534 6.41496C13.5082 6.27427 13.3996 6.16301 13.2591 6.13325C12.8482 6.04621 12.4268 6.00195 12 6.00195C11.5729 6.00195 11.1513 6.04627 10.7401 6.13341C10.5996 6.1632 10.491 6.27452 10.4653 6.41527L10.2063 7.8308C10.1994 7.86844 10.1894 7.90551 10.1765 7.9416C10.0448 8.30859 9.6392 8.49978 9.27062 8.36863L7.91115 7.88463C7.77603 7.83652 7.62511 7.87431 7.52891 7.98033C6.96005 8.60729 6.52892 9.34708 6.2672 10.153C6.22305 10.289 6.26562 10.438 6.37502 10.5305L7.47694 11.4621C7.50626 11.4869 7.53352 11.514 7.55843 11.5432C7.81177 11.8403 7.77528 12.2856 7.47693 12.5378L6.37502 13.4693C6.26562 13.5618 6.22305 13.7109 6.2672 13.8469C6.52892 14.6528 6.96005 15.3926 7.52891 16.0196C7.62511 16.1256 7.77603 16.1634 7.91115 16.1153L9.27068 15.6312C9.30687 15.6184 9.3441 15.6084 9.38196 15.6015C9.76701 15.5316 10.1361 15.7857 10.2063 16.1691L10.4653 17.5846C10.491 17.7254 10.5996 17.8367 10.7401 17.8665C11.1513 17.9536 11.5729 17.9979 12 17.9979C12.4268 17.9979 12.8482 17.9537 13.2591 17.8666C13.3996 17.8369 13.5082 17.7256 13.534 17.5849L13.7937 16.1692C13.8006 16.1314 13.8106 16.0944 13.8235 16.0583C13.9552 15.6913 14.3608 15.5001 14.7294 15.6312L16.0888 16.1153C16.224 16.1634 16.3749 16.1256 16.4711 16.0196C17.04 15.3926 17.4711 14.6528 17.7328 13.8469C17.777 13.7109 17.7344 13.5618 17.625 13.4693L16.5231 12.5378C16.4937 12.513 16.4665 12.4859 16.4416 12.4567C16.1882 12.1596 16.2247 11.7143 16.5231 11.462L17.625 10.5305C17.7344 10.438 17.777 10.289 17.7328 10.153C17.4711 9.34708 17.04 8.60729 16.4711 7.98033C16.3749 7.87431 16.224 7.83652 16.0888 7.88463L14.7293 8.36865C14.6931 8.38152 14.6559 8.39146 14.618 8.39833ZM7.99863 8.97726L8.93522 9.3107C9.82017 9.62559 10.7987 9.16815 11.1177 8.2794C11.149 8.19207 11.1732 8.1021 11.19 8.01078L11.3674 7.04113C11.5757 7.01512 11.7868 7.00195 12 7.00195C12.213 7.00195 12.424 7.0151 12.6321 7.04107L12.8101 8.01117C12.9805 8.9408 13.8727 9.55003 14.7967 9.38225C14.8877 9.36572 14.9775 9.34176 15.0647 9.31073L16.0014 8.97726C16.2564 9.31084 16.4684 9.67476 16.6319 10.0606L15.8774 10.6984C15.1566 11.3079 15.0675 12.3865 15.6807 13.1056C15.7408 13.1761 15.8067 13.2417 15.8775 13.3015L16.6319 13.9392C16.4684 14.3251 16.2564 14.689 16.0014 15.0226L15.0646 14.6891C14.1797 14.3742 13.2013 14.8317 12.8823 15.7205C12.851 15.8078 12.8268 15.8978 12.81 15.9891L12.6321 16.9588C12.424 16.9848 12.213 16.9979 12 16.9979C11.7868 16.9979 11.5757 16.9848 11.3674 16.9587L11.1899 15.989C11.0196 15.0592 10.1274 14.4498 9.2033 14.6176C9.11227 14.6342 9.0225 14.6581 8.93528 14.6892L7.99863 15.0226C7.74357 14.689 7.53161 14.3251 7.36814 13.9392L8.12257 13.3015C8.84343 12.692 8.93254 11.6134 8.31933 10.8943C8.25917 10.8238 8.19332 10.7582 8.12254 10.6984L7.36814 10.0606C7.53161 9.67476 7.74357 9.31084 7.99863 8.97726Z"
                        fill="#F1F5F9"
                      />
                    </svg>
                  </div>
                  <p>Organization settings</p>
                </div>
              </Link>
            )}
            <div className={styles.item}>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.3638 9.34624C12.9975 8.71253 14.024 8.71766 14.6566 9.35022C15.2891 9.98278 15.2943 11.0093 14.6606 11.643C14.0268 12.2767 13.0003 12.2716 12.3678 11.639C11.7352 11.0065 11.7301 9.97995 12.3638 9.34624ZM13.9495 10.0573C13.7041 9.81194 13.3107 9.81351 13.0709 10.0533C12.8311 10.2932 12.8295 10.6865 13.0749 10.9319C13.3203 11.1773 13.7136 11.1757 13.9534 10.9359C14.1933 10.6961 14.1949 10.3027 13.9495 10.0573ZM17.7779 7.50086C17.587 6.89463 17.1121 6.41978 16.5059 6.2289C14.7853 5.68715 12.9063 6.14734 11.6308 7.42285L11.002 8.05166C10.1344 7.67832 9.08977 7.84593 8.38122 8.55447L7.59574 9.33995C7.40048 9.53521 7.40048 9.85179 7.59574 10.0471L8.44566 10.897C8.31513 11.3955 8.44523 11.9482 8.83597 12.339L9.00279 12.5058L8.23036 12.9676C8.0981 13.0467 8.00969 13.1824 7.99074 13.3353C7.9718 13.4882 8.02443 13.6413 8.13339 13.7503L10.2564 15.8733C10.3654 15.9823 10.5184 16.0349 10.6713 16.016C10.8242 15.9971 10.9599 15.9088 11.039 15.7766L11.5012 15.0042L11.6678 15.1708C12.0585 15.5615 12.6111 15.6916 13.1096 15.5611L13.9597 16.4112C14.1549 16.6065 14.4715 16.6065 14.6668 16.4112L15.4523 15.6257C16.1608 14.9171 16.3284 13.8724 15.955 13.0049L16.5839 12.376C17.8594 11.1005 18.3196 9.22142 17.7779 7.50086ZM16.2056 7.18273C16.5003 7.27554 16.7312 7.50643 16.824 7.80119C17.2538 9.1662 16.8887 10.657 15.8768 11.6689L13.082 14.4637C12.8867 14.6589 12.5702 14.6589 12.3749 14.4637L9.54307 11.6319C9.34781 11.4366 9.34781 11.12 9.54307 10.9248L12.3379 8.12995C13.3498 7.11803 14.8406 6.75294 16.2056 7.18273ZM15.1424 13.8175C15.1789 14.211 15.0465 14.6173 14.7452 14.9186L14.3132 15.3505L13.9613 14.9986L15.1424 13.8175ZM9.08833 9.26158C9.38961 8.9603 9.7958 8.82787 10.1893 8.86431L9.00826 10.0454L8.6564 9.6935L9.08833 9.26158ZM10.7722 14.2752L10.5102 14.7129L9.29404 13.4968L9.73194 13.2349L10.7722 14.2752ZM8.84893 15.865C9.04419 15.6697 9.04419 15.3532 8.84893 15.1579C8.65367 14.9626 8.33708 14.9626 8.14182 15.1579L6.82158 16.4781C6.62632 16.6734 6.62632 16.99 6.82158 17.1852C7.01684 17.3805 7.33342 17.3805 7.52869 17.1852L8.84893 15.865ZM7.78728 14.0965C7.98255 14.2918 7.98255 14.6083 7.78728 14.8036L7.25785 15.333C7.06259 15.5283 6.74601 15.5283 6.55074 15.333C6.35548 15.1378 6.35548 14.8212 6.55074 14.6259L7.08018 14.0965C7.27544 13.9012 7.59202 13.9012 7.78728 14.0965ZM9.91033 16.9265C10.1056 16.7313 10.1056 16.4147 9.91033 16.2194C9.71507 16.0242 9.39849 16.0242 9.20322 16.2194L8.67379 16.7489C8.47853 16.9441 8.47853 17.2607 8.67379 17.456C8.86905 17.6512 9.18563 17.6512 9.3809 17.456L9.91033 16.9265Z"
                    fill="#F8FAFC"
                  />
                </svg>
              </div>
              <p>Upgrade</p>
            </div>
          </div>
          <div className={styles.divider} />
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
            <div
              className={styles.item}
              onClick={() => {
                setShow(false);
                setShowDialog("CreateOrganization");
              }}
            >
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6.5C12 6.22386 11.7761 6 11.5 6C11.2239 6 11 6.22386 11 6.5V11H6.5C6.22386 11 6 11.2239 6 11.5C6 11.7761 6.22386 12 6.5 12H11V16.5C11 16.7761 11.2239 17 11.5 17C11.7761 17 12 16.7761 12 16.5V12H16.5C16.7761 12 17 11.7761 17 11.5C17 11.2239 16.7761 11 16.5 11H12V6.5Z"
                    fill="#F1F5F9"
                  />
                </svg>
              </div>
              <p>Create a new organization</p>
            </div>
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
            <div className={styles.item}>
              <div>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.2333 18C14.4727 18 14.6667 17.8081 14.6667 17.5714C14.6667 17.3347 14.4727 17.1429 14.2333 17.1429H8.6C7.64271 17.1429 6.86667 16.3753 6.86667 15.4286V8.57143C6.86667 7.62465 7.64271 6.85714 8.6 6.85714H14.2333C14.4727 6.85714 14.6667 6.66526 14.6667 6.42857C14.6667 6.19188 14.4727 6 14.2333 6H8.6C7.16406 6 6 7.15127 6 8.57143V15.4286C6 16.8487 7.16406 18 8.6 18H14.2333ZM15.2269 8.69695C15.3961 8.52959 15.6705 8.52959 15.8397 8.69695L18.8731 11.697C19.0423 11.8643 19.0423 12.1357 18.8731 12.303L15.8397 15.303C15.6705 15.4704 15.3961 15.4704 15.2269 15.303C15.0577 15.1357 15.0577 14.8643 15.2269 14.697L17.5205 12.4286H9.9C9.66068 12.4286 9.46667 12.2367 9.46667 12C9.46667 11.7633 9.66068 11.5714 9.9 11.5714H17.5205L15.2269 9.30305C15.0577 9.13568 15.0577 8.86432 15.2269 8.69695Z"
                    fill="#F1F5F9"
                  />
                </svg>
              </div>
              <p>Logout</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
