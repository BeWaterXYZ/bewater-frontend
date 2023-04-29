import PrizeList from '@/components/prize-list';
import Marquee from 'react-fast-marquee';

export function PrizeSection() {
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/25 via-night/0 to-day/20 rounded-xl border-solid border-[1px] border-midnight">
      <p className="heading-4 text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        当前奖金池中已有 $30K !
      </p>
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 font-bold text-white/40">应用类赛道</p>
          <div className="flex flex-row gap-[min(32px,2vw)]">
            <PrizeList title="🎮 GameFi" />
            <PrizeList title="🌐 DeFi" />
            <PrizeList title="🎨 NFT" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 font-bold text-white/40">基础设施类赛道</p>
          <div className="flex flex-row gap-[min(32px,2vw)]">
            <PrizeList title="🔐 Web3 安全" />
            <PrizeList title="0⃣️ ZK" />
            <PrizeList title="🛠 DAO Tool" />
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 font-bold text-white/40">赛事联合出品方</p>
        <Marquee>
          <div className="rounded-lg border-solid border-[1px] border-white/20 w-60 h-20 flex flex-row items-center justify-center mr-3">
            <img src="/sponsors/ABCDE.png" className="h-10" />
          </div>
          <div className="rounded-lg border-solid border-[1px] border-white/20 w-60 h-20 flex flex-row items-center justify-center mr-3">
            <img src="/sponsors/aliyun.png" className="h-10" />
          </div>
          <div className="rounded-lg border-solid border-[1px] border-white/20 w-60 h-20 flex flex-row items-center justify-center mr-3">
            <img src="/sponsors/ScalingX.png" className="h-10" />
          </div>
          <div className="rounded-lg border-solid border-[1px] border-white/20 w-60 h-20 flex flex-row items-center justify-center mr-3">
            <img src="/sponsors/particleNetwork.png" className="h-10" />
          </div>
          <div className="rounded-lg border-solid border-[1px] border-white/20 w-60 h-20 flex flex-row items-center justify-center mr-3">
            <img src="/sponsors/Metatrust.png" className="h-10" />
          </div>
          <div className="rounded-lg border-solid border-[1px] border-white/20 w-60 h-20 flex flex-row items-center justify-center mr-3">
            <img src="/sponsors/seedao.png" className="h-10" />
          </div>
          <div className="rounded-lg border-solid border-[1px] border-white/20 w-60 h-20 flex flex-row items-center justify-center mr-3">
            <img src="/sponsors/cointime.png" className="h-10" />
          </div>
        </Marquee>
      </div>
    </div>
  );
}
