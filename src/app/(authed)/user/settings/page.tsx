'use client';
import { AvatarWithEditor } from '@/components/avatar';
import { Loading } from '@/components/loading';
import { useFetchUser } from '@/services/user';
import { useAuthStore } from '@/stores/auth';

import { FormUserSettings } from './form/form-settings';

export default function Page() {
  const user = useAuthStore((s) => s.user);

  const { error, data, isLoading } = useFetchUser(user.userId);

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>Error occurs!</div>;
  }

  return (
    <div className="flex flex-row h-full container flex-wrap">
      <div className="w-full  md:w-1/3  pt-10  flex flex-col items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <AvatarWithEditor
            walletAddress={data?.userProfile?.walletAddress}
            src={data?.userProfile?.avatarURI}
          />
        </div>
      </div>
      <div className="w-full md:w-2/3 pt-10 md:pl-16">
        <FormUserSettings user={user} data={data!} />
      </div>
    </div>
  );
}
