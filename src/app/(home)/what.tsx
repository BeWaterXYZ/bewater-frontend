import clsx from 'clsx';

const contents = [
  {
    title: 'Startup Project',
    desc: 'Walk with masters. Engage builders from various communities to work together and develop apps or services based on your product.',
  },
  {
    title: 'Traditional Business',
    desc: 'Take part in the trending businesses by sponsoring their challenges, miss no opportunity to expand your markets with genius ideas and talents. Even better, host your own with BeWater.',
  },
  {
    title: 'Builder',
    desc: 'Walk the walk! Take part in real-world challenges and get rewards from them. Get to meet outstanding builders during the process and build your portfolio with a track record.',
  },
];

export default function HomeWhat() {
  return (
    <div
      data-block="what"
      className={clsx(
        'w-full xl:w-[1200px] mx-auto py-[140px] body-1 px-4 xl:px-0 cursor-default',
      )}
    >
      <div className="heading-6 opacity-30 uppercase">WHAT BEWATER OFFER</div>
      <div className="heading-3">Empower all to thrive</div>
      <div
        data-block="cards"
        className="mt-14 w-full flex flex-col xl:flex-row gap-9"
      >
        {contents.map((content, i) => (
          <div
            className="w-full xl:w-[376px] p-[22px] bg-white/5 hover:bg-white/[0.15] border border-white/10 rounded"
            key={content.title}
          >
            <div className="w-full h-[219px] bg-placeholder">Placeholder</div>
            <div className="mt-6 mb-4">
              <span className="mono-1 font-normal opacity-30 mr-2.5">
                {`${i + 1}`.padStart(2, '0')}
              </span>
              <span className="heading-6">{content.title}</span>
            </div>
            <div className="desc-1 opacity-40">{content.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
