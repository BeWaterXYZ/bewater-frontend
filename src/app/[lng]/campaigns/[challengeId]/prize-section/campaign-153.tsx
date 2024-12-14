import Marquee from "react-fast-marquee";
import { Fragment } from "react";
import { formatMoney } from "@/utils/numeral";
import getSymbolFromCurrency from "currency-symbol-map";
import Link from "next/link";
import Image from "next/image";

export function PrizeSection({
  t,
  lng,
  challenge,
}: {
  t: Function;
  lng: string;
  challenge: any;
}) {
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center max-w-[800px]">
        Total Awards: $1,000,000 equivalent in DuckChain Tokens distributed
        after TGE
      </h3>
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            5 {t("cryptoArt.t6")}
          </p>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              Meme
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                This track celebrates the creative power of memes in driving
                community engagement and culture within Web3. Participants are
                encouraged to design meme-centric dApps or platforms that enable
                users to create, trade, and share viral content. The focus is on
                combining humor, creativity, and blockchain technology to
                amplify the cultural impact of memes, fostering stronger
                community bonds and innovative monetization models on DuckChain.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              DeFi
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                Focus on creating decentralized finance (DeFi) applications
                built on DuckChain, particularly those that leverage stablecoins
                for financial products like lending, staking, or yield farming.
                This track encourages projects that make DeFi more accessible,
                secure, and efficient for both retail and institutional users.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              Telegram-Powered dApps
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                Develop dApps and infrastructure tools designed for the Telegram
                ecosystem, including Telegram-based mini apps, bots, or gaming
                experiences. As Telegram continues to grow as a hub for Web3
                communities, this track will focus on making it easier for users
                to engage with blockchain through the Telegram interface.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              Artificial Intelligence (AI)
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full body-3 text-white/60">
                Leverage artificial intelligence (AI) to create new dApps or
                improve existing blockchain infrastructure. This track explores
                applications where AI can enhance DeFi, NFT platforms, Meme
                culture, and even decentralized science (DeSci).
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center">
              Infrastructure
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex flex-col gap-5 w-full body-3 text-white/60 z-10 [&_a]:border-b [&_a]:border-b-white/60 [&_a]:break-all">
                Innovate with new forms of infrastructure that drive real-world
                impact in sectors like decentralized science (DeSci),
                decentralized social networks (DeSoc), and decentralized
                bioinformatics (DeBio). This track emphasizes solutions that
                support broader societal impact through the power of blockchain
                and DuckChain’s features.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          Prizes
        </p>
        <div className="flex flex-row flex-wrap items-top gap-16 p-8">
          <div className="flex-1 flex flex-col items-center gap-10 min-w-[200px]">
            <div className="flex flex-row gap-[min(32px,2vw)]">
              <div className="flex flex-col gap-4 md:gap-7 items-center">
                <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center h-16">
                  The Golden Duck Prize Pool
                  <br />
                  $500,000
                </p>
                <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4 min-w-[200px] h-full">
                  <div className="flex flex-col gap-1 w-full">
                    <p className="body-3 text-white whitespace-nowrap">Top 1</p>
                    <div className="flex flex-row justify-between">
                      <p className="body-3 text-white/60">$200,000</p>
                      <p className="body-3 text-white/60">x1</p>
                    </div>
                  </div>
                  <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                  <div className="flex flex-col gap-1 w-full">
                    <p className="body-3 text-white whitespace-nowrap">Top 2</p>
                    <div className="flex flex-row justify-between">
                      <p className="body-3 text-white/60">
                        $100,000
                        <br />
                        per project
                      </p>
                      <p className="body-3 text-white/60">x2</p>
                    </div>
                  </div>
                  <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                  <div className="flex flex-col gap-1 w-full">
                    <p className="body-3 text-white whitespace-nowrap">Top 3</p>
                    <div className="flex flex-row justify-between">
                      <p className="body-3 text-white/60">
                        $50,000
                        <br />
                        per project
                      </p>
                      <p className="body-3 text-white/60">x2</p>
                    </div>
                  </div>
                  <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                </div>
              </div>
              <div className="flex flex-col gap-4 md:gap-7 items-center">
                <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center h-16">
                  The Quack-tastic Mentions
                  <br />
                  $200,000
                </p>
                <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4 min-w-[200px] h-full">
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex flex-col justify-between">
                      <p className="body-3 text-white/60">
                        $200,000 pool distributed among all selected projects
                      </p>
                      <p className="body-3 text-white/60 text-end">Multiple</p>
                    </div>
                  </div>
                  <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                </div>
              </div>
              <div className="flex flex-col gap-4 md:gap-7 items-center">
                <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc] text-center h-16">
                  The Duckling Star Award
                  <br />
                  $50,000
                </p>
                <div className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4 min-w-[200px] h-full">
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex flex-row justify-between">
                      <p className="body-3 text-white/60">$50,000</p>
                      <p className="body-3 text-white/60 text-end">Multiple</p>
                    </div>
                  </div>
                  <hr className="border-none bg-white/20 h-[0.5px] w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {(challenge.keySponsors ?? []).length > 0 ? (
        <div className="relative w-full flex flex-col gap-10 items-center">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            {t("campaign.t29")}
          </p>
          <Marquee>
            {(challenge.keySponsors ?? []).map((sp: string, i: any) => {
              return (
                <div
                  className="rounded-lg border-solid border-[1px] border-white/20 w-48 h-16 md:w-60 md:h-20 flex flex-row items-center justify-center mr-3"
                  key={i}
                >
                  {/* // fixme/ */}
                  <Image
                    src={sp}
                    className="h-8 md:h-10 w-fit"
                    alt="Sponsors"
                    height={32}
                    width={0}
                  />
                </div>
              );
            })}
          </Marquee>
        </div>
      ) : null}
    </div>
  );
}
