'use client';
import { useLoadingWhen } from '@/components/loading/store';
import { useNavigator } from '@/hooks/useNavigator';
import { useFetchUser } from '@/services/user.query';
import { useAuthStore } from '@/stores/auth';
import { FormOnboardingExtra } from './form';
export default function Page() {
  const user = useAuthStore((s) => s.user);
  const { data, isLoading } = useFetchUser(user?.userId);
  const navigator = useNavigator();
  const onComplete = () => {
    navigator.gotoAfterConnect();
  };

  useLoadingWhen(isLoading);

  if (!data) return null;

  return (
    <div className="h-full container flex flex-col  justify-center items-center  md:my-20">
      <div className="md:max-w-[450px]  w-full flex flex-col">
        <h5 className="text-brand-500  heading-5">
          Hi, {data.userProfile?.fullName}!
          <br />
          {"Let's do the last step."}
        </h5>
        <p className="break-words body-2 text-gray-500 my-4">
          Pick roles that describe you and as many skills as you have. These
          help others recognize you.
        </p>

        <FormOnboardingExtra onComplete={onComplete} />
      </div>
    </div>
  );
}
