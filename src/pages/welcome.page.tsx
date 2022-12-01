// import { Loading } from '@/components/loading/loading';
import { FormWelcome } from '@/components/form/form-welcome';
import { useAlert } from '@/components/alert';
import { useAuthContext } from '@/hooks/useAuth';

import type { NextPage } from 'next';

// Pass client to React Context Provider
const PageWelcome: NextPage = () => {
  const { Alert, onAlert } = useAlert({
    title: 'An error occurs',
    text: 'Create user failed, please visit the site later',
  });
  return (
    <>
      <div className="flex flex-col h-[calc(100vh-160px)] justify-center items-center">
        <div className="w-[280px] flex flex-col">
          <div className="bg-linearWelcome bg-clip-text text-transparent typ-h2">
            {'Welcome aboard,'}
          </div>
          <FormWelcome onError={onAlert} />
        </div>
      </div>
      <Alert />
    </>
  );
};

PageWelcome.displayName = 'PageWelcome';

export default PageWelcome;
