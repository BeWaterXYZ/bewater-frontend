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
import clsx from 'clsx';

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
      className={clsx(
        'rounded border  border-[#334155]  p-4 flex gap-3 min-h-[120px]',

        req.status === 'PENDING' ? 'bg-[#0F172A]' : 'bg-night',
      )}
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
            <p className="body-3 text-grey">
              You wanted to join{' '}
              <strong className="text-white">{req.team.name} </strong>
            </p>
          ) : (
            <p className="body-3 text-grey">
              <strong className="text-white">{req.sender!.fullName}</strong>{' '}
              wanted to join{' '}
              <strong className="text-white">{req.team.name} </strong>
            </p>
          )}
        </div>
        <div className="">
          <p className="body-5 text-grey">
            {formatDistance(parseISO(req.createdAt), new Date())} ago ·{' '}
            {req.team.challenge.title}
          </p>
        </div>
        <div className="flex-1 bg-white/5 p-2 my-4">
          <p className="body-4 text-[#94A3B8] ">{req.message} </p>
        </div>
        {req.status === 'PENDING' ? (
          sentOrReceived ? (
            <div className="gap-2 flex flex-col">
              <button
                className="btn btn-primary"
                onClick={() => revoke(req.id)}
              >
                Revoke
              </button>
            </div>
          ) : (
            <div className="gap-3 flex ">
              <button
                className="btn btn-primary"
                onClick={() => approve(req.id)}
              >
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
          <div className="body-3 text-[#64748B] body-5">{req.status}</div>
        )}
      </div>
    </div>
  );
}
