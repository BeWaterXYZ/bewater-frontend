// import { Loading } from '@/components/loading/loading';
import { FormProfileWrap } from '@/components/form';
import { AvatarWithEditor } from '@/components/avatar';
import { useAuthContext } from '@/hooks/useAuth';

import type { NextPage } from 'next';

// Pass client to React Context Provider
const PageUserSettings: NextPage = () => {
  const token = useAuthContext();
  return (
    <div className="flex flex-row h-[calc(100vh-160px)] content-width mx-auto">
      <div className="w-[270px] pt-10 border-r border-solid border-[#E4E4E4]">
        <div className="w-full flex flex-col justify-center items-center">
          <AvatarWithEditor
            walletAddress={token.user.walletAddress}
            src={token?.user?.avatarURI}
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
        <FormProfileWrap token={token} userId={token.user.userId || ''} />
      </div>
    </div>
  );
};

export default PageUserSettings;
