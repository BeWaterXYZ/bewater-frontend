'use client';
import { sortGroupingRequest, useFetchGroupingRequest } from '@/services/user';
import { useAuthStore } from '@/stores/auth';
import { GroupingRequestNotification } from '../grouping-request-notification';

export default function Page() {
  const user = useAuthStore((s) => s.user);

  const { error, data, isLoading } = useFetchGroupingRequest(user.userId);

  if (error || isLoading) return null;
  return (
    <div>
      <div className="flex flex-col gap-3">
        {sortGroupingRequest(data!.receivedApplications).map((req) => {
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
