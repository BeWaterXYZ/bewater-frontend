'use client';
import { Avatar } from '@/components/avatar';
import {
  revokeGroupingRequest,
  acceptGroupingRequest,
  declineGroupingRequest,
} from '@/services/challenge';
import { GroupingRequestFull, GroupingRequestId } from '@/services/shared';
import { useFetchGroupingRequest } from '@/services/user';
import { useAuthStore } from '@/stores/auth';
import { formatDistance, parseISO } from 'date-fns';

export function GroupingRequestNotification({
  req,
  sentOrReceived,
}: {
  req: GroupingRequestFull;
  sentOrReceived: boolean;
}) {
  const revoke = async (id: GroupingRequestId) => {
    const data = await revokeGroupingRequest(id);
    console.log(data);
  };
  const approve = async (id: GroupingRequestId) => {
    const data = await acceptGroupingRequest(id);
    console.log(data);
  };
  const reject = async (id: GroupingRequestId) => {
    const data = await declineGroupingRequest(id);
    console.log(data);
  };
  return (
    <div
      key={req.id}
      className="border  border-[#334155] bg-[#0F172A] p-4 flex gap-3"
    >
      <div>
        <Avatar
          size="small"
          src={req.sender?.avatarURI}
          walletAddress={req.sender?.walletAddress}
        />
      </div>
      <div className="flex flex-1 flex-col justify-around">
        <div className="">
          {sentOrReceived ? (
            <p className="body-3 text-[#CBD5E1]">
              You wanted to join{' '}
              <strong>
                {req.team.name} of {req.recipient?.fullName} on {}
              </strong>
            </p>
          ) : (
            <p className="body-3 text-[#CBD5E1]">
              {req.sender!.fullName} wanted to join{' '}
              <strong>
                {req.team.name} on {}
              </strong>
            </p>
          )}
        </div>
        <div className="flex-1">
          <q className="body-4  flex-1">{req.message} </q>
        </div>
        <div className="">
          <p className="body-5 text-grey">
            {formatDistance(parseISO(req.createdAt), new Date())} ago
          </p>
        </div>
      </div>

      {sentOrReceived ? (
        <div className="gap-2 flex flex-col">
          <button className="btn btn-primary" onClick={() => revoke(req.id)}>
            Revoke
          </button>
        </div>
      ) : (
        <div className="gap-2 flex flex-col">
          <button className="btn btn-primary" onClick={() => approve(req.id)}>
            Accept
          </button>
          <button className="btn btn-secondary" onClick={() => reject(req.id)}>
            Deline
          </button>
        </div>
      )}
    </div>
  );
}

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
