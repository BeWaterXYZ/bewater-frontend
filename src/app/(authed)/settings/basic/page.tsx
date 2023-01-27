'use client';
import { AvatarWithEditor } from '@/components/avatar';
import { TagRole, TagSkill } from '@/components/tag';
import { useLoadingWhen } from '@/components/loading/store';
import { useFetchUser } from '@/services/user';
import { useAuthStore } from '@/stores/auth';

import { FormUserSettings } from './form/form-settings';

export default function Page() {
  const user = useAuthStore((s) => s.user);

  const { error, data, isLoading } = useFetchUser(user.userId);

  useLoadingWhen(isLoading);

  if (isLoading) return null;

  if (error) {
    console.error(error);
    return <div>Error occurs!</div>;
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
