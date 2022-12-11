// import { Loading } from '@/components/loading/loading';
import { useAuthStore } from '@/stores/auth';

import { FormOnboarding } from './form/onboarding';

import type { NextPage } from 'next';

// Pass client to React Context Provider
export const PageUserOnboarding: NextPage = () => {
  const user = useAuthStore((s) => s.user);
  return (
    <>
      <div className="flex flex-col h-full justify-center items-center">
        <div className="w-[280px] flex flex-col">
          <div className="bg-gradient-to-r from-[#fc9e1c] to-[#f62584] bg-clip-text text-transparent heading-1">
            {'Welcome aboard,'}
          </div>
          <FormOnboarding user={user} />
        </div>
      </div>
    </>
  );
};

PageUserOnboarding.displayName = 'PageWelcome';
