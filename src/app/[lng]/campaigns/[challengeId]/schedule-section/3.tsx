import Image from 'next/image';

export function ScheduleSection() {
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        活动日程安排
      </h3>

      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4">
          <p className="body-1 md:heading-5 font-bold text-white md:text-white">
            DAY 1： Cairo 入门实践
          </p>
          <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
            6/23 13:00 ~ 17:00 (UTC+8)
          </p>
        </div>
        <div className="flex flex-col gap-4 md:gap-7 items-center">
          <div className="prizeList2 w-[303px] max-w-[800px] sm:w-[420px] lg:w-[600px] mx-5 px-10 py-10">
            <div className="flex z-[1] flex-col gap-4 lg:gap-6 w-full body-3 lg:font-secondary lg:body-0 lg:font-normal text-gray-300 lg:text-gray-300">
              <span>第一课：介绍 Starknet & Cairo 并部署开发环境</span>
              <hr className="border-none bg-white/20 h-[0.5px] w-full" />
              <span>第二课：Cairo 语言介绍 </span>
              <hr className="border-none bg-white/20 h-[0.5px] w-full" />

              <span>第三课：学习 ERC 标准在 Cairo 上的实现 (上) </span>
              <hr className="border-none bg-white/20 h-[0.5px] w-full" />

              <span>第四课：学习 ERC 标准在 Cairo 上的实现 (下) </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-12">
        <div className="flex flex-col items-center gap-4">
          <p className="body-1 md:heading-5 font-bold text-white md:text-white">
            DAY 2： Starknet 深度研究
          </p>
          <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
            6/24 13:00 ~ 17:00 (UTC+8)
          </p>
        </div>
        <div className="flex flex-col gap-4 md:gap-7 items-center">
          <div className="prizeList2 w-[303px] max-w-[800px] sm:w-[420px] lg:w-[600px] mx-5 px-10 py-10">
            <div className="flex z-[1] flex-col gap-4 lg:gap-6 w-full body-3 lg:font-secondary lg:body-0 lg:font-normal text-gray-300 lg:text-gray-300">
              <span>第一课：Kakarot & zkEVM</span>
              <hr className="border-none bg-white/20 h-[0.5px] w-full" />
              <span>第二课：STARK 证明</span>
              <hr className="border-none bg-white/20 h-[0.5px] w-full" />

              <span>第三课：Cairo VM</span>
              <hr className="border-none bg-white/20 h-[0.5px] w-full" />

              <span>第四课：排序器</span>
              <hr className="border-none bg-white/20 h-[0.5px] w-full" />

              <span>第五课：主题分享 + 自由讨论</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white md:text-white">
          活动地点
        </p>
        <div className="flex flex-row gap-2 md:gap-3 items-center">
          <div className="w-4 h-4 md:w-7 md:h-7">
            <svg
              className="w-full h-full"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.002 15.166C15.9349 15.166 17.502 13.599 17.502 11.666C17.502 9.73302 15.9349 8.16602 14.002 8.16602C12.069 8.16602 10.502 9.73302 10.502 11.666C10.502 13.599 12.069 15.166 14.002 15.166Z"
                stroke="#00CCCC"
                stroke-width="2.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.0013 2.33301C11.5259 2.33301 9.15198 3.31634 7.40164 5.06668C5.6513 6.81702 4.66797 9.19099 4.66797 11.6663C4.66797 13.8737 5.13697 15.318 6.41797 16.9163L14.0013 25.6663L21.5846 16.9163C22.8656 15.318 23.3346 13.8737 23.3346 11.6663C23.3346 9.19099 22.3513 6.81702 20.601 5.06668C18.8506 3.31634 16.4767 2.33301 14.0013 2.33301Z"
                stroke="#00CCCC"
                stroke-width="2.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>

          <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
            上海市长宁区淮海西路 666 号中山万博国际中心 6 楼
          </p>
        </div>
        <Image
          src="/challenge/assets/building.jpeg"
          width={800}
          height={600}
          className="px-20"
          alt="building"
        />
      </div>
    </div>
  );
}
