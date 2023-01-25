import clsx from 'clsx';
import Image from 'next/image';

const logos = [
  {
    name: 'Google',
    url: '/home/partner-google.svg',
  },
  {
    name: 'Netflix',
    url: '/home/partner-netflix.svg',
  },
  {
    name: 'Dropbox',
    url: '/home/partner-dropbox.svg',
  },
  {
    name: 'Spotify',
    url: '/home/partner-spotify.svg',
  },
  {
    name: 'Slack',
    url: '/home/partner-slack.svg',
  },
];

export default function HomePartner() {
  return (
    <div
      data-block="partner"
      className={clsx('w-full xl:w-[1200px] mx-auto py-12', 'select-none')}
    >
      <div className="heading-6 opacity-30 pb-5 text-center">
        Envision The Future With Our Valued Partners
      </div>
      <div className="w-full flex flex-row justify-around flex-wrap gap-8">
        {logos.map((logo, i) => (
          <div
            className="w-[178px] h-[90px] flex justify-center items-center"
            key={logo.name}
          >
            <Image
              fill
              className="h-8 object-cover"
              src={logo.url}
              alt={logo.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
