import { Loading } from '@/components/loading/loading';
import { FormProfile } from '@/components/form';
import { AvatarOnly } from '@/components/avatar';
import { Button } from '@/components/button';
import { useFetchUser } from '@/services/user';

import type { NextPage } from 'next';

// Pass client to React Context Provider
const PageUserSettings: NextPage = () => {
  const { isLoading, isError, error, data } = useFetchUser({ userId: '123' });
  if (isError) {
    console.error(error);
    return <div>Error occurs!</div>;
  }
  return !isLoading ? (
    <div className="flex flex-row h-[calc(100vh-160px)] content-width mx-auto">
      <div className="w-[270px] pt-10 border-r border-solid border-[#E4E4E4]">
        <div className="w-full flex flex-col justify-center items-center">
          <AvatarOnly
            walletAddress={data?.userProfile?.walletAddress}
            imageUrl={data?.userProfile?.avatarURI}
          />
          <Button className="mt-4 mb-6" type="secondary" text="Change Avatar" />
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
        <FormProfile />
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default PageUserSettings;
