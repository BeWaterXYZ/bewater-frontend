'use client';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';

import { FormOnboarding } from './form/onboarding';

export const PageUserOnboarding = () => {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const onComplete = () => {
    router.push('/user/settings');
  };
  return (
    <>
      <div className="flex flex-col h-full justify-center items-center">
        <div className="w-[280px] flex flex-col">
          <div className="bg-gradient-to-r from-[#fc9e1c] to-[#f62584] bg-clip-text text-transparent heading-1">
            {'Welcome aboard,'}
          </div>
          <FormOnboarding user={user} onComplete={onComplete} />
        </div>
      </div>
    </>
  );
};

PageUserOnboarding.displayName = 'PageWelcome';
