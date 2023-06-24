'use client';
import { AvatarWithEditor } from '@/components/avatar/avatar-with-editor';
import { useLoadingWhen } from '@/components/loading/store';
import { useFetchUser } from '@/services/user.query';
import { useAuthStore } from '@/stores/auth';

import { FormUserSettings } from './form/form-settings';

export default function Page() {
  const user = useAuthStore((s) => s.user);
  //console.log(user);

  const { data, isLoading } = useFetchUser(user?.externalId);

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
