'use client';
import { useLoadingWhen } from '@/components/loading/store';
import { useFetchUser } from '@/services/user.query';
import { useClerk } from '@clerk/nextjs';
import { FormOnboardingExtra } from './form';
import Image from 'next/image';

export default function Page({ params }: { params: { lng: string } }) {
  const { lng = 'en' } = params || {};
  const user = useClerk().user;
  const { data, isLoading } = useFetchUser(user?.id);

  useLoadingWhen(isLoading);

  if (!data) return null;

  return (
    <div className="block ">
      <div className="h-full pt-20 container flex flex-col justify-center items-center my-20">
        <div className="md:max-w-[450px] w-full flex flex-col">
          <br />
          <h5 className="text-day heading-5">
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
      <Image
        height={204}
        width={468}
        src={'/assets/space.png'}
        className="block h-[300px]"
        alt=""
      />
    </div>
  );
}
