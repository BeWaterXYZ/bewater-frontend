const sponsors_tier1 = [
  '/sponsors/debox.png',
  '/sponsors/noncegeek.png',
  '/sponsors/bewater.png',
  '/sponsors/club3.png',
  '/sponsors/midaswap.png',
];

const sponsors_tier2 = [
  '/sponsors/vip3.png',
  '/sponsors/sinohope.png',
  '/sponsors/aionews.png',
  '/sponsors/tangdao.png',
  '/sponsors/wbsr.png',
  '/sponsors/blocknews.png',
  '/sponsors/element.png',
  '/sponsors/teia.png',
];

const sponsors_tier3 = [
  '/sponsors/amdao.png',
  '/sponsors/sf.png',
  '/sponsors/csdn.png',
  '/sponsors/moledao.png',
  '/sponsors/abga.png',
  '/sponsors/thuba.png',
  '/sponsors/lxdao.png',
  '/sponsors/tokeninsight.png',
  '/sponsors/nextme.png',
  '/sponsors/builderdao.png',
  '/sponsors/4seas.png',
  '/sponsors/movewave.png',
  '/sponsors/cryptosquare.png',
  '/sponsors/foresight.png',
  '/sponsors/panews.png',
  '/sponsors/icewhale.png',
  '/sponsors/dataverse.png',
  '/sponsors/blockbeats.png',
  '/sponsors/blockacademy.png',
  '/sponsors/catastrophy.png',
  '/sponsors/bitpush.png',
  '/sponsors/amphi.png',
  '/sponsors/cryptophd.png',
  '/sponsors/seedao.png',
];

export function Sponsors2() {
  return (
    <div>
      <h3 className="heading-5 md:heading-3 font-bold mb-16 text-center">
        赛事合作伙伴
      </h3>
      <div className="flex flex-col gap-12 items-center">
        <div className="flex flex-col gap-7 items-center">
          <p className="body-1 md:heading-6 font-bold text-white/30 md:text-white/30">
            联合出品方
          </p>
          <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
            {sponsors_tier1.map((src) => (
              <img src={src} key={src} className="h-8 md:h-10 mb-4 mx-4" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-7 items-center">
          <p className="body-1 md:heading-6 font-bold text-white/30 md:text-white/30">
            战略合作方
          </p>
          <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
            {sponsors_tier2.map((src) => (
              <img src={src} key={src} className="h-8 md:h-10 mb-4 mx-4" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-7 items-center">
          <p className="body-1 md:heading-6 font-bold text-white/30 md:text-white/30">
            {'战略媒体 & 社区'}
          </p>
          <div className="flex flex-row flex-wrap gap-0 items-center justify-center">
            {sponsors_tier3.map((src) => (
              <img src={src} key={src} className="h-8 md:h-10 mb-4 mx-4" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}