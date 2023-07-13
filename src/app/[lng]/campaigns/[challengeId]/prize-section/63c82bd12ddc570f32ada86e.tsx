import PrizeList from '@/components/prize-list';
import SponsorsCell from '@/components/sponsor-marquee-cell';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

export function PrizeSection({ t, lng }: { t: Function; lng: string }) {
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        {t('cryptoArt.t5')}100k USD
      </h3>

      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            {t('cryptoArt.t6')}
          </p>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              {lng === 'en' ? 'DeFi and Payment' : '去中心化金融和支付'}
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <Image
                  src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/defi_20230713173307.png`}
                  alt="emoji"
                  width={160}
                  height={160}
                  className="w-full sm:w-40 sm:h-40"
                />
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    {lng === 'en'
                      ? ''
                      : '去中心化金融（DeFi）是WEB3.0时代的金融创新，它基于区块链技术，通过智能合约和去中心化的应用程序，实现了金融服务的去中心化和自动化。'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              {lng === 'en' ? 'NFT and Gaming' : 'NFT和游戏'}
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <Image
                  src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/nft_20230713174015.png`}
                  alt="emoji"
                  width={160}
                  height={160}
                  className="w-full sm:w-40 sm:h-40"
                />
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    {lng === 'en'
                      ? ''
                      : '区块链游戏结合了区块链技术、加密货币和游戏机制，创造了一个虚拟的游戏世界。这些游戏通常在游戏环境中使用NFT——纳入游戏规则、玩家互动或作为奖励系统——从玩家的头像到武器、装备、皮肤或土地。'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              {lng === 'en'
                ? 'AI, Social and DAO'
                : '人工智能（AI）、社交和去中心化自治组织（DAO）'}
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <Image
                  src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/ai_20230713174616.png`}
                  alt="emoji"
                  width={160}
                  height={160}
                  className="w-full sm:w-40 sm:h-40"
                />
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    {lng === 'en'
                      ? ''
                      : '使用区块链技术，可以创建一个公平公正的去中心化数据系统。这意味着人工智能系统可以在代表各种经验和观点的数据上进行训练，从而实现更准确和公平的决策。'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              {lng === 'en' ? 'Infrastructure and Tooling' : '基础设施和工具'}
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <Image
                  src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/tool20230713175848.png`}
                  alt="emoji"
                  width={160}
                  height={160}
                  className="w-full sm:w-40 sm:h-40"
                />
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    {lng === 'en'
                      ? ''
                      : '构建基础层区块链网络，以满足对大规模去中心化应用程序日益增长的需求，实现更多的链上可编程性并以轻量级和动态的方式实现定制功能。'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              {lng === 'en' ? 'General' : '综合'}
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <Image
                  src={`https://bewater-static.s3.ap-southeast-1.amazonaws.com/yunying/all_20230713182408.png`}
                  alt=""
                  width={160}
                  height={160}
                  className="w-full sm:w-40 sm:h-40"
                />
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    {lng === 'en'
                      ? ''
                      : '无论是一个想法，一次洞见，一套系统，能够提高透明度和协作效率。想法之间排列组合，解决实际问题。应用范围从不起眼到人人离不开。'}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          {t('cryptoArt.t17')}
        </p>
        <ul className="w-[80%] flex-col flex gap-2 body-3 md:body-2 text-white/60 md:text-white/60">
          <li>
            <span className="text-white">10k USD ✖ 5: </span>
            <span>
              {lng === 'en'
                ? 'Each category has a final prize of $10,000. Category winners will be announced at the finale in Hong Kong and will be awarded in NEO tokens.'
                : '每个赛道最终将选出一个获胜者团队，并在香港的总决赛中宣布。获胜者团队的奖金为 10,000 美元。'}
            </span>
          </li>
          <li>
            <span className="text-white">5k USD ✖ 10: </span>
            <span>
              {lng === 'en'
                ? 'In addition to the grand prize for the finale, the Neo APAC Hackathon offers additional rewards and benefits for participants in the offline events held in the five APAC cities leading up to the Hong Kong finale. During each offline event, two teams in attendance will be selected and honored with an Excellence Prize of $5,000.'
                : '除了总决赛的大奖外，Neo 亚太区黑客马拉松还为参与者提供了额外的奖励和福利，这些将在香港总决赛前在五个亚太城市的线下活动中颁发。在每个城市的线下活动中，将选择两支参赛团队颁发“卓越奖”，并授予 5,000 美元的奖励。'}
            </span>
          </li>
          <li>
            <span>
              {lng === 'en'
                ? 'Moreover, the winners of the Excellence Prize, along with ten teams shortlisted from the online submissions, will receive travel grants to attend the Hong Kong finale. This support ensures that these teams can engage fully in the event, facilitating meaningful interactions and effective communication.'
                : '此外，“卓越奖”的10支获奖团队，加上评审团从在线提交的项目中筛选出了8支入围团队，一共18支队伍将获得前往香港总决赛的旅行津贴。Neo 提供旅行津贴是为了确保优秀团队能够充分参与此次黑客松活动，促进与团队间深层互动和有效沟通。'}
            </span>
          </li>
          <li>
            <span>
              {lng === 'en'
                ? 'To foster innovation within Neo’s ecosystem and contribute to the prosperity of Web3 in APAC beyond the event itself, the Neo Foundation has earmarked a special post-Hackathon grant fund of $1 million to further support elite talents in the region discovered through the Neo APAC Hackathon.'
                : '黑客松活动终究会落下帷幕，为了能在此次 Neo 亚太黑客马拉松活动后持续培养 Neo 生态系统内的创新，并为亚太地区的 Web3 繁荣做出贡献，Neo 基金会特别设立了一笔价值 100 万美元的“黑客松持续资助基金”，用以进一步支持在 Neo 亚太区黑客马拉松中发现的优秀人才和团队。'}
            </span>
          </li>
        </ul>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          {t('cryptoArt.t24')}
        </p>
        <Marquee>
          <SponsorsCell src={'/sponsors/neo.svg'} />
          <SponsorsCell src={'/sponsors/okx.png'} />
        </Marquee>
      </div>
    </div>
  );
}
