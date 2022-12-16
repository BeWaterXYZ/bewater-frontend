'use client';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';

import { FormOnboarding } from './form/onboarding';

export default function Page() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();
  const onComplete = () => {
    router.push('/user/settings');
  };
  return (
    <>
      <div className="flex flex-col h-full justify-center items-center  md:my-20">
        <div className="md:w-[450px]  flex flex-col">
          <h5 className="text-day  heading-5 my-4">Welcome aboard,</h5>
          <FormOnboarding user={user} onComplete={onComplete} />
        </div>
      </div>
    </>
  );
}
