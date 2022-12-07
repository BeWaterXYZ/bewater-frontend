import { useFetchUser } from '@/services/user';
import { Loading } from '@/components/loading/loading';
import { useAuthStore } from '@/stores/auth';
import { useRequireAuthed } from '@/hooks/useRequireAuthed';

import type { NextPage } from 'next';

export const UserProfie: NextPage = () => {
  useRequireAuthed();

  const user = useAuthStore((s) => s.user);
  const { error, data, isLoading } = useFetchUser(user.userId);

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>Error occurs!</div>;
  }
  return data ? (
    <div className="flex flex-col break-all justify-center items-center">
      Profile Page
      {JSON.stringify(data)}
    </div>
  ) : null;
};
