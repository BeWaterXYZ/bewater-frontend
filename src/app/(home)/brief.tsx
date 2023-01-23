import { IconStar } from '@/components/icons';
import clsx from 'clsx';

export default function HomeBrief() {
  return (
    <div
      data-block="brief"
      className={clsx(
        'w-full xl:w-[1200px] mx-auto py-[140px]',
        'flex flex-col xl:flex-row justify-between items-center gap-5 xl:gap-[7%]',
        'select-none',
      )}
    >
      <div className={clsx('body-1 text-normal w-[55%]')}>
        <div
          className={clsx(
            'relative inline-block body-2 mb-4 px-5 py-2',
            'rounded-[60px] border border-white',
          )}
        >
          <span>{`THE MISSING`}</span>
          <IconStar className="w-10 h-10 absolute -right-3 -top-5 fill-white" />
        </div>
        <div className="heading-3 leading-tight">{`Open Innovation Platform you`}</div>
        <div className="heading-3 leading-tight">
          {`need to grow your `}
          <span className="bg-[linear-gradient(180deg,_#D0B6FF_0%,_#284CCD_100%)] text-transparent bg-clip-text">{`ecosystem`}</span>
        </div>
        <div
          className={clsx('mt-5 desc-1 opacity-70')}
        >{`BeWater is the ultimate builder community based on the SOP management system we built for open innovation challenges including hackathon, design contest, demo day and more. It serves cutting edge fields and also connects traditional industries. BeWater engages builders with different skillsets to build a better future, together.`}</div>
      </div>
      <div className="bg-placeholder w-[38%] h-[362px] body-1">
        {`placeholder`}
      </div>
    </div>
  );
}
