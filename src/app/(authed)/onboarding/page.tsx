'use client';
import { useNavigator } from '@/hooks/useNavigator';
import { useAuthStore } from '@/stores/auth';

import { FormOnboarding } from './form/onboarding';

export default function Page() {
  const user = useAuthStore((s) => s.user);
  const navigator = useNavigator();
  const onComplete = () => {
    navigator.gotoAfterConnect();
  };
  return (
    <div className="flex flex-col h-full justify-center items-center  md:my-20">
      <div className="md:w-[450px]  flex flex-col">
        <h5 className="text-day  heading-5 my-4">Welcome aboard,</h5>
        <FormOnboarding user={user} onComplete={onComplete} />
      </div>
    </div>
  );
}
