'use client';

import Link from 'next/link';
import { useTranslation } from '@/app/i18n/client';

export default function ConnectButton({ lng }: { lng: string }) {
  const { t } = useTranslation(lng, 'translation');
  return (
    <div>
      <Link
        href={`/sign-up`}
        className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
      >
        {t('campaign.t18')}
      </Link>
    </div>
  );
}
