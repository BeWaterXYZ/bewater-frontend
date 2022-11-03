// import { Loading } from '@/components/loading/loading';
import { FormWelcome } from '@/components/form/form-welcome';
import { useLocalStorage } from 'react-use';

import type { NextPage } from 'next';
import type { UserLocalStorage } from '@/models/user';
import { useEffect, useState } from 'react';

// Pass client to React Context Provider
const PageWelcome: NextPage = () => {
  const [user, setUser] = useState<UserLocalStorage>();
  const [userLocale] = useLocalStorage<UserLocalStorage>('user');
  useEffect(() => {
    setUser(userLocale);
  }, [userLocale]);
  // if (!user.userId || !user.walletAddress) {
  // }
  return (
    <div className="flex flex-col h-[calc(100vh-160px)] justify-center items-center">
      <div className="w-[280px] flex flex-col">
        <div className="bg-linearWelcome bg-clip-text text-transparent typ-h2">
          {'Welcome aboard,'}
        </div>
        <div className="typ-body pb-10 break-words">
          <div>ProfileId: {user?.userId}</div>
          <div>Wallet Address: {user?.walletAddress}</div>
        </div>
        <FormWelcome />
      </div>
    </div>
  );
};

export default PageWelcome;
