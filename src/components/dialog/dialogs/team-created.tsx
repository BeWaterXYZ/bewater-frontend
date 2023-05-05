import Image from 'next/image';
import { useState } from 'react';
import { Dialogs } from '../store';

interface TeamCreateDialogProps {
  data: NonNullable<Dialogs['team_created']>;
  close: () => void;
}

export default function TeamCreatedDialog({
  data,
  close,
}: TeamCreateDialogProps) {
  let [copied, setCopied] = useState(false);
  let url =
    window.location.origin +
    `/challenges/${data.challenge.id}/teams/${data.teamId}`;
  let share = () => {
    if (!window) return;
    let usp = new URLSearchParams();
    usp.append('text', '我在 BeWater Web3 创新大赛上创建了队伍! 快来加入吧!');

    usp.append('url', url);
    usp.append('hashtags', 'BeWaterWeb3Challenge');
    let twitterURL = 'http://twitter.com/share?' + usp.toString();
    window!.open(twitterURL, '_blank')!.focus();
  };
  let copyLink = () => {
    navigator.clipboard.writeText(url).then(
      function () {
        setCopied(true);
      },
      function (error) {},
    );
  };
  return (
    <div className="flex flex-col justify-center  w-[570px]    bg-[url(/challenge/team_created.png)] bg-cover h-[288px]  -m-5">
      <div className="p-5 flex flex-col justify-around items-center">
        <h2 className="heading-5 mt-4 text-center">
          You’ve successfully joined <br />
          {data.challenge.title}
        </h2>

        <button
          onClick={share}
          className="flex  body-4 text-day items-center rounded gap-2 p-3 border border-day/30 bg-day/10 my-8 hover:bg-day/30"
        >
          <Image src="/icons/twitter.svg" height={20} width={20} alt="filter" />
          Share on Twitter
        </button>

        <div className="p-2 flex gap-2 justify-between items-center body-3 border border-white/50 rounded-sm ">
          <span className="break-all">{url}</span>
          {copied ? (
            <span className="body-5 text-white/50 break-keep">Copied</span>
          ) : (
            <Image
              src="/icons/copy.svg"
              height={20}
              width={20}
              alt="filter"
              onClick={copyLink}
            />
          )}
        </div>
      </div>
    </div>
  );
}
