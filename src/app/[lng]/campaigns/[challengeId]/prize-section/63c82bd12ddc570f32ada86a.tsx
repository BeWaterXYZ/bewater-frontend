/* eslint-disable react/no-unescaped-entities */
import PrizeList from '@/components/prize-list';
import SponsorsCell from '@/components/sponsor-marquee-cell';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

export function PrizeSection({ t }: { t: Function }) {
  return (
    <div className="flex flex-col items-center py-0 px-0 gap-20  from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[0px] border-midnight">
      <Image
        src={`/challenge/assets/frame-495.png`}
        alt=""
        width={3364}
        height={6303}
        className="w-full"
      />

      <div className="relative w-full flex flex-col py-20 gap-10 items-center bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))]">
        <p className="body-1 md:heading-5 font-bold text-[#00cccc] md:text-[#00cccc]">
          Grants
        </p>
        <ul className="w-[80%] flex-col flex gap-2 body-3 md:body-2 text-white/60 md:text-white/60">
          <li>
            <span>
              In recognition of outstanding projects presented on Demo Day,
              ABCDE, partnered with sponsors, offers a combined prize pool of
              $30,000 to $50,000.
            </span>
          </li>
          <li>
            <span>
              The competition results will be announced on the Demo Day
              (September 15th) after the end of the Hackathon. The prize pool
              will be divided between the five different primary tracks: ZK
              Scalability, ZK Interoperability, ZKML, ZK Tooling, and On-chain
              Gaming.
            </span>
          </li>
          <li>
            <span>
              Judges' Choice: 1st place ($20,000 USD), 2nd place ($10,000 USD)
              3rd place ($2,500 USD).
            </span>
          </li>
          <li>
            <span>* Details will be announced.</span>
          </li>
        </ul>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          {t('cryptoArt.t24')}
        </p>
        <Marquee>
          <SponsorsCell src={'/sponsors/ABCDE.png'} />
          <SponsorsCell src={'/sponsors/bewater.png'} />
        </Marquee>
      </div>
    </div>
  );
}
