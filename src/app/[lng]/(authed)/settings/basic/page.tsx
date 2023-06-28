'use client';
import { AvatarWithEditor } from '@/components/avatar/avatar-with-editor';
import { useLoadingWhen } from '@/components/loading/store';
import { useFetchUser } from '@/services/user.query';
import { useAuthStore } from '@/stores/auth';
import { useClerk } from '@clerk/nextjs';

import { FormUserSettings } from './form/form-settings';

export default function Page() {
  // const user = useClerk().user;
  // console.log(user);
  const clerk = useClerk();
  console.log(clerk.user?.id)
  const { data, isLoading } = useFetchUser(clerk.user?.id);

  useLoadingWhen(isLoading);

  if (isLoading) return null;
  return (
    <div className="pt-8">
      <AvatarWithEditor
        walletAddress={data?.userProfile?.walletAddress}
        src={data?.userProfile?.avatarURI}
      />
      <FormUserSettings data={data!} />
    </div>
  );
}
