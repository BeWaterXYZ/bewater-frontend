// import { Loading } from '@/components/loading/loading';
import { useAlert } from '@/components/alert';
import { useAuthStore } from '@/stores/auth';

import { FormWelcome } from './form-welcome';

import type { NextPage } from 'next';

// Pass client to React Context Provider
export const PageUserOnboarding: NextPage = () => {
  const { Alert, onAlert } = useAlert({
    title: 'An error occurs',
    text: 'Create user failed, please visit the site later',
  });
  const user = useAuthStore((s) => s.user);
  return (
    <>
      <div className="flex flex-col h-[calc(100vh-160px)] justify-center items-center">
        <div className="w-[280px] flex flex-col">
          <div className="bg-gradient-to-r from-[#fc9e1c] to-[#f62584] bg-clip-text text-transparent heading-1">
            {'Welcome aboard,'}
          </div>
          <FormWelcome user={user} onError={onAlert} />
        </div>
      </div>
      <Alert />
    </>
  );
};

PageUserOnboarding.displayName = 'PageWelcome';
