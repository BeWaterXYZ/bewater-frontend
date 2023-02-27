import { useFetchGroupingRequest } from '@/services/notification.query';
import { useAuthStore } from '@/stores/auth';
import Image from 'next/image';
import Link from 'next/link';

export function NotificationBell() {
  const user = useAuthStore((s) => s.user);

  const { error, data, isLoading } = useFetchGroupingRequest(user?.userId);

  const hasNewNotifications =
    isLoading || error || !data
      ? false
      : [...data.receivedApplications, ...data.receivedInvitations].filter(
          (m) => m.status === 'PENDING',
        ).length > 0;

  return (
    <div className="relative -top-1">
      <Link href="/notifications/requests/received">
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
