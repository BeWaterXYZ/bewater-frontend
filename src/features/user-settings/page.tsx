import { AvatarWithEditor } from '@/components/avatar';
import { useAuthStore } from '@/stores/auth';
import { useFetchUser } from '@/services/user';
import { Loading } from '@/components/loading';

import { useRequireAuthed } from '../../hooks/useRequireAuthed';

import { FormSettingsWrapper } from './form-settings';

import type { NextPage } from 'next';

export const UserSettings: NextPage = () => {
  useRequireAuthed();
  const user = useAuthStore((s) => s.user);
  const { error, data, isLoading } = useFetchUser(user.userId);

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>Error occurs!</div>;
  }
  return data ? (
    <div className="flex flex-row h-full container flex-wrap">
      <div className="w-full  md:w-1/3  pt-10 border-none md:border-r md:border-solid border-border flex flex-col items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <AvatarWithEditor
            walletAddress={user.walletAddress}
            src={user?.avatarURI}
          />
        </div>
        <div>
          <div>Bio</div>
          <textarea
            className="mt-2 h-20 p-4 border border-solid border-border"
            placeholder="Some One’s super legit introduction / bio."
          />
        </div>
      </div>
      <div className="w-full md:w-2/3 pt-10 md:pl-16">
        <FormSettingsWrapper user={user} data={data} />
      </div>
    </div>
  ) : null;
};
