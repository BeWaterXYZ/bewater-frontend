'use client';
import { useAlert } from '@/components/alert/store';
import { Avatar } from '@/components/avatar';
import {
  useRevokeGroupingRequest,
  useAcceptGroupingRequest,
  useDeclineGroupingRequest,
} from '@/services/grouping-request.query';
import { GroupingRequestFull, GroupingRequestId } from '@/services/types';
import { formatDistance, parseISO } from 'date-fns';
import { useLoadingStoreAction } from '@/components/loading/store';
import clsx from 'clsx';
import Link from 'next/link';

function getTitle(req: GroupingRequestFull, sentOrReceived: boolean) {
  let teamLink = (
    <strong className="text-white hover:underline">
      <Link
        href={`/challenges/${req.team.challenge.id}/teams/${req.team.id}`}
        className=""
      >
        {req.team.name}
      </Link>
    </strong>
  );
  return sentOrReceived ? (
    req.type === 'APPLICATION' ? (
      <p className="body-3 text-grey-400">You wanted to join {teamLink}</p>
    ) : (
      <p className="body-3 text-grey-400">
        You invited{' '}
        <strong className="text-white">{req.recipient?.fullName}</strong> to
        join {teamLink}
      </p>
    )
  ) : req.type === 'APPLICATION' ? (
    <p className="body-3 text-grey-400">
      <strong className="text-white">{req.sender!.fullName}</strong> wanted to
      join {teamLink}
    </p>
  ) : (
    <p className="body-3 text-grey-400">
      <strong className="text-white">{req.sender!.fullName}</strong> has invited
      you to join {teamLink}
    </p>
  );
}
function getStatus(req: GroupingRequestFull, sentOrReceived: boolean) {
  switch (req.status) {
    case 'ACCEPTED':
      return sentOrReceived
        ? 'Your request has been accepted'
        : "You've accepted this request";
    case 'DECLINED':
      return sentOrReceived
        ? 'Your request has been declined'
        : "You've declined this request ";
    case 'REVOKED':
      return sentOrReceived
        ? 'Your request has been revoked'
        : 'The request has been revoked';
  }
}

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
    let confirmed = await confirm({
      title: 'are you sure',
      description: 'You are going to accept the request',
      okCopy: 'confirm',
      cancelCopy: 'cancel',
    });
    if (!confirmed) return;
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
    let confirmed = await confirm({
      title: 'are you sure',
      description: 'You are going to decline the request',
      okCopy: 'confirm',
      cancelCopy: 'cancel',
    });
    if (!confirmed) return;

    try {
      showLoading();
      await declineMutation.mutateAsync(id);
    } catch (err) {
    } finally {
      dismissLoading();
    }
  };

  let title = getTitle(req, sentOrReceived);
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
        <div className="">{title}</div>
        <div className="">
          <p className="body-5 text-grey-500">
            {formatDistance(parseISO(req.createdAt), new Date())} ago ·{' '}
            <Link
              href={`/challenges/${req.team.challenge.id}`}
              className="hover:underline"
            >
              {req.team.challenge.title}
            </Link>
          </p>
        </div>
        <div className="flex-1 bg-white/5 p-2 my-4">
          <p className="body-4 text-grey-400">{req.message} </p>
        </div>
        {req.status === 'PENDING' ? (
          sentOrReceived ? (
            <div className="gap-3 flex">
              <button
                className="btn btn-primary"
                onClick={() => revoke(req.id)}
              >
                Revoke
              </button>
            </div>
          ) : (
            <div className="gap-3 flex">
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
          <div className="body-3 text-grey-500 body-5">
            {getStatus(req, sentOrReceived)}
          </div>
        )}
      </div>
    </div>
  );
}
