import PrizeList from '@/components/prize-list';
import SponsorsCell from '@/components/sponsor-marquee-cell';
import Marquee from 'react-fast-marquee';

export function PrizeSection() {
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        赛道设置
      </h3>

      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          {/* <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            主赛道 A - 应用类
          </p> */}
          <div className="flex flex-row gap-[min(32px,2vw)] ">
            <PrizeList title="🎭 表情包" />
            <PrizeList title="👤 PFP" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-10">
          {/* <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            主赛道 B - 基础设施类
          </p> */}
          <div className="flex flex-row gap-[min(32px,2vw)] ">
            <PrizeList title="💻 ProgrammingGC" />
            <PrizeList title="🎨 像素画" />
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          更多奖励
        </p>
        <ul className="w-[80%] flex-col flex gap-2 body-3 md:body-2 text-white/60 md:text-white/60">
          <li>
            <span className="text-white">作品展示：</span>
            <span>
              获奖作品和团队将被展示在 6 月 24 日晚的 ETH Shanghai Cocktail
              Party，由 BeWater 倾力举办。
            </span>
          </li>
          <li>
            <span className="text-white">作品上链：</span>
            <span>
              每个赛道的前三名作品将以 ERC-721 (NFT)
              形式上链，并作为同一个系列，后续可通过社区组织相关的拍卖，获奖所得将全部提供给设计师。
            </span>
          </li>
          <li>
            <span className="text-white">奖金和 Token：</span>
            <span>
              DeBox 将提供 vDBX，同时还包括其他多个合作伙伴的赞助，包括
              USDT、NFT 白名单以及对应平台 token，更多详情敬请期待。
            </span>
          </li>
          <li>
            <span className="text-white">作品推广：</span>
            <span>
              本次赛事将联合多个合作方进行宣传，为参赛作品提供十万量级的曝光。
            </span>
          </li>
        </ul>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          赛事联合出品方
        </p>
        <Marquee>
          <SponsorsCell src={'/sponsors/debox.png'} />
          <SponsorsCell src={'/sponsors/noncegeek.png'} />
          <SponsorsCell src={'/sponsors/bewater.png'} />
        </Marquee>
      </div>
    </div>
  );
}
