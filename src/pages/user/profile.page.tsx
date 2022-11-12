import { useFetchUser } from '@/services/user';
import { Loading } from '@/components/loading/loading';
import { useAuthContext } from '@/hooks/useAuth';

import type { NextPage } from 'next';

// Pass client to React Context Provider
const PageProfile: NextPage = () => {
  const token = useAuthContext();
  const { isLoading, isError, error, data } = useFetchUser(token.user.userId);
  if (isError) {
    console.error(error);
    return <div>Error occurs!</div>;
  }
  return !isLoading ? (
    <div className="flex flex-col h-[calc(100vh-160px)] justify-center items-center">
      Profile Page
      {JSON.stringify(data)}
    </div>
  ) : (
    <Loading />
  );
};

export default PageProfile;
