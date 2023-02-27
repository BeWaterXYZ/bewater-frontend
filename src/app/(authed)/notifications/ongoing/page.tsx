'use client';
import { useFetchOngoingNotifications } from '@/services/notification.query';
import { useAuthStore } from '@/stores/auth';

export default function Page() {
  const user = useAuthStore((s) => s.user);

  const { error, data, isLoading } = useFetchOngoingNotifications(user?.userId);

  return <div>ongoing</div>;
}
