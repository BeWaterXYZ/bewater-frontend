'use client';
import { useFetchGroupingRequest } from '@/services/user';
import { sortGroupingRequest } from '@/services/grouping-request';
import { useAuthStore } from '@/stores/auth';
import { GroupingRequestNotification } from '../grouping-request-notification';

export default function Page() {
  const user = useAuthStore((s) => s.user);

  const { error, data, isLoading } = useFetchGroupingRequest(user.userId);

  if (error || isLoading || !data) return null;
  return (
    <div>
      <div className="flex flex-col gap-3">
        {sortGroupingRequest([
          ...data.sentApplications,
          ...data.sentInvitations,
        ]).map((req) => {
          return (
            <GroupingRequestNotification
              key={req.id}
              req={req}
              sentOrReceived={req.senderId === user.userId}
            />
          );
        })}
      </div>
    </div>
  );
}
