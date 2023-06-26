'use client';

import { useAuthStore } from '@/stores/auth';
import Link from 'next/link';
import { useTranslation } from '@/app/i18n/client';

export default function ConnectButton({ lng }: { lng: string }) {
  const token = useAuthStore((s) => s.token);
  const { t } = useTranslation(lng, 'translation');
  return !token ? (
    <div>
      <Link
        prefetch={false}
        href={`/${lng}/connect`}
        className="btn btn-primary-invert body-4 text-day  uppercase w-64 py-6"
      >
        {t('campaign.t18')}
      </Link>
    </div>
  ) : null;
}
