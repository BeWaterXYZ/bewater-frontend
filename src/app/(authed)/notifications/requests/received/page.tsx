'use client';
import { useFetchGroupingRequest } from '@/services/notification.query';
import { sortGroupingRequest } from '@/services/notification';
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
          <div className="rounded border border-[#24254E] bg-[#0B0C24] p-4 my-3 body-2 text-grey-600">
            No notifications yet.
          </div>
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
