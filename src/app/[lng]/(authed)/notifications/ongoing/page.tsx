"use client";
import { Avatar } from "@/components/avatar/avatar";
import { useLoadingWhen } from "@/components/loading/store";
import { OngoingNotification } from "@/services/notification";
import { useFetchOngoingNotifications } from "@/services/notification.query";
import { useClerk } from "@clerk/nextjs";
import { formatDistance, parseISO } from "date-fns";
import Link from "next/link";

function generateNotification(ntf: OngoingNotification, lng: string) {
  const msg = ntf.notificationMessage;
  switch (msg.type) {
    case "PROJECT_UPDATED":
      return (
        <div className="body-4">
          <Link href={`/${lng}/user/${msg.targetUser?.id}`}>
            {msg.targetUser?.userName}
          </Link>
          <span className="text-grey-500"> has updated </span>
          {msg.team.status === "DISMISSED" ? (
            <span className="body-4">{msg.team.name}</span>
          ) : (
            <Link
              className="body-4"
              href={`/${lng}/campaigns/${msg.team.challenge?.id}/projects/${msg.team.project.id}`}
            >
              {msg.team.project.name}
            </Link>
          )}
        </div>
      );
    case "CHALLENGE_UPDATED":
      return (
        <div className="body-4">
          <Link href={`/${lng}/user/${msg.targetUser?.id}`}>
            {msg.targetUser?.userName}
          </Link>
          <span className="text-grey-500"> has updated </span>
          <Link
            className="body-4"
            href={`/${lng}/campaigns/${msg.team.challenge?.id}`}
          >
            {msg.team.challenge?.title}
          </Link>
        </div>
      );
    case "MEMBER_ROLE_UPDATED":
    case "TEAM_DISMISSED":
    case "MEMBER_JOINED":
    case "MEMBER_REMOVED":
    case "MEMBER_LEFT":
    case "TEAM_INFO_UPDATED":
      return (
        <div className="body-4">
          <Link href={`/${lng}/user/${msg.targetUser?.id}`}>
            {msg.targetUser?.userName}
          </Link>
          <span className="text-grey-500">
            {msg.type === "MEMBER_ROLE_UPDATED" ? (
              <span>has been assigned a new role in </span>
            ) : msg.type === "TEAM_DISMISSED" ? (
              " has dismissed "
            ) : msg.type === "TEAM_INFO_UPDATED" ? (
              " has updated "
            ) : msg.type === "MEMBER_JOINED" ? (
              " has joined "
            ) : msg.type === "MEMBER_LEFT" ? (
              " has left "
            ) : (
              " has been removed from "
            )}
          </span>
          {msg.type === "TEAM_DISMISSED" || msg.team.status === "DISMISSED" ? (
            <span className="body-4">{msg.team.name}</span>
          ) : (
            <Link
              className="body-4"
              href={`/${lng}/campaigns/${msg.team.challenge?.id}/teams/${msg.teamId}`}
            >
              {msg.team.name}
            </Link>
          )}
        </div>
      );
  }
}

export default function Page({ params }: { params: { lng: string } }) {
  const { lng = "en" } = params || {};

  const clerk = useClerk();

  const { error, data, isLoading } = useFetchOngoingNotifications(
    clerk.user?.id
  );

  useLoadingWhen(isLoading);

  if (!data) return null;

  const flattenNotifications = [
    ...data!.pendingNotifications,
    ...data!.readNotifications,
  ];

  if (flattenNotifications.length === 0)
    return (
      <div className="rounded border border-[#24254E] bg-latenight p-4 my-3 body-2 text-grey-600">
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
              id={`n-${ntf.id}`}
              key={ntf.id}
              className="bg-grey-900 p-4 border  border-grey-800 rounded-sm flex gap-4"
            >
              <Avatar
                src={ntf.notificationMessage.targetUser?.avatarURI}
                className="w-8 h-8"
              />
              <div>
                <div>{generateNotification(ntf, lng)}</div>

                <div>
                  <span className="body-5 text-grey-500">
                    {formatDistance(
                      parseISO(ntf.notificationMessage.createdAt),
                      Date.now()
                    )}{" "}
                    ago · {ntf.notificationMessage?.team.challenge?.title}
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
