import PrizeList from '@/components/prize-list';
import SponsorsCell from '@/components/sponsor-marquee-cell';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

export function PrizeSection({ t }: { t: Function }) {
  return (
    <div className="flex flex-col items-center py-20 px-0 gap-20 bg-[radial-gradient(210%_100%_at_50%_0%,_var(--tw-gradient-stops))] from-day/[0.15] via-night/0 to-day/[0.15] rounded-xl border-solid border-[1px] border-midnight">
      <h3 className="heading-5 md:heading-3 text-day md:text-day [text-shadow:0_4px_36px_rgba(0_255_255_/_0.4)] text-center">
        {t('cryptoArt.t5')}vDBX + HNX + USDT
      </h3>

      <div className="flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-10">
          <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
            {t('cryptoArt.t6')}
          </p>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              🎭 {t('cryptoArt.t7')}
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
                  <li>{t('cryptoArt.t8')}</li>
                  <br />
                  <li>{t('cryptoArt.t9')}</li>
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
                  <li>{t('cryptoArt.t10')}</li>
                  <br />
                  <li>{t('cryptoArt.t11')}</li>
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
                  <li>{t('cryptoArt.t12')}</li>
                  <br />
                  <li>{t('cryptoArt.t13')}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              {t('cryptoArt.t14')}
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
                  <li>{t('cryptoArt.t15')}</li>
                  <br />
                  <li>{t('cryptoArt.t16')}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-7 items-center">
            <p className="body-3 md:body-1 uppercase text-[#00cccc] md:text-[#00cccc]">
              {t('cryptoArt.t25')}
            </p>
            <div className="prizeList2 w-auto max-w-[620px] mx-5 px-5 py-5">
              <div className="flex z-[1] flex-col sm:flex-row items-center gap-5 w-full">
                <Image
                  src={`/challenge/assets/digitalart.jpg`}
                  alt=""
                  width={160}
                  height={160}
                  className="w-full sm:w-40 sm:h-40"
                />
                <ul className="body-3 text-white/60 list-disc list-inside">
                  <li>{t('cryptoArt.t26')}</li>
                  <br />
                  <li>{t('cryptoArt.t27')}</li>
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
            <span className="text-white">{t('cryptoArt.t18')}</span>
            <span>{t('cryptoArt.t19')}</span>
          </li>
          <li>
            <span className="text-white">{t('cryptoArt.t20')}</span>
            <span>{t('cryptoArt.t21')}</span>
          </li>
          <li>
            <span className="text-white">{t('cryptoArt.t22')}</span>
            <span>{t('cryptoArt.t23')}</span>
          </li>
        </ul>
      </div>
      <div className="relative w-full flex flex-col gap-10 items-center">
        <p className="body-1 md:heading-5 font-bold text-white/30 md:text-white/30">
          {t('cryptoArt.t24')}
        </p>
        <Marquee>
          <SponsorsCell src={'/sponsors/debox.png'} />
          <SponsorsCell src={'/sponsors/noncegeek.png'} />
          <SponsorsCell src={'/sponsors/bewater.png'} />
          <SponsorsCell src={'/sponsors/club3.png'} />
          <SponsorsCell src={'/sponsors/midaswap.png'} />
          <SponsorsCell src={'/sponsors/tutulogo.png'} />
        </Marquee>
      </div>
    </div>
  );
}
