'use client';
import { useFetchGroupingRequest } from '@/services/user.query';
import { sortGroupingRequest } from '@/services/grouping-request';
import { useAuthStore } from '@/stores/auth';
import { GroupingRequestNotification } from '../grouping-request-notification';

export default function Page() {
  const user = useAuthStore((s) => s.user);

  const { error, data, isLoading } = useFetchGroupingRequest(user?.userId);

  if (error || isLoading || !data) return null;

  let requests = sortGroupingRequest([
    ...data.receivedApplications,
    ...data.receivedInvitations,
  ]);
  return (
    <div>
      <div className="flex flex-col gap-3">
        {requests.length === 0 ? (
          <div className="body-1">No notifications</div>
        ) : null}
        {requests.map((req) => {
          return (
            <GroupingRequestNotification
              key={req.id}
              req={req}
              sentOrReceived={req.senderId === user?.userId}
            />
          );
        })}
      </div>
    </div>
  );
}
