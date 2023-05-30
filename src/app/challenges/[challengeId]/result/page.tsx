import Image from 'next/image';
import { segmentSchema } from '../param-schema';
import Link from 'next/link';
import { ResultCard } from './result-card';

export default function Page({ params }: any) {
  const { challengeId } = segmentSchema.challengeId.parse(params);
  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-4 my-20">
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
      </div>
      <div className="container">
        {/* first place  */}
        <div
          className="relative w-full pb-16 md:pb-10 p-10  rounded-xl flex flex-wrap justify-center md:justify-between"
          style={{
            background:
              'radial-gradient(23.73% 61.17% at 8.02% 11.08%, rgba(48, 83, 209, 0.3) 0%, rgba(34, 131, 187, 0) 99.99%, rgba(34, 132, 187, 0) 100%) /* warning: gradient uses a rotation that is not supported by CSS and may not behave as expected */, radial-gradient(101.29% 198.2% at 50% -98.2%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 81.45%, rgba(0, 0, 0, 0.4) 100%), radial-gradient(173.35% 1719.94% at 4.11% 93%, #080336 0%, #7406CB 68.23%, #6B1162 100%)',
          }}
        >
          <div
            className=" relative flex-1 h-[216px] md:h-auto -mb-8 flex justify-center"
            style={{}}
          >
            <Image
              src={'/icons/medal-1.png'}
              alt="github"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex-1">
            <ResultCard
              teamId="645b64ee8db4e33248edec10"
              thumbnail
              score={99}
            />
          </div>
          <div className="absolute w-full flex justify-center md:w-auto bottom-4 left-4">
            <div className="p-2 px-4 text-white/30 body-3 bg-white/5 rounded-full ">
              $30,000
            </div>
          </div>
        </div>

        <div className="my-8 w-full flex flex-col md:flex-row gap-8">
          {/* second place */}
          <div
            className="w-full p-10 rounded-xl flex flex-wrap  justify-center md:justify-between"
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
              <ResultCard teamId="645b64ee8db4e33248edec10" score={99} />
            </div>
          </div>
          {/* third place */}

          <div
            className="w-full p-10 rounded-xl flex flex-wrap  justify-center md:justify-between"
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
              <ResultCard teamId="645b64ee8db4e33248edec10" score={99} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
