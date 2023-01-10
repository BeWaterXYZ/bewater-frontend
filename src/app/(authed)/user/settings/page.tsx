'use client';
import { AvatarWithEditor } from '@/components/avatar';
import { Skill, TagRole, TagSkill } from '@/components/tag';
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
    <div className="flex flex-row h-full container flex-wrap">
      <div className="w-full  md:w-1/3  pt-10  flex flex-col items-center">
        <div className=" w-[200px]">
          <AvatarWithEditor
            walletAddress={data?.userProfile?.walletAddress}
            src={data?.userProfile?.avatarURI}
          />
          <div className="text-left w-full my-4">
            <p className="body-4 my-4 gap-2">Roles</p>
            <TagRole label="Designer" onClick={() => {}} />
            <TagRole label="Frontend Developer" onClick={() => {}} />
          </div>
          <hr className="border-titanium/20 my-4" />

          <div className="text-left w-full my-4">
            <p className="body-4 my-4">Skills</p>

            <div className="flex flex-wrap gap-2">
              <TagSkill label={'Solidity'} onClick={() => {}} />
              <TagSkill label={'React'} onClick={() => {}} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3 pt-10 md:pl-16">
        <FormUserSettings user={user} data={data!} />
      </div>
    </div>
  );
}
