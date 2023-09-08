'use client';
import { languages } from '../../../app/i18n/settings'

export const Lng = ({ lng }: { lng: string }) => {
  const lang : any = {
    en: 'En',
    zh: '中文',
  };
  return (
    !!lng ? (
      <div className="mr-4 text-[12px] whitespace-nowrap">
        <span className="font-bold text-grey-400 cursor-pointer">{lang[lng]}</span>
        {languages.filter((l) => lng !== l).map((l, index) => {
          return (
            <span key={l}>
              <span className="text-base text-grey-500 cursor-pointer">{' / '}</span>
              <span className="text-grey-500 cursor-pointer" onClick={() => {
                location.href = `/${l}/${location.pathname.substring('//'.length + lng.length)}`
              }}>{lang[l]}</span>
            </span>
          )
        })}
      </div>
    ) : null
  );
};
