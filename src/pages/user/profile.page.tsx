import { useFetchUser } from '@/services/user';
import { Loading } from '@/components/loading/loading';
import { useAuthContext } from '@/hooks/useAuth';

import type { NextPage } from 'next';
import { useAuthStore } from '@/stores/auth';

// Pass client to React Context Provider
const PageProfile: NextPage = () => {
  const user = useAuthStore((s) => s.user);
  const { error, data } = useFetchUser(user.userId);
  if (error) {
    console.error(error);
    return <div>Error occurs!</div>;
  }
  return data ? (
    <div className="flex flex-col h-[calc(100vh-160px)] justify-center items-center">
      Profile Page
      {JSON.stringify(data)}
    </div>
  ) : (
    <Loading />
  );
};

export default PageProfile;
