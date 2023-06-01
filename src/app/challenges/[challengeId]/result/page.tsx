import Image from 'next/image';
import { segmentSchema } from '../param-schema';
import Link from 'next/link';
import { ResultCard } from './result-card';
const winners = [
  {
    track: 'GameFi',
    teams: [
      '646db5d1cb0a91f0eb425474',
      '6455ab6179c1ffd9a29f9374',
      '645a55cc4b5a8bfcd7bf9029',
    ],
  },
  {
    track: 'DeFi',
    teams: [
      '6455007579c1ffd9a29f9339',
      '64679790cb0a91f0eb42528d',
      '64671f0dcb0a91f0eb425208 ',
    ],
  },
  {
    track: 'NFT',
    teams: [
      '64550bee79c1ffd9a29f934a',
      '645b0bc74b5a8bfcd7bf906e',
      '6461a5631a7b44c927a1a0b8',
    ],
  },
  {
    track: 'Web3 Security & Infra',
    teams: [
      '6468a689cb0a91f0eb425318',
      '6455d86179c1ffd9a29f93c3',
      '645862b7a994c9b0176a8284',
    ],
  },
  {
    track: 'ZK',
    teams: [
      '64663df4cb0a91f0eb425114',
      '64664619cb0a91f0eb42511f',
      '64662bf6cb0a91f0eb4250fa',
    ],
  },
  {
    track: 'DAO Tool',
    teams: [
      '645a8f9e4b5a8bfcd7bf903a',
      '646b75c2cb0a91f0eb425399',
      '6457a29ca994c9b0176a824a',
    ],
  },
];
export default function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  return (
    <>
      {/* <div className="container flex flex-col items-center justify-center gap-4 my-20">
        <Image
          src="/icons/no-result.svg"
          height={180}
          width={270}
          alt="no teams"
        />
        <p className="body-1 text-[20px] text-center">Results Coming Soon!</p>
        <p className="body-2 text-grey-500 text-center">
          Results announced after challenge ends and judging.
        </p>
        <Link
          prefetch={false}
          className="btn btn-primary"
          href={`/challenges/${challengeId}/projects`}
        >
          Back to Projects
        </Link>
      </div> */}
      {winners.map((w) => {
        return (
          <div className="container" key={w.track}>
            <h2 className="text-center heading-4 my-4 mt-24">{w.track}</h2>
            <p
              className="body-2 text-center text-clip  [-webkit-text-fill-color:transparent] my-4 mb-8"
              style={{
                WebkitBackgroundClip: 'text',
                background:
                  'linear-gradient(51.06deg, #9358F7 0.87%, #7B78F2 25.96%, #6197EE 49.23%, #45B5E9 74.93%, #10D7E2 97.48%)',
              }}
            >
              $5,000 Granted to 3 projects
            </p>
            {/* first place  */}
            <div
              className="relative w-full  p-10  rounded-xl flex flex-col items-center "
              style={{
                background:
                  'radial-gradient(23.73% 61.17% at 8.02% 11.08%, rgba(48, 83, 209, 0.3) 0%, rgba(34, 131, 187, 0) 99.99%, rgba(34, 132, 187, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(101.29% 198.2% at 50% -98.2%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 81.45%, rgba(0, 0, 0, 0.4) 100%), radial-gradient(173.35% 1719.94% at 4.11% 93%, #080336 0%, #7406CB 68.23%, #6B1162 100%)',
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
              <ResultCard teamId={w.teams[0]} thumbnail />
              <div className="w-full flex justify-center  my-4">
                <div className="p-2 px-4 text-white/30 body-3 bg-white/5 rounded-full ">
                  $2,500
                </div>
              </div>
            </div>

            <div className="relative my-8 w-full flex flex-col md:flex-row gap-8">
              {/* second place */}
              <div
                className="relative w-full p-10 rounded-xl flex flex-wrap  justify-center md:justify-between"
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
                  <ResultCard teamId={w.teams[1]} />
                </div>
                <div className="absolute w-full flex justify-center md:w-auto bottom-4 left-4">
                  <div className="p-2 px-4 text-white/30 body-3 bg-white/5 rounded-full ">
                    $1,700
                  </div>
                </div>
              </div>
              {/* third place */}

              <div
                className="relative w-full p-10 rounded-xl flex flex-wrap  justify-center md:justify-between"
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
                  <ResultCard teamId={w.teams[2]} />
                </div>
                <div className="absolute w-full flex justify-center md:w-auto bottom-4 left-4">
                  <div className="p-2 px-4 text-white/30 body-3 bg-white/5 rounded-full ">
                    $800
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
