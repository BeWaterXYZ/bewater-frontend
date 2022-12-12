'use client';
import { AvatarWithEditor } from '@/components/avatar';
import { useAuthStore } from '@/stores/auth';

import { FormSettingsWrapper } from './form-settings';

export const UserSettings = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex flex-row h-full container flex-wrap">
      <div className="w-full  md:w-1/3  pt-10 border-none md:border-r md:border-solid border-titanium flex flex-col items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <AvatarWithEditor
            walletAddress={user.walletAddress}
            src={user?.avatarURI}
          />
        </div>
        <div>
          <div>Bio</div>
          <textarea
            className="mt-2 h-20 p-4 border border-solid border-titanium"
            placeholder="Some One’s super legit introduction / bio."
          />
        </div>
      </div>
      <div className="w-full md:w-2/3 pt-10 md:pl-16">
        <FormSettingsWrapper user={user} />
      </div>
    </div>
  );
};
