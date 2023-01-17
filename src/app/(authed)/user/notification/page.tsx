'use client';
import {
  revokeGroupingRequest,
  acceptGroupingRequest,
  declineGroupingRequest,
} from '@/services/challenge';
import { GroupingRequestId } from '@/services/shared';
import { useFetchGroupingRequest } from '@/services/user';
import { useAuthStore } from '@/stores/auth';

export default function Page() {
  const user = useAuthStore((s) => s.user);

  const { error, data, isLoading } = useFetchGroupingRequest(user.userId);

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
  if (error || isLoading) return null;
  return (
    <div className="h-full container">
      <p className="heading-1">this is notification</p>

      <div>
        <p className="body-2">Sent applications:</p>

        {data!.sentApplications.map((req) => {
          return (
            <div key={req.id} className="border p-2">
              <p className="body-3">recipient: {req.recipient!.fullName} </p>
              <p className="body-3">team: {req.team.name} </p>
              <p className="body-3">status : {req.status} </p>
              <button className="btn btn-danger" onClick={() => revoke(req.id)}>
                Revoke
              </button>
            </div>
          );
        })}
      </div>

      <div>
        <p className="body-2">Received applications:</p>

        {data!.receivedApplications.map((req) => {
          return (
            <div key={req.id} className="border p-2">
              <p className="body-3">sender: {req.sender!.fullName} </p>
              <p className="body-3">team: {req.team.name} </p>
              <p className="body-3">status : {req.status} </p>
              <div className="gap-2 flex">
                <button
                  className="btn btn-primary"
                  onClick={() => approve(req.id)}
                >
                  Approve
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => reject(req.id)}
                >
                  reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
