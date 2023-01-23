'use client';
import { useAlert } from '@/components/alert/store';
import { Avatar } from '@/components/avatar';
import {
  useRevokeGroupingRequest,
  useAcceptGroupingRequest,
  useDeclineGroupingRequest,
} from '@/services/user';
import { GroupingRequestFull, GroupingRequestId } from '@/services/shared';
import { formatDistance, parseISO } from 'date-fns';
import { useLoadingStoreAction } from '@/components/loading/store';

export function GroupingRequestNotification({
  req,
  sentOrReceived,
}: {
  req: GroupingRequestFull;
  sentOrReceived: boolean;
}) {
  const { confirm } = useAlert();
  const { showLoading, dismissLoading } = useLoadingStoreAction();

  const revokeMutation = useRevokeGroupingRequest();
  const revoke = async (id: GroupingRequestId) => {
    let confirmed = await confirm({
      title: 'are you sure',
      description: 'You are going to revoke the request',
      okCopy: 'confirm',
      cancelCopy: 'cancel',
    });
    if (!confirmed) return;
    try {
      showLoading();
      await revokeMutation.mutateAsync(id);
    } catch (err) {
    } finally {
      dismissLoading();
    }
  };

  const acceptMutation = useAcceptGroupingRequest();
  const approve = async (id: GroupingRequestId) => {
    try {
      showLoading();
      await acceptMutation.mutateAsync(id);
    } catch (err) {
    } finally {
      dismissLoading();
    }
  };

  const declineMutation = useDeclineGroupingRequest();

  const reject = async (id: GroupingRequestId) => {
    try {
      showLoading();
      await declineMutation.mutateAsync(id);
    } catch (err) {
    } finally {
      dismissLoading();
    }
  };
  return (
    <div
      key={req.id}
      className="border  border-[#334155] bg-[#0F172A] p-4 flex gap-3 min-h-[120px]"
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
              You wanted to join <strong>{req.team.name} </strong> on{' '}
              <strong>{req.team.challenge.title} </strong>
            </p>
          ) : (
            <p className="body-3 text-[#CBD5E1]">
              {req.sender!.fullName} wanted to join{' '}
              <strong>{req.team.name} </strong> on{' '}
              <strong>{req.team.challenge.title} </strong>
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
      {req.status === 'PENDING' ? (
        sentOrReceived ? (
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
            <button
              className="btn btn-secondary"
              onClick={() => reject(req.id)}
            >
              Deline
            </button>
          </div>
        )
      ) : (
        <div className="body-3">{req.status}</div>
      )}
    </div>
  );
}
