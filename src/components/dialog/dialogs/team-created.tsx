import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialogs } from "../store";

interface TeamCreateDialogProps {
  data: NonNullable<Dialogs["team_created"]>;
  close: () => void;
}

export default function TeamCreatedDialog({
  data,
  close,
}: TeamCreateDialogProps) {
  let [copied, setCopied] = useState(false);
  let url =
    window.location.origin +
    `/campaigns/${data.challenge.externalId}/teams/${data.teamId}`;
  let share = () => {
    if (!window) return;
    let usp = new URLSearchParams();
    usp.append(
      "text",
      `我在 ${data.challenge.title} 上创建了队伍！快来加入吧！`
    );

    usp.append("url", url);
    usp.append("hashtags", "BeWaterWeb3Challenge");
    let twitterURL = "http://twitter.com/share?" + usp.toString();
    window!.open(twitterURL, "_blank")!.focus();
  };
  let copyLink = () => {
    navigator.clipboard.writeText(url).then(
      function () {
        setCopied(true);
      },
      function (error) {}
    );
  };

  useEffect(() => {
    if (copied) {
      let timer = setTimeout(() => {
        setCopied(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [copied]);

  return (
    <div className="flex flex-col justify-center  w-[343px] md:w-[570px] bg-[url(/challenge/assets/team_created.png)] bg-cover bg-center -m-5">
      <div className="p-5 flex flex-col justify-around items-center">
        <h2 className="heading-6 md:heading-5 mt-10 text-center">
          You’ve successfully joined <br />
          {data.challenge.title}
        </h2>

        <button
          onClick={share}
          className="flex  body-4 text-day items-center rounded gap-3 p-3 border border-day/30 bg-day/10 my-6 md:my-8 hover:bg-day/30 active:bg-day/20 transition duration-[.15s] ease-out"
        >
          <Image src="/icons/twitter.svg" height={20} width={20} alt="filter" />
          Share on Twitter
        </button>

        <div className="p-2 flex gap-2 justify-between items-center body-3 border border-white/50 rounded-sm w-full">
          <span className="overflow-hidden whitespace-nowrap text-ellipsis">
            {url}
          </span>
          {copied ? (
            <span className="body-5 text-white/50 break-keep">COPIED!</span>
          ) : (
            <Image
              src="/icons/copy.svg"
              height={20}
              width={20}
              alt="filter"
              onClick={copyLink}
              className="cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
}
