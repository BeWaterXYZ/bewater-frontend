import PrizeList from '@/components/prize-list';
import SponsorsCell from '@/components/sponsor-marquee-cell';
import Marquee from 'react-fast-marquee';

export function PrizeSection() {
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        当前奖金池中已有 $30K !
      </h3>
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            应用类赛道
          </p>
          <div className="flex flex-row gap-[min(32px,2vw)] ">
            <PrizeList title="🎮 GameFi" />
            <PrizeList title="🌐 DeFi" />
            <PrizeList title="🎨 NFT" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            基础设施类赛道
          </p>
          <div className="flex flex-row gap-[min(32px,2vw)] ">
            <PrizeList title="🔐 Web3 安全" />
            <PrizeList title="0⃣️ ZK" />
            <PrizeList title="🛠 DAO Tool" />
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          赛事联合出品方
        </p>
        <Marquee>
          <SponsorsCell src={'/sponsors/ABCDE.png'} />
          <SponsorsCell src={'/sponsors/aliyun.png'} />
          <SponsorsCell src={'/sponsors/ScalingX.png'} />
          <SponsorsCell src={'/sponsors/particleNetwork.png'} />
          <SponsorsCell src={'/sponsors/Metatrust.png'} />
          <SponsorsCell src={'/sponsors/seedao.png'} />
          <SponsorsCell src={'/sponsors/cointime.png'} />
        </Marquee>
      </div>
    </div>
  );
}
