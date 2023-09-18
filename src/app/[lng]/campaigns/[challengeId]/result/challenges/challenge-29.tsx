import Image from 'next/image';
import { ResultCard } from '../result-card';
import '../style.css';
const winners = [
  {
    track: undefined,
    icon: undefined,
    teams: ['262', '298', '224', '294', '205', '292'],
    scores: [undefined, undefined, undefined],
  },
];
export default function Page({ params }: any) {
  const { lng = 'en' } = params || {};

  return (
    <>
      <div className="flex justify-center">
        <div className="relative body-2 text-center my-10 p-6 m-auto">
          ✨ 6 of over 51 teams won a total prize pool of{' '}
          <span className="text-day">$70,000</span>{' '}
          <div
            className="absolute w-full h-[1px] bottom-0 left-0"
            style={{ background: 'linear-gradient(to right, #01DCBA,#7F30CB' }}
          ></div>
        </div>
      </div>
      {winners.map((w) => {
        return (
          <div className="container" key={w.track}>
            <h2 className="text-center heading-4 my-4 mt-24">{w.icon}</h2>
            <h2 className="text-center heading-4 my-4 ">{w.track}</h2>
            <p className="rp-text-gradient body-2 text-center my-4 mb-8 ">
              $70,000 Granted to 6 projects
            </p>
            {/* first place  */}
            <div
              className="relative w-full  pb-16 md:pb-10 p-10  rounded-xl flex flex-col items-center "
              style={{
                background:
                  ' radial-gradient(23.73% 61.17% at 8.02% 11.08%, rgba(48, 83, 209, 0.3) 0%, rgba(34, 131, 187, 0) 99.99%, rgba(34, 132, 187, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(101.29% 198.2% at 50% -98.2%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 81.45%, rgba(0, 0, 0, 0.4) 100%), radial-gradient(173.35% 1719.94% at 4.11% 93%, #080336 0%, #7406CB 68.23%, #6B1162 100%)',
              }}
            >
              <div
                className="relative h-[216px]  w-full flex justify-center"
                style={{}}
              >
                <Image
                  src={'/icons/medal-1.png'}
                  alt="github"
                  fill
                  className="object-contain"
                />
              </div>
              <ResultCard
                teamId={w.teams[0]}
                thumbnail
                score={w.scores[0]}
                lng={lng}
              />
              <div className="absolute md:static md:pt-8 w-full flex justify-center md:w-auto bottom-4 left-4">
                <div className="p-2 px-4 text-white/30 body-3 bg-white/5 rounded-full ">
                  $30,000
                </div>
              </div>
            </div>

            <div className="relative my-8 w-full flex flex-col  gap-8">
              {/* second place */}
              <div
                className="relative w-full pb-16 md:pb-10 p-10  rounded-xl flex flex-wrap  justify-center md:justify-between"
                style={{
                  background:
                    'linear-gradient(256.33deg, #0C1E60 0.53%, #190E38 100%)',
                }}
              >
                <div
                  className="relative flex-1  h-[216px] md:h-auto  flex justify-center"
                  style={{}}
                >
                  <Image
                    src={'/icons/medal-2.png'}
                    alt="github"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <ResultCard
                    teamId={w.teams[1]}
                    thumbnail
                    score={w.scores[1]}
                    lng={lng}
                  />
                </div>
                <div className="absolute w-full flex justify-center md:w-auto bottom-4 left-4">
                  <div className="p-2 px-4 text-white/30 body-3 bg-white/5 rounded-full ">
                    $10,000
                  </div>
                </div>
              </div>
              <div
                className="relative w-full pb-16 md:pb-10 p-10  rounded-xl flex flex-wrap  justify-center md:justify-between"
                style={{
                  background:
                    'linear-gradient(256.33deg, #0C1E60 0.53%, #190E38 100%)',
                }}
              >
                <div
                  className="relative flex-1  h-[216px] md:h-auto  flex justify-center"
                  style={{}}
                >
                  <Image
                    src={'/icons/medal-2.png'}
                    alt="github"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <ResultCard
                    teamId={w.teams[2]}
                    thumbnail
                    score={w.scores[2]}
                    lng={lng}
                  />
                </div>
                <div className="absolute w-full flex justify-center md:w-auto bottom-4 left-4">
                  <div className="p-2 px-4 text-white/30 body-3 bg-white/5 rounded-full ">
                    $10,000
                  </div>
                </div>
              </div>
              {/* third place */}

              <div
                className="relative w-full pb-16 md:pb-10  p-10 rounded-xl flex flex-wrap  justify-center md:justify-between"
                style={{
                  background:
                    'linear-gradient(256.33deg, #06385B 0.53%, #0F0E38 100%)',
                }}
              >
                <div
                  className=" relative flex-1 h-[216px] md:h-auto  flex justify-center"
                  style={{}}
                >
                  <Image
                    src={'/icons/medal-3.png'}
                    alt="github"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <ResultCard
                    teamId={w.teams[3]}
                    thumbnail
                    score={w.scores[3]}
                    lng={lng}
                  />
                </div>
                <div className="absolute w-full flex justify-center md:w-auto bottom-4 left-4">
                  <div className="p-2 px-4 text-white/30 body-3 bg-white/5 rounded-full ">
                    $5,000
                  </div>
                </div>
              </div>
              <div
                className="relative w-full pb-16 md:pb-10  p-10 rounded-xl flex flex-wrap  justify-center md:justify-between"
                style={{
                  background:
                    'linear-gradient(256.33deg, #06385B 0.53%, #0F0E38 100%)',
                }}
              >
                <div
                  className=" relative flex-1 h-[216px] md:h-auto  flex justify-center"
                  style={{}}
                >
                  <Image
                    src={'/icons/medal-3.png'}
                    alt="github"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <ResultCard
                    teamId={w.teams[4]}
                    thumbnail
                    score={w.scores[4]}
                    lng={lng}
                  />
                </div>
                <div className="absolute w-full flex justify-center md:w-auto bottom-4 left-4">
                  <div className="p-2 px-4 text-white/30 body-3 bg-white/5 rounded-full ">
                    $5,000
                  </div>
                </div>
              </div>
              <div
                className="relative w-full pb-16 md:pb-10  p-10 rounded-xl flex flex-wrap  justify-center md:justify-between"
                style={{
                  background:
                    'linear-gradient(256.33deg, #06385B 0.53%, #0F0E38 100%)',
                }}
              >
                <div
                  className=" relative flex-1 h-[216px] md:h-auto  flex justify-center"
                  style={{}}
                >
                  <Image
                    src={'/icons/medal-3.png'}
                    alt="github"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex-1">
                  <ResultCard
                    teamId={w.teams[5]}
                    thumbnail
                    score={w.scores[5]}
                    lng={lng}
                  />
                </div>
                <div className="absolute w-full flex justify-center md:w-auto bottom-4 left-4">
                  <div className="p-2 px-4 text-white/30 body-3 bg-white/5 rounded-full ">
                    $5,000
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
