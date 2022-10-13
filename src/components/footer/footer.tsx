import Discord from '@/components/logos/discord.svg';
import Twitter from '@/components/logos/twitter.svg';

export const Footer = ()=> {
  return(
    <footer className="header-width typ-h5 text-bw-fore bg-bw-back">
      <div className="py-6 px-8 flex flex-row gap-2 justify-between items-center sm:flex-col sm:items-start">
        <div>
          © {(new Date()).getFullYear()} BeWater. All Rights Reserved.
        </div>
        <div className="opacity-30 flex flex-row gap-x-4 items-center justify-end">
          {/* TODO: add link here */}
          <Discord className="grayscale" />
          <Twitter className="grayscale" />
        </div>
      </div>
    </footer>
  )
}
