import PrizeList from '@/components/prize-list';
import SponsorsCell from '@/components/sponsor-marquee-cell';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

export function PrizeSection({ t, lng }: { t: Function; lng: string }) {
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        🏆 prizes //奖品
      </h3>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          本次黑客松不设评奖环节，但会有以下福利：
        </p>
        <ul className="w-[80%] flex-col flex gap-2 body-3 md:body-2 text-white/60 md:text-white/60">
          <li>
            <span className="text-day">✓ </span>
            <span>
              作为 Unity User Group 活动福利，Unity
              为所有参加的开发者准备了纪念礼品；
            </span>
          </li>
          <li>
            <span className="text-day">✓ </span>
            <span>
              亚马逊云科技云创计划为本次活动的初创公司提供免费的起步云资源和技术服务；
            </span>
          </li>
          <li>
            <span className="text-day">✓ </span>
            <span>
              现场产生的项目，将在 VRplay 的社区专题站 / 社交媒体 /
              视频节目中展示；
            </span>
          </li>
          <li>
            <span className="text-day">✓ </span>
            <span>
              在汇报环节，我们特别邀请了专注 XR 领域的投资人、Unity
              技术专家、资深苹果应用开发者和 VR
              游戏开发者与大家进行交流，嘉宾包括 徐梧 (真格基金) / Joanna (New
              Frontier Investment) / Nikk Mitchell (西顾) 等。
            </span>
          </li>
        </ul>
      </div>
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        🛠 platforms //开发平台
      </h3>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          我们整理推荐以下开发方案：
        </p>
        <ul className="w-[80%] flex-col flex gap-2 body-3 md:body-2 text-white/60 md:text-white/60">
          <li>
            <span className="text-day">🎮 Unity 开发者 </span>
            <span>
              Meta OpenXR 软件包实验版，这套由 OpenXR 标准和 Unity AR Foundation
              驱动的工具，可用于 Meta Quest
              全系产品开发，支持包括即将发售的具有更好彩色透视和混合现实功能的
              Meta Quest 3。测试方案推荐 Meta XR Simulator + Meta Quest 2 或
              Pro。
            </span>
          </li>
          <li>
            <span className="text-day">🍎 Apple 开发者 </span>
            <span>
              visionOS 软件开发包，由于支持 Apple Vision Pro 开发的 Unity
              测试版尚处内测阶段，推荐熟悉苹果平台的开发者，使用 visionOS SDK
              直接进行开发。下载 Xcode 15 beta 2、模拟器和 Reality Composer
              Pro，使用 SwiftUI、RealityKit、ARKit 等基础框架。
            </span>
          </li>
        </ul>
      </div>
      <p className="w-[80%] flex-col flex gap-2 body-3 md:body-2 text-white/60 md:text-white/60">
        我们将在现场提供一定数量的 Meta Quest 2 和 Quest
        Pro，供开发者用于调试测试和汇报演示，请善用模拟器。另外鼓励大家自带设备，也可选用除
        Quest 外的其他支持 MR 功能的设备，包括但不限于微软 HoloLens、Magic
        Leap、XREAL、Rokid、PICO 等。
      </p>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          {t('cryptoArt.t24')}
        </p>
        <Marquee>
          <SponsorsCell src={'/sponsors/vrplay.png'} />
          <SponsorsCell src={'/sponsors/unity-logo.svg'} />
          <SponsorsCell src={'/sponsors/mrhack_logo_cuc.jpg'} />
          <SponsorsCell src={'/sponsors/amazon.png'} />
        </Marquee>
      </div>
    </div>
  );
}
