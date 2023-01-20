'use client';
import { useFetchGroupingRequest } from '@/services/user';
import { useAuthStore } from '@/stores/auth';
import { GroupingRequestNotification } from './grouping-request-notification';

export default function Page() {
  const user = useAuthStore((s) => s.user);

  const { error, data, isLoading } = useFetchGroupingRequest(user.userId);

  if (error || isLoading) return null;
  return (
    <div className="h-full container">
      <p className="heading-1">Notifications</p>

      <div>
        <p className="body-2">Sent applications:</p>
        <div className="flex flex-col gap-3">
          {data!.sentApplications.map((req) => {
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

      <div>
        <p className="body-2">Received applications:</p>

        <div className="flex flex-col gap-3">
          {data!.receivedApplications.map((req) => {
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
    </div>
  );
}
