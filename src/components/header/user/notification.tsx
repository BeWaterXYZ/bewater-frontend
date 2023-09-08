import { useFetchGroupingRequest } from '@/services/notification.query';
import { useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';

export function NotificationBell({ lng }: { lng: string }) {
  const user = useClerk().user;

  const { error, data, isLoading } = useFetchGroupingRequest(user?.id);

  const hasNewNotifications =
    isLoading || error || !data
      ? false
      : [...data.receivedApplications, ...data.receivedInvitations].filter(
          (m) => m.status === 'PENDING',
        ).length > 0;

  return (
    <div className="relative">
      <Link href={lng ? `/${lng}/notifications/requests/received` : '/notifications/requests/received'}>
        <Image
          src={hasNewNotifications ? '/icons/bell-dot.svg' : '/icons/bell.svg'}
          height={24}
          width={24}
          alt="notification"
        />
      </Link>
    </div>
  );
}
