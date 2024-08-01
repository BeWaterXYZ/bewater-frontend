import PrizeList from "@/components/prize-list";
import SponsorsCell from "@/components/sponsor-marquee-cell";
import Marquee from "react-fast-marquee";
import Image from "next/image";

export function PrizeSection({ t, lng }: { t: Function; lng: string }) {
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        赛事奖励：$14,5k USD
      </h3>
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            {t("cryptoArt.t6")}
          </p>
          <div className="flex flex-row gap-[min(32px,2vw)] ">
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                Infra 组
              </p>
              <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">组件</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">网关</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">存储</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">开发工具</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">开发平台</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">钱包</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">DeFi</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">...</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                应用组
              </p>
              <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">数据分析</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">教育</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">邮件</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">公益</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">DAO</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">SocialFi</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">NFT</p>
                </div>
                <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3 ">...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          {t("campaign.t19")}
        </p>
        <div className="w-[80%] flex-col flex gap-2 body-3 md:body-2 text-white/60 md:text-white/60">
          <p className="body-3 md:body-2 text-white/60 md:text-white/60">
            本次赛事将设立多个奖项，以表彰各参赛项目的出色表现。其中，总分最高的项目将获得
            <span style={{ color: "#00cccc" }}>“生态新秀奖”</span>
            。其他项目则根据各自所属赛道的排名情况来确定获奖名次。具体而言，第一名将获得
            <span style={{ color: "#00cccc" }}>“潜力无限奖”</span>，第二名将获得
            <span style={{ color: "#00cccc" }}>“初露锋芒奖”</span>
            ，第三名和第四名将获得
            <span style={{ color: "#00cccc" }}>“最佳参与奖”</span>
            ，而在“生态新秀奖”所在赛道中，第五名也将获得“最佳参与奖”。
          </p>
          <br />
        </div>
        <div className="flex flex-row gap-[min(32px,2vw)] ">
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4">
              <div className="flex flex-col gap-1 w-full">
                <p className="body-3" style={{ color: "#00cccc" }}>
                  生态新秀奖
                </p>
                <div className="flex flex-row justify-between">
                  <p className="body-3 text-white/60">$5000 USD</p>
                  <p className="body-3 text-white/60">x1</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4">
              <div className="flex flex-col gap-1 w-full">
                <p className="body-3" style={{ color: "#00cccc" }}>
                  潜力无限奖
                </p>
                <div className="flex flex-row justify-between">
                  <p className="body-3 text-white/60">$3000 USD</p>
                  <p className="body-3 text-white/60">x2</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4">
              <div className="flex flex-col gap-1 w-full">
                <p className="body-3" style={{ color: "#00cccc" }}>
                  初露锋芒奖
                </p>
                <div className="flex flex-row justify-between">
                  <p className="body-3 text-white/60">$1000 USD</p>
                  <p className="body-3 text-white/60">x2</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4">
              <div className="flex flex-col gap-1 w-full">
                <p className="body-3" style={{ color: "#00cccc" }}>
                  最佳参与奖
                </p>
                <div className="flex flex-row justify-between">
                  <p className="body-3 text-white/60">$300 USD</p>
                  <p className="body-3 text-white/60">x5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          Co-Host
        </p>
        <Marquee>
          <SponsorsCell src={"/sponsors/PermaDAO-2.png"} />
          <SponsorsCell src={"/sponsors/Arweave.png"} />
          <SponsorsCell src={"/sponsors/tintin_color_horizontal2.svg"} />
        </Marquee>
      </div>
    </div>
  );
}
