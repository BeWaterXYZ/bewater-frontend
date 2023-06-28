'use client';
import { useLoadingWhen } from '@/components/loading/store';
import { useFetchUser } from '@/services/user.query';
import { useClerk } from '@clerk/nextjs';
import { FormOnboardingExtra } from './form';

export default function Page({ params }: { params: { lng: string } }) {
  const { lng = 'en' } = params || {};
  const user = useClerk().user
  const { data, isLoading } = useFetchUser(user?.id);

  useLoadingWhen(isLoading);

  if (!data) return null;

  return (
    <div className="h-full container flex flex-col  justify-center items-center  md:my-20">
      <div className="md:max-w-[450px]  w-full flex flex-col">
        <h5 className="text-day  heading-5">
          Hi, {user?.fullName}!
          <br />
          {"Let's do the last step."}
        </h5>
        <p className="break-words body-2 text-grey-500 my-4">
          Pick roles that describe you and as many skills as you have. These
          help others recognize you.
        </p>

        <FormOnboardingExtra lng={lng} />
      </div>
    </div>
  );
}
