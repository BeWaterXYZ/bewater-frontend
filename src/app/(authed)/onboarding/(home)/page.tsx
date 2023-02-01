'use client';
import { useNavigator } from '@/hooks/useNavigator';
import { useAuthStore } from '@/stores/auth';
import { useEffect, useState } from 'react';

import { FormOnboarding } from './form';

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const user = useAuthStore((s) => s.user);
  const navigator = useNavigator();
  const onComplete = () => {
    navigator.gotoOnboardingExtra();
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="h-full container flex flex-col  justify-center items-center  md:my-20">
      <div className="md:max-w-[450px]  w-full flex flex-col">
        <h5 className="text-day  heading-5">Welcome aboard!</h5>
        {/* fix me  */}
        {mounted && (
          <p className="break-words body-2 text-grey-500 my-4">
            {user?.walletAddress}
          </p>
        )}
        <FormOnboarding user={user!} onComplete={onComplete} />
      </div>
    </div>
  );
}
