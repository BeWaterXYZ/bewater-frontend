import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from '@/app/i18n';

export const BeWaterLogo = async (params: { lng: string }) => {
  const lng = (params || {}).lng ? params.lng : 'en'
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, 'translation');

  return (
    <div className="flex flex-row relative">
      <Link href="https://bewater.xyz">
        <Image
          src="/logo/bewater-h.svg"
          width={120}
          height={24}
          alt="bewater logo"
        />
        <div className="body-5 text-day absolute left-full top-[-12px] rounded-full p-[1px] bg-gradient-108 from-[#057382] to-[#66FFFF]">
          <div className="bg-night rounded-full px-[5px] leading-[12px]">
            Alpha
          </div>
        </div>
      </Link>
      <Link href={params?.lng === lng ? `/${lng}/` : '/'}>
        <div className="absolute left-[164px] hidden sm:flex flex-row gap-2 items-center">
          <div className="text-white body-2 font-bold">/</div>
          <div className="text-day body-2 font-bold uppercase [text-shadow:0_0_6px_theme(colors.day)] whitespace-nowrap">
            {t('header.campaign')}
          </div>
        </div>
      </Link>
    </div>
  );
};
