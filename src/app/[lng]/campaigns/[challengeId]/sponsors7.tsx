import { Aspect } from '@/components/aspect';
import Image from 'next/image';

const sponsors_tier2 = [
  '/sponsors/vrplay.png',
  '/sponsors/unity-logo.svg',
  '/sponsors/mrhack_logo_cuc.jpg',
  '/sponsors/amazon.png',
];

const sponsors_tier3 = [];

export function Sponsors7({ t }: { t: Function }) {
  return (
    <div>
      <h3 className="heading-5 md:heading-3 font-bold mb-16 text-center">
        赛事合作伙伴
      </h3>
      <div className="flex flex-col gap-12 items-center">
        <div className="flex flex-col gap-7 items-center">
          <p className="body-1 md:heading-6 font-bold text-white/30 md:text-white/30">
            组织者
          </p>
          <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
            <div key={'001'} className="w-[80px] mb-2 justify-center mx-3">
              <Aspect ratio={1 / 1}>
                <Image
                  height={80}
                  width={80}
                  src="/sponsors/7/people_pan-80x80.jpg"
                  className="object-cover w-full h-full"
                  alt=""
                />
              </Aspect>
              <p className="body-3 mt-4 mb-2">老潘</p>
              <p className="body-4 text-grey-400">VRplay</p>
            </div>
            <div key={'002'} className="w-[80px] mb-2 justify-center mx-3">
              <Aspect ratio={1 / 1}>
                <Image
                  height={80}
                  width={80}
                  src="/sponsors/7/people_liuyue-80x80.jpg"
                  className="object-cover w-full h-full"
                  alt=""
                />
              </Aspect>
              <p className="body-3 mt-4 mb-2">刘玥</p>
              <p className="body-4 text-grey-400">Unity</p>
            </div>
            <div key={'003'} className="w-[80px] mb-2 justify-center mx-3">
              <Aspect ratio={1 / 1}>
                <Image
                  height={80}
                  width={80}
                  src="/sponsors/7/people_yangyang-80x80.jpg"
                  className="object-cover w-full h-full"
                  alt=""
                />
              </Aspect>
              <p className="body-3 mt-4 mb-2">钱清泉</p>
              <p className="body-4 text-grey-400">IF Games</p>
            </div>
            <div key={'004'} className="w-[80px] mb-2 justify-center mx-3">
              <Aspect ratio={1 / 1}>
                <Image
                  height={80}
                  width={80}
                  src="/sponsors/7/people_ldd-80x80.jpg"
                  className="object-cover w-full h-full"
                  alt=""
                />
              </Aspect>
              <p className="body-3 mt-4 mb-2">东东</p>
              <p className="body-4 text-grey-400">极客电影</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-7 items-center">
          <p className="body-1 md:heading-6 font-bold text-white/30 md:text-white/30">
            联合主办方
          </p>
          <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
            {sponsors_tier2.map((src) => (
              <img src={src} key={src} className="h-8 md:h-10 mb-4 mx-4" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
