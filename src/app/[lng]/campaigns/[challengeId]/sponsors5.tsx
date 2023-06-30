const sponsors_tier1 = [
  '/sponsors/moledao.png',
  '/sponsors/gair_logo.png',
  '/sponsors/leiphone.png',
];

const sponsors_tier2 = [
  '/sponsors/cointime.png',
  '/sponsors/tintin_color_horizontal2.svg',
];

const sponsors_tier3 = [
  '/sponsors/ventureflow.png',
  '/sponsors/knn3.png',
  '/sponsors/blockpi.png',
];

const sponsors_tier4 = [
  '/sponsors/foresightnews.png',
  '/sponsors/marsbit.png',
  '/sponsors/jscj.png',
  '/sponsors/xhw.png',
  '/sponsors/fhw.png',
  '/sponsors/dqkx.png',
  '/sponsors/tencent.png',
  '/sponsors/kjpl.png',
  '/sponsors/jjz.png',
  '/sponsors/xzj.png',
];

const sponsors_tier5 = [
  '/sponsors/seedao.png',
  '/sponsors/helpgrow.png',
  '/sponsors/lxdao.png',
  '/sponsors/smuailab.png',
  '/sponsors/nusfintechsociety.png',
  '/sponsors/qndao.png',
  '/sponsors/suwa.png',
  '/sponsors/bca.png',
  '/sponsors/permadao.png',
  '/sponsors/thuba.png',
  '/sponsors/clsq2_white.png',
];

export function Sponsors5({ t }: { t: Function }) {
  return (
    <div>
      <h3 className="heading-5 md:heading-3 font-bold mb-16 text-center">
        Partnership
      </h3>
      <div className="flex flex-col gap-12 items-center">
        <div className="flex flex-col gap-7 items-center">
          <p className="body-1 md:heading-6 font-bold text-white/30 md:text-white/30">
            Host:
          </p>
          <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
            {sponsors_tier1.map((src) => (
              <img src={src} key={src} className="h-8 md:h-10 mb-4 mx-4" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-7 items-center">
          <p className="body-1 md:heading-6 font-bold text-white/30 md:text-white/30">
            Co-Host:
          </p>
          <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
            {sponsors_tier2.map((src) => (
              <img src={src} key={src} className="h-8 md:h-10 mb-4 mx-4" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-7 items-center">
          <p className="body-1 md:heading-6 font-bold text-white/30 md:text-white/30">
            Sponsor:
          </p>
          <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
            {sponsors_tier3.map((src) => (
              <img src={src} key={src} className="h-8 md:h-10 mb-4 mx-4" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-7 items-center">
          <p className="body-1 md:heading-6 font-bold text-white/30 md:text-white/30">
            Media Partner:
          </p>
          <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
            {sponsors_tier4.map((src) => (
              <img src={src} key={src} className="h-8 md:h-10 mb-4 mx-4" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-7 items-center">
          <p className="body-1 md:heading-6 font-bold text-white/30 md:text-white/30">
            Community Partner:
          </p>
          <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
            {sponsors_tier5.map((src) => (
              <img src={src} key={src} className="h-8 md:h-10 mb-4 mx-4" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
