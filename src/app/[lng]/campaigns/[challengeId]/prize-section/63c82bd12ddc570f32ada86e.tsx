import PrizeList from "@/components/prize-list";
import SponsorsCell from "@/components/sponsor-marquee-cell";
import Marquee from "react-fast-marquee";
import Image from "next/image";

export function PrizeSection({ t, lng }: { t: Function; lng: string }) {
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        {t("cryptoArt.t5")}100k USD
      </h3>

      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            {t("cryptoArt.t6")}
          </p>
          <div className="hidden md:flex flex-row gap-12 items-center">
            <div className="flex flex-col gap-4 md:gap-7 items-center flex-wrap justify-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                {lng === "en" ? "DeFi and Payment" : "去中心化金融和支付"}
              </p>
              <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                  <Image
                    src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/img_v2_68065631-dbd9-4c44.png`}
                    alt="emoji"
                    width={160}
                    height={160}
                    className="w-full sm:w-40 sm:h-40"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center flex-wrap justify-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                {lng === "en" ? "NFT and Gaming" : "NFT和游戏"}
              </p>
              <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                  <Image
                    src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/img_v2eec8fa90ah+1.png`}
                    alt="emoji"
                    width={160}
                    height={160}
                    className="w-full sm:w-40 sm:h-40"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                {lng === "en" ? "AI, Social and DAO" : "AI、社交和 DAO"}
              </p>
              <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                  <Image
                    src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/img_v2-4cc8fa90ah+1.png`}
                    alt="emoji"
                    width={160}
                    height={160}
                    className="w-full sm:w-40 sm:h-40"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-row gap-12 items-center">
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                {lng === "en" ? "Infrastructure and Tooling" : "基础设施和工具"}
              </p>
              <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                  <Image
                    src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/img_v290ah+1.png`}
                    alt="emoji"
                    width={160}
                    height={160}
                    className="w-full sm:w-40 sm:h-40"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                {lng === "en" ? "General" : "综合"}
              </p>
              <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                  <Image
                    src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/img_v2_68065631-dbd9.png`}
                    alt=""
                    width={160}
                    height={160}
                    className="w-full sm:w-40 sm:h-40"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex md:hidden flex-col gap-12 items-center">
            <div className="flex flex-col gap-4 md:gap-7 items-center flex-wrap justify-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                {lng === "en" ? "DeFi and Payment" : "去中心化金融和支付"}
              </p>
              <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                  <Image
                    src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/img_v2_68065631-dbd9-4c44.png`}
                    alt="emoji"
                    width={160}
                    height={160}
                    className="w-full sm:w-40 sm:h-40"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center flex-wrap justify-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                {lng === "en" ? "NFT and Gaming" : "NFT和游戏"}
              </p>
              <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                  <Image
                    src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/img_v2eec8fa90ah+1.png`}
                    alt="emoji"
                    width={160}
                    height={160}
                    className="w-full sm:w-40 sm:h-40"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                {lng === "en" ? "AI, Social and DAO" : "AI、社交和 DAO"}
              </p>
              <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                  <Image
                    src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/img_v2-4cc8fa90ah+1.png`}
                    alt="emoji"
                    width={160}
                    height={160}
                    className="w-full sm:w-40 sm:h-40"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                {lng === "en" ? "Infrastructure and Tooling" : "基础设施和工具"}
              </p>
              <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                  <Image
                    src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/img_v290ah+1.png`}
                    alt="emoji"
                    width={160}
                    height={160}
                    className="w-full sm:w-40 sm:h-40"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
                {lng === "en" ? "General" : "综合"}
              </p>
              <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
                <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                  <Image
                    src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/img_v2_68065631-dbd9.png`}
                    alt=""
                    width={160}
                    height={160}
                    className="w-full sm:w-40 sm:h-40"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          {t("campaign.t26")}
        </p>
        <div className="relative w-full flex flex-col gap-10 items-center">
          <div className="hidden md:flex flex-row gap-[min(32px,2vw)]">
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3" style={{ color: "#fff" }}>
                    {lng === "en" ? "HK Finale Prize" : "香港总决赛大奖"}
                  </p>
                  <div className="flex flex-row justify-between">
                    <p className="body-3 text-white/60">$10,000 USD</p>
                    <p className="body-3 text-white/60">x5</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 md:gap-7 items-center">
              <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4">
                <div className="flex flex-col gap-1 w-full">
                  <p className="body-3" style={{ color: "#fff" }}>
                    {lng === "en" ? "Excellence Prize" : "卓越奖"}
                  </p>
                  <div className="flex flex-row justify-between">
                    <p className="body-3 text-white/60">$5,000 USD</p>
                    <p className="body-3 text-white/60">x10</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="w-[80%] flex-col flex gap-2 body-3 md:body-2 text-white/60 md:text-white/60">
          <li>
            <span className="text-white">10k USD ✖ 5: </span>
            <span>
              {lng === "en"
                ? "Each category has a final prize of $10,000. Category winners will be announced at the finale in Hong Kong and will be awarded in NEO tokens."
                : "每个赛道最终将选出一个获胜者团队，并在香港的总决赛中宣布。获胜者团队的奖金为 10,000 美元。"}
            </span>
          </li>
          <li>
            <span className="text-white">5k USD ✖ 10: </span>
            <span>
              {lng === "en"
                ? "In addition to the grand prize for the finale, the Neo APAC Hackathon offers additional rewards and benefits for participants in the offline events held in the five APAC cities leading up to the Hong Kong finale. During each offline event, two teams in attendance will be selected and honored with an Excellence Prize of $5,000."
                : "除了总决赛的大奖外，Neo 亚太区黑客马拉松还为参与者提供了额外的奖励和福利，这些将在香港总决赛前在五个亚太城市的线下活动中颁发。在每个城市的线下活动中，将选择两支参赛团队颁发“卓越奖”，并授予 5,000 美元的奖励。"}
            </span>
          </li>
          <li>
            <span>
              {lng === "en"
                ? "Moreover, the winners of the Excellence Prize, along with ten teams shortlisted from the online submissions, will receive travel grants to attend the Hong Kong finale. This support ensures that these teams can engage fully in the event, facilitating meaningful interactions and effective communication."
                : "此外，“卓越奖”的10支获奖团队，加上评审团从在线提交的项目中筛选出了8支入围团队，一共18支队伍将获得前往香港总决赛的旅行津贴。Neo 提供旅行津贴是为了确保优秀团队能够充分参与此次黑客松活动，促进与团队间深层互动和有效沟通。"}
            </span>
          </li>
          <li>
            <span>
              {lng === "en"
                ? "To foster innovation within Neo’s ecosystem and contribute to the prosperity of Web3 in APAC beyond the event itself, the Neo Foundation has earmarked a special post-Hackathon grant fund of $1 million to further support elite talents in the region discovered through the Neo APAC Hackathon."
                : "黑客松活动终究会落下帷幕，为了能在此次 Neo 亚太黑客马拉松活动后持续培养 Neo 生态系统内的创新，并为亚太地区的 Web3 繁荣做出贡献，Neo 基金会特别设立了一笔价值 100 万美元的“黑客松持续资助基金”，用以进一步支持在 Neo 亚太区黑客马拉松中发现的优秀人才和团队。"}
            </span>
          </li>
        </ul>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          {t("cryptoArt.t24")}
        </p>
        <Marquee>
          <SponsorsCell src={"/sponsors/neo.svg"} />
          <SponsorsCell src={"/sponsors/okx.png"} />
        </Marquee>
      </div>
    </div>
  );
}
