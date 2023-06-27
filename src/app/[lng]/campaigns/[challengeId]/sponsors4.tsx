const sponsors_tier1 = ['/sponsors/ABCDE.png'];

const sponsors_tier2 = [
  '/sponsors/starkware.png',
  '/sponsors/starknet.png',
  '/sponsors/bewater.png',
  // '/sponsors/chainup.png',
];

const sponsors_tier3 = [
  '/sponsors/cysic.webp',
  '/sponsors/axiom.png',
  '/sponsors/poseidon.png',
  '/sponsors/web3builder.png',
  '/sponsors/lxdao.png',
  '/sponsors/clsq2_white.png',
  '/sponsors/0xPARC.png',
];

export function Sponsors4({ t }: { t: Function }) {
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
            Partnership:
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
