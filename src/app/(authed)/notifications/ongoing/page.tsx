'use client';
import { Avatar } from '@/components/avatar/avatar';
import { useLoadingWhen } from '@/components/loading/store';
import { OngoingNotification } from '@/services/notification';
import { useFetchOngoingNotifications } from '@/services/notification.query';
import { useAuthStore } from '@/stores/auth';
import { formatDistance, parseISO } from 'date-fns';
import Link from 'next/link';

function generateNotification(ntf: OngoingNotification) {
  const msg = ntf.notificationMessage;
  switch (msg.type) {
    case 'PROJECT_UPDATED':
      return (
        <div className="body-4">
          <Link href={`/user/${msg.targetUser.userId}`}>
            {msg.targetUser.userName}
          </Link>
          <span className="text-grey-500"> has updated </span>
          <Link className="body-4" href={``}>
            {msg.team.name}
          </Link>
        </div>
      );
  }
}

export default function Page() {
  const user = useAuthStore((s) => s.user);

  const { error, data, isLoading } = useFetchOngoingNotifications(user?.userId);

  useLoadingWhen(isLoading);

  if (!data) return null;

  const flattenNotifications = [
    ...data!.pendingNotifications,
    ...data!.readNotifications,
  ];

  if (flattenNotifications.length === 0)
    return (
      <div className="rounded border border-[#24254E] bg-[#0B0C24] p-4 my-3 body-2 text-grey-600">
        No notifications yet.
      </div>
    );

  return (
    <div>
      <div className="sticky top-[135px] lg:top-[72px]"></div>
      <div className="flex flex-col gap-3">
        {flattenNotifications.map((ntf) => {
          return (
            <div
              key={ntf.id}
              className="bg-grey-900 p-4 border  border-grey-800 rounded-sm flex gap-4"
            >
              <Avatar
                src={ntf.notificationMessage.targetUser.avatarURI}
                walletAddress={ntf.notificationMessage.targetUser.walletAddress}
                className="w-8 h-8"
              />
              <div>
                <div>{generateNotification(ntf)}</div>

                <div>
                  <span className="body-5 text-grey-500">
                    {formatDistance(
                      parseISO(ntf.notificationMessage.createdAt),
                      Date.now(),
                    )}{' '}
                    ago · ETH Singapore 2023
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
