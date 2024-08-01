import PrizeList from "@/components/prize-list";
import SponsorsCell from "@/components/sponsor-marquee-cell";
import Marquee from "react-fast-marquee";
import Image from "next/image";

export function PrizeSection({ t, lng }: { t: Function; lng: string }) {
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        $26k total in prizes to be won !
      </h3>
      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            6 {t("cryptoArt.t6")}
          </p>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              Virtual Assistants and Chatbots
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    Develop intelligent virtual assistants and chatbots based on
                    AI & GPT technology for personalized services and support,
                    such as customer service and voice assistants.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              Professional Services
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    Utilize ChatGPT technology to enhance online education and
                    training experiences, develop intelligent tutoring systems,
                    learning companions, or language learning tools to provide
                    personalized learning support.
                  </li>
                  <br />
                  <li>
                    In the healthcare field, leverage AI & GPT technology to
                    offer medical consultations and health guidance, develop
                    intelligent medical assistants or patient communication
                    platforms to provide personalized healthcare services and
                    advice.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              Finance and Investment
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    Create AI & GPT-based financial assistants to provide
                    investment advice, financial planning, and personal finance
                    support, helping users make wiser financial decisions.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              Business and Marketing
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    Improve business communication and marketing using AI & GPT
                    technology. Develop intelligent sales assistants,
                    advertising idea generation tools, or social media marketing
                    assistants to provide personalized marketing support.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              AIGC + Web3
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    Enhance Web3 projects using AI & GPT technology. For
                    example, develop interpreters or visualization tools for
                    smart contracts using AI & GPT technology, assisting
                    developers and users in better understanding and operating
                    smart contracts, reducing errors, and enhancing the security
                    of smart contracts.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              Others
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>
                    Utilize AI & GPT technology to assist in creative and
                    artistic endeavors. Develop intelligent creative partners or
                    idea generation tools to provide creative inspiration and
                    suggestions.
                  </li>
                  <br />
                  <li>
                    In the realm of social media and entertainment, create
                    ChatGPT-based social media assistants or chat-based
                    entertainment applications to offer personalized
                    recommendations, interactions, and entertainment
                    experiences.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          Prize Introduction
        </p>
        <ul className="w-[80%] flex-col flex gap-2 body-3 md:body-2 text-white/60 md:text-white/60">
          <p className="body-3 md:body-2 text-white/60 md:text-white/60">
            Benefits of participating in the competition for projects:
          </p>
          <li>
            <span>
              1. Receive feedback from the judges to improve the start-up
              projects.
            </span>
          </li>
          <li>
            <span>
              2. Have the opportunity for potential investment in both rounds of
              the competition.
            </span>
          </li>
          <li>
            <span>
              3. Top-six projects will receive two free tickets to the AI Summit
              (one ticket is worth 500 SGD).
            </span>
          </li>
          <li>
            <span>
              4. Have the chance to win from a prize pool of up to 26,000 USD.
            </span>
          </li>
          <br />
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <div
              className="prizeList px-3 py-4 gap-3 md:px-5 md:py-7 md:gap-4"
              style={{ width: "30vw" }}
            >
              <div className="flex flex-col gap-1 w-full">
                <p className="body-3 ">First Prize</p>
                <div className="flex flex-row justify-between">
                  <p className="body-3 text-white/60">10000 U</p>
                  <p className="body-3 text-white/60">x1</p>
                </div>
              </div>
              <hr className="border-none bg-white/20 h-[0.5px] w-full" />
              <div className="flex flex-col gap-1 w-full">
                <p className="body-3 ">Second Prize</p>
                <div className="flex flex-row justify-between">
                  <p className="body-3 text-white/60">5000 U</p>
                  <p className="body-3 text-white/60">x2</p>
                </div>
              </div>
              <hr className="border-none bg-white/20 h-[0.5px] w-full" />
              <div className="flex flex-col gap-1 w-full">
                <p className="body-3 ">Third Prize</p>
                <div className="flex flex-row justify-between">
                  <p className="body-3 text-white/60">2000 U</p>
                  <p className="body-3 text-white/60">x3</p>
                </div>
              </div>
            </div>
          </div>
          <li>
            <span>5. Connect with outstanding peer projects.</span>
          </li>
          <li>
            <span>
              6. Gain a certain level of community visibility and influence
              through participating in the hackathon event.
            </span>
          </li>
        </ul>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          Co-Host
        </p>
        <Marquee>
          <SponsorsCell src={"/sponsors/cointime.png"} />
          <SponsorsCell src={"/sponsors/tintin_color_horizontal2.svg"} />
        </Marquee>
      </div>
    </div>
  );
}
