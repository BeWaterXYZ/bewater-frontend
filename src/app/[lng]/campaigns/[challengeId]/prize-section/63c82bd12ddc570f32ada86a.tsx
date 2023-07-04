/* eslint-disable react/no-unescaped-entities */
import PrizeList from '@/components/prize-list';
import SponsorsCell from '@/components/sponsor-marquee-cell';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

export function PrizeSection({ t }: { t: Function }) {
  return (
    <div className="flex flex-col items-center py-10 pt-0 px-0 gap-10  from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[0px] border-midnight">
      <div className="heading-5 md:heading-3 whitespace-nowrap py-4 pb-0">
        Agenda
      </div>
      <div className="hidden md:flex">
        <Image
          src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/aFrame337717.jpg`}
          alt=""
          width={2242}
          height={882}
          className="w-full"
          style={{ borderRadius: '10px' }}
        />
      </div>
      <div className="flex md:hidden">
        <Image
          src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/sFrame337717.png`}
          alt=""
          width={1189}
          height={882}
          className="w-full"
          style={{ borderRadius: '10px' }}
        />
      </div>
      <div className="body-3 md:body-2 text-white pt-5">
        <p className="py-3">
          Central to the program are world-renowned advisers, a rigorous and
          innovative study of global ZK application and hands-on exploration of
          coding and entrepreneurships. Details of ZK curriculum, ZK Hackathon
          and Demo Day are below:
        </p>
      </div>
      <div className="hidden md:flex py-5 px-[20px]">
        <Image
          src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/frame494.png`}
          alt=""
          width={2136}
          height={2592}
          className="w-full"
        />
      </div>
      <div className="flex md:hidden py-5 px-[15px]">
        <div style={{ display: 'block' }}>
          <Image
            style={{ marginBottom: '40px' }}
            src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/frame494-1.png`}
            alt=""
            width={1037}
            height={1265}
            className="w-full"
          />
          <Image
            style={{ marginBottom: '40px' }}
            src={`/challenge/assets/frame494-2.png`}
            alt=""
            width={1036}
            height={1264}
            className="w-full"
          />
          <Image
            style={{ marginBottom: '40px' }}
            src={`/challenge/assets/frame494-3.png`}
            alt=""
            width={1037}
            height={1264}
            className="w-full"
          />
          <Image
            src={`/challenge/assets/frame494-4.png`}
            alt=""
            width={1036}
            height={1265}
            className="w-full"
          />
        </div>
      </div>
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
        <div className="relative w-full flex flex-col gap-10 items-center pt-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            {t('cryptoArt.t24')}
          </p>
          <Marquee>
            <SponsorsCell src={'/sponsors/starkware.png'} />
            <SponsorsCell src={'/sponsors/starknet.png'} />
            <SponsorsCell src={'/sponsors/bewater.png'} />
            <SponsorsCell src={'/sponsors/chainup.png'} />
          </Marquee>
        </div>
      </div>
    </div>
  );
}
