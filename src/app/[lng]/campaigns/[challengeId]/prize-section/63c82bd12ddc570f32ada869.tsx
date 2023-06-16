import PrizeList from '@/components/prize-list';
import SponsorsCell from '@/components/sponsor-marquee-cell';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

export function PrizeSection() {
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        赛事奖励：vDBX + USDT
      </h3>

      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            赛道设置
          </p>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              🎭 表情包
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <Image
                  src={`/challenge/assets/emojis.png`}
                  alt="emoji"
                  width={160}
                  height={160}
                  className="w-full sm:w-40 sm:h-40"
                />
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    展示你的幽默和创意，不限定主题，推荐主题包括
                    “韭菜的自我修养”、“行走在熊市”、基于 DeBox 四款 NFT
                    企鹅、小鹰、小蛇、小兔子相关的萌物生活、DeBox
                    与影视作品相关段子，例如 DeBox 赌神、梭哈等。
                  </li>
                  <br />
                  <li>
                    我们建议参赛选手以组为单位制作表情包，一组约含4个表情包，越多越好。手工而非
                    AI 制作的表情包将额外加分哦！
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              👤 PFP
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <Image
                  src={`/challenge/assets/pfp.png`}
                  alt="emoji"
                  width={160}
                  height={160}
                  className="w-full sm:w-40 sm:h-40"
                />
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    展示你的个性和风格，不限主题，推荐主题包括 “DeBox 四款 NFT
                    的 PFP 重构”、“下一款蓝筹 PFP”、“社交类 PFP的形象”。手工而非
                    AI 制作的 PFP 将获得额外加分。
                  </li>
                  <br />
                  <li>
                    设计师提交 PFP 时，需要提交至少 4 个同系列的
                    PFP，并提供相应拆解的组件。同时，我们希望你能为每个PFP提供相关的世界观、故事以及创作过程中的插曲故事，通过文字故事与
                    PFP 艺术结合，赋予 PFP 作品更多的内涵意义。
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              💻 PROGRAMMINGGC
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <Image
                  src={`/challenge/assets/programminggc.png`}
                  alt="emoji"
                  width={160}
                  height={160}
                  className="w-full sm:w-40 sm:h-40"
                />
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    分形艺术的介绍请参考这里 https://zh.wikipedia.org/zh-tw/分形
                  </li>
                  <br />
                  <li>
                    必须借助程序生成，我们鼓励艺术家们和程序员进行合作，通过程序生成令人惊叹的艺术作品，探索分形艺术的魅力。
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              🎨 像素风{' '}
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <Image
                  src={`/challenge/assets/pixel.png`}
                  alt="emoji"
                  width={160}
                  height={160}
                  className="w-full sm:w-40 sm:h-40"
                />
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    展示你对经典像素艺术的热爱，手工而非 AI
                    制作的像素艺术作品将额外加分。
                  </li>
                  <br />
                  <li>画布限定尺寸为 16x16、32x32、64x64、128x128。 </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          更多奖励
        </p>
        <ul className="w-[80%] flex-col flex gap-2 body-3 md:body-2 text-white/60 md:text-white/60">
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
          <SponsorsCell src={'/sponsors/club3.png'} />
          <SponsorsCell src={'/sponsors/midaswap.png'} />
        </Marquee>
      </div>
    </div>
  );
}
