'use client';
import { AvatarWithEditor } from '@/components/avatar';
import { Select } from '@/components/form/control';
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
            <p className="body-4 my-4">Roles</p>
            <Select options={[{ value: '', label: 'Select your roles' }]} />
            <span className=" inline-block rounded-sm h-6 bg-red-600 border border-red-700  body-4 px-2 py-1 my-1 ">
              Designer
            </span>
            <span className="inline-block rounded-sm h-6 bg-green-600 border border-green-700  body-4 px-2 py-1 my-1">
              Frontend Developer
            </span>
            <span className="inline-block rounded-sm h-6 bg-blue-600 border border-blue-700  body-4 px-2 py-1 my-1">
              Backend Developer
            </span>
            <span className="inline-block rounded-sm h-6 bg-indigo-600 border border-indigo-700  body-4 px-2 py-1 my-1 ">
              Blockchain Developer
            </span>
          </div>
          <hr className="border-titanium/20 my-4" />

          <div className="text-left w-full my-4">
            <p className="body-4 my-4">Skills</p>
            <Select options={[{ value: '', label: 'Select your skills' }]} />

            <div className="flex flex-wrap">
              {[
                '#React',
                '#Swift',
                '#Rust',
                '#TypeScript',
                '#ReactNative',
                '#SwiftUI',
              ].map((skill) => {
                return (
                  <span
                    key={skill}
                    className="rounded-full h-6 bg-gray-400/20  body-4 px-3 py-1 m-1 "
                  >
                    {skill}
                  </span>
                );
              })}
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
