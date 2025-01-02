import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/app/i18n";

interface Props {
  lng: string;
  fullWidth?: boolean;
}

export const Footer = async (params: Props) => {
  const { lng = "en", fullWidth = false } = params || {};
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, "translation");

  return (
    <footer
      id="main-footer"
      className={clsx("w-full heading-5 h-20 flex flex-col justify-center")}
    >
      <div
        className={clsx(
          fullWidth ? "px-[32px] w-full" : "container",
          "mx-auto flex flex-col gap-6 justify-between items-center md:flex-row md:items-start"
        )}
      >
        <div className="body-4 text-grey-100 uppercase">
          © {new Date().getFullYear()} {t("bewater")}
          {t("footer.dot")} {t("footer.right")}
        </div>
        <div className="flex flex-row gap-x-4 items-center justify-end">
          <Link
            href="https://twitter.com/BeWaterOfficial"
            target="_blank"
            className="fill-white/20 hover:fill-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="inherit"
              viewBox="0 0 32 32"
            >
              <path d="M3.063 4l10.039 13.237L3 28h2.273l8.845-9.423L21.262 28H29L18.397 14.018 27.799 4h-2.273l-8.145 8.678L10.801 4H3.062zm3.344 1.652H9.96l15.695 20.696h-3.554L6.407 5.652z"></path>
            </svg>
          </Link>
          <Link
            // href="https://t.co/oPJUASWXjh"
            href="https://t.me/+PmvPLRAAsAFlYWQ1"
            target="_blank"
            className="fill-white/20 hover:fill-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="inherit"
              viewBox="0 0 27 20"
            >
              <g clipPath="url(#clip0_976_60043)">
                <path d="M22.724 1.781A21.29 21.29 0 0017.47.151a.08.08 0 00-.084.04c-.227.404-.479.93-.655 1.344a19.655 19.655 0 00-5.902 0 13.6 13.6 0 00-.665-1.344.083.083 0 00-.084-.04 21.232 21.232 0 00-5.255 1.63.075.075 0 00-.035.03C1.442 6.81.525 11.689.975 16.506a.088.088 0 00.033.06 21.41 21.41 0 006.447 3.26c.034.01.07-.003.09-.03.497-.679.94-1.394 1.32-2.146a.082.082 0 00-.045-.113 14.092 14.092 0 01-2.014-.96.083.083 0 01-.008-.138c.135-.101.27-.207.4-.313a.08.08 0 01.083-.012c4.226 1.93 8.8 1.93 12.975 0a.08.08 0 01.085.01c.13.107.264.214.4.315a.083.083 0 01-.006.138c-.643.376-1.312.693-2.015.958a.082.082 0 00-.044.115c.388.751.83 1.466 1.318 2.145.02.028.057.04.09.03a21.339 21.339 0 006.457-3.259.083.083 0 00.034-.06c.538-5.568-.902-10.406-3.817-14.694a.065.065 0 00-.034-.031zM9.496 13.573c-1.272 0-2.32-1.168-2.32-2.602 0-1.435 1.027-2.603 2.32-2.603 1.302 0 2.34 1.179 2.32 2.603 0 1.434-1.028 2.602-2.32 2.602zm8.579 0c-1.273 0-2.32-1.168-2.32-2.602 0-1.435 1.027-2.603 2.32-2.603 1.302 0 2.34 1.179 2.32 2.603 0 1.434-1.018 2.602-2.32 2.602z"></path>
              </g>
              <defs>
                <clipPath id="clip0_976_60043">
                  <path
                    fill="#fff"
                    d="M0 0H25.818V20H0z"
                    transform="translate(.868)"
                  ></path>
                </clipPath>
              </defs>
            </svg>
          </Link>
          <Link
            href="https://t.me/bewaterxyz"
            target="_blank"
            className="fill-white/20 hover:fill-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="inherit"
              viewBox="0 0 32 32"
            >
              <g clipPath="url(#clip0_3800_118650)">
                <path d="M29.402 3.306l-28.35 10.99c-1.141.511-1.527 1.536-.276 2.092l7.273 2.323L25.635 7.787c.96-.686 1.943-.503 1.097.251L11.628 21.784l-.474 5.818c.44.898 1.244.902 1.757.456l4.179-3.975 7.156 5.387c1.663.99 2.567.35 2.925-1.462l4.694-22.342c.487-2.232-.344-3.215-2.463-2.36z"></path>
              </g>
              <defs>
                <clipPath id="clip0_3800_118650">
                  <path fill="#fff" d="M0 0H32V32H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </Link>
          <Link
            href="https://blog.bewater.xyz"
            target="_blank"
            className="fill-white/20 hover:fill-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="inherit"
              viewBox="0 0 32 32"
            >
              <g clipPath="url(#clip0_3800_118651)">
                <path d="M29.801 10.692l-8.493-8.493a7.507 7.507 0 00-10.616 0l-8.493 8.493a7.507 7.507 0 000 10.616l8.493 8.493a7.506 7.506 0 0010.616 0l8.493-8.493a7.507 7.507 0 000-10.616zM16 21.271a5.27 5.27 0 110-10.54 5.27 5.27 0 010 10.54z"></path>
              </g>
              <defs>
                <clipPath id="clip0_3800_118651">
                  <path fill="#fff" d="M0 0H32V32H0z"></path>
                </clipPath>
              </defs>
            </svg>
          </Link>
        </div>
      </div>
    </footer>
  );
};
