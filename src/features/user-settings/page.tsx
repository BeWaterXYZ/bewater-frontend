import { AvatarWithEditor } from '@/components/avatar';
import { useAuthStore } from '@/stores/auth';

import { useRequireAuthed } from '../../hooks/useRequireAuthed';

import { FormSettingsWrapper } from './form-settings';

import type { NextPage } from 'next';

export const UserSettings: NextPage = () => {
  useRequireAuthed();
  const user = useAuthStore((s) => s.user);
  return (
    <div className="flex flex-row h-[calc(100vh-160px)] container">
      <div className="w-[270px] pt-10 border-r border-solid border-[#E4E4E4]">
        <div className="w-full flex flex-col justify-center items-center">
          <AvatarWithEditor
            walletAddress={user.walletAddress}
            src={user?.avatarURI}
          />
        </div>
        <div>
          <div>Bio</div>
          <textarea
            className="mt-2 h-20 p-4 border border-solid border-[#E4E4E4]"
            placeholder="Some One’s super legit introduction / bio."
          />
        </div>
      </div>
      <div className="w-[750px] pt-10 pl-16">
        <FormSettingsWrapper user={user} />
      </div>
    </div>
  );
};
