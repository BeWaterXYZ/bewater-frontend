import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/app/i18n';

interface Props {
  lng: string;
}

export const Footer = async (params: Props) => {
  const { lng = 'en' } = params || {};
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await useTranslation(lng, 'translation');

  return (
    <footer id="main-footer" className={clsx('w-full heading-5  h-20 flex flex-col justify-center')}>
      <div className="container mx-auto  flex flex-col gap-6 justify-between items-center md:flex-row md:items-start">
        <div className="body-4 text-grey-100 uppercase">
          © {new Date().getFullYear()} {t('bewater')}{t('footer.dot')} {t('footer.right')}
        </div>
        <div className="flex flex-row gap-x-4 items-center justify-end">
          <Link href="https://t.co/oPJUASWXjh" target="_blank">
            <Image
              src="/icons/footer-discord.svg"
              width={24}
              height={24}
              alt="discord"
            />
          </Link>
          <Link href="https://twitter.com/BeWaterOfficial" target="_blank">
            <Image
              src="/icons/footer-twitter.svg"
              width={24}
              height={24}
              alt="twitter"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};
