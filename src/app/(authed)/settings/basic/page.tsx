'use client';
import { AvatarWithEditor } from '@/components/avatar';
import { useLoadingWhen } from '@/components/loading/store';
import { useFetchUser } from '@/services/user.query';
import { useAuthStore } from '@/stores/auth';

import { FormUserSettings } from './form/form-settings';

export default function Page() {
  const user = useAuthStore((s) => s.user);

  const { error, data, isLoading } = useFetchUser(user.userId);

  useLoadingWhen(isLoading);

  if (isLoading) return null;

  // fix me
  if (error) {
    throw error;
  }

  return (
    <div className="pt-8">
      <AvatarWithEditor
        walletAddress={data?.userProfile?.walletAddress}
        src={data?.userProfile?.avatarURI}
      />
      <FormUserSettings user={user} data={data!} />
    </div>
  );
}
