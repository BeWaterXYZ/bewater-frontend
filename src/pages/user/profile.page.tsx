import { useFetchUser } from '@/services/user';
import { Loading } from '@/components/loading/loading';

import type { NextPage } from 'next';
import { useAuthStore } from '@/stores/auth';

const PageProfile: NextPage = () => {
  const user = useAuthStore((s) => s.user);
  const { error, data, isLoading } = useFetchUser(user.userId);

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>Error occurs!</div>;
  }
  return data ? (
    <div className="flex flex-col h-[calc(100vh-160px)] justify-center items-center">
      Profile Page
      {JSON.stringify(data)}
    </div>
  ) : null;
};

export default PageProfile;
