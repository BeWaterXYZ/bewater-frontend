'use client';
import { useNavigator } from '@/hooks/useNavigator';

import { FormOnboarding } from './form';

export default function Page({ params }: { params: { lng: string } }) {
  const { lng = 'en' } = params || {};

  const navigator = useNavigator(lng);
  const onComplete = () => {
    navigator.gotoOnboardingExtra();
  };

  return (
    <div className="h-full container flex flex-col  justify-center items-center  md:my-20">
      <div className="md:max-w-[450px]  w-full flex flex-col">
        <h5 className="text-day  heading-5">Welcome aboard!</h5>

        <FormOnboarding onComplete={onComplete} />
      </div>
    </div>
  );
}
