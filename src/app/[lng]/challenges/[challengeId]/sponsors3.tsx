const sponsors_tier1 = ['/sponsors/astro.png', '/sponsors/starknetsite.png'];

const sponsors_tier2 = [
  '/sponsors/starkware.png',
  '/sponsors/abcde.png',
  '/sponsors/bewater.png',
  '/sponsors/openbuild.png',
];

const sponsors_tier3 = [
  '/sponsors/foresight.png',
  '/sponsors/techflow.png',
  '/sponsors/panews.png',
  '/sponsors/lxdao.png',
  '/sponsors/debox.png',
  '/sponsors/antalpha.png',
  '/sponsors/denglian.png',
];

export function Sponsors3() {
  return (
    <div>
      <h3 className="heading-5 md:heading-3 font-bold mb-16 text-center">
        合作伙伴
      </h3>
      <div className="flex flex-col gap-12 items-center">
        <div className="flex flex-col gap-7 items-center">
          <p className="body-1 md:heading-6 font-bold text-white/30 md:text-white/30">
            活动发起社区
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
