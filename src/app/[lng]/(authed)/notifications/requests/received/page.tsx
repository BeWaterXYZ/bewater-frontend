'use client';
import { useFetchGroupingRequest } from '@/services/notification.query';
import { sortGroupingRequest } from '@/services/notification';
import { GroupingRequestNotification } from '../grouping-request-notification';
import { useClerk } from '@clerk/nextjs';

export default function Page({ params }: { params: { lng: string } }) {
  const { lng = 'en' } = params || {};

  const user = useClerk().user;

  const { error, data, isLoading } = useFetchGroupingRequest(user?.id);

  if (error || isLoading || !data) return null;

  let requests = sortGroupingRequest([
    ...data.receivedApplications,
    ...data.receivedInvitations,
  ]);
  return (
    <div>
      <div className="flex flex-col gap-3">
        {requests.length === 0 ? (
          <div className="rounded border border-[#24254E] bg-latenight p-4 my-3 body-2 text-grey-600">
            No notifications yet.
          </div>
        ) : null}
        {requests.map((req) => {
          return (
            <GroupingRequestNotification
              key={req.id}
              req={req}
              sentOrReceived={req.sender?.clerkId === user?.id}
              lng={lng}
            />
          );
        })}
      </div>
    </div>
  );
}
