'use client';
import { useNavigator } from '@/hooks/useNavigator';
import { useAuthStore } from '@/stores/auth';
import { useEffect, useState } from 'react';

import { FormOnboarding } from './form';

export default function Page({ params }: { params: { lng: string } }) {
  const { lng = 'en' } = params || {};

  const [mounted, setMounted] = useState(false);
  const [walletAddress, onboarded] = useAuthStore((s) => [
    s.walletAddress,
    s.user ? true : false,
  ]);
  const navigator = useNavigator(lng);
  const onComplete = () => {
    navigator.gotoOnboardingExtra();
  };

  useEffect(() => {
    if (onboarded) {
      navigator.gotoAfterConnect();
    }
    setMounted(true);
  }, []);

  return (
    <div className="h-full container flex flex-col  justify-center items-center  md:my-20">
      <div className="md:max-w-[450px]  w-full flex flex-col">
        <h5 className="text-day  heading-5">Welcome aboard!</h5>
        {/* fix me  */}
        {mounted && (
          <p className="break-words body-2 text-grey-500 mt-4 mb-6">
            {walletAddress}
          </p>
        )}
        <FormOnboarding onComplete={onComplete} />
      </div>
    </div>
  );
}
