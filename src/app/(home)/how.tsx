import clsx from 'clsx';
import Image from 'next/image';

const contents = [
  {
    title: 'Launch Challenge',
    desc: 'The organizer fills out the challenge information and prepays the prize, then BeWater will promote the challenge with its partners to attract builders to participate.',
  },
  {
    title: 'Team Formation',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  },
  {
    title: 'Create, Submit',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  },
  {
    title: 'Check Results, Get Analysis, Build Connection',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.',
  },
];

export default function HomeHow() {
  return (
    <div
      data-block="how"
      className={clsx(
        'w-full xl:w-[1200px] mx-auto py-[140px] body-1',
        'flex flex-row justify-between items-center gap-4 xl:gap-[12%]',
      )}
    >
      <div className="w-full xl:w-[45%]">
        <div className="heading-6 opacity-30 uppercase">HOW BEWATER WORKS</div>
        <div className="heading-3">
          <div>
            <div>{`Integrates cutting-edge`}</div>
            <div>{`tech to tailor solutions`}</div>
            <div>
              {`for each role, `}
              <span>fluidly</span>
            </div>
          </div>
        </div>
        <Image
          width={542}
          height={420}
          src="/home/how.png"
          alt="how bewater works"
        />
      </div>
      <div data-block="workflow" className="w-full xl:w-[43%]">
        {contents.map((content, i) => (
          <div
            className={clsx('pb-10', i > 0 && 'opacity-30')}
            key={content.title}
          >
            <div className="pl-10 relative body-1 font-bold mb-2.5">
              <div
                className={clsx(
                  'w-[10px] h-[10px] rounded-full bg-white',
                  'absolute left-0 top-1/2 -translate-y-1/2 -mt-[2px]',
                )}
              />
              {content.title}
            </div>
            <div className="pl-10 relative desc-2 opacity-70 min-h-[72px]">
              <div
                className={clsx(
                  'w-[1px] h-full bg-white',
                  'absolute left-[4.5px] top-[6px]',
                )}
              />
              {content.desc}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
