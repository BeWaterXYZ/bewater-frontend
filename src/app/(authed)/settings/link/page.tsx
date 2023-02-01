'use client';
import { useDialogStore } from '@/components/dialog/store';
import { useLoadingWhen } from '@/components/loading/store';
import { useFetchUser } from '@/services/user.query';
import { useAuthStore } from '@/stores/auth';
import Image from 'next/image';
export default function Page() {
  const user = useAuthStore((s) => s.user);
  const showDialog = useDialogStore((s) => s.open);
  const { error, data, isLoading } = useFetchUser(user?.userId);

  useLoadingWhen(isLoading);

  if (isLoading) return null;

  // fix me
  if (error) {
    throw error;
  }
  if (!data) return null;

  const changeEmail = () => {
    showDialog('email_change', true);
  };

  return (
    <div className="flex flex-row h-full container flex-wrap min-h-[50vh]">
      <div className="w-full mt-6 flex flex-col gap-3">
        <div className="rounded p-3 border border-midnight bg-[#0B0C24] flex gap-2 ">
          <div className="flex  p-2">
            <Image
              src="/icons/wallet.svg"
              width={24}
              height={24}
              alt="wallet"
            />
          </div>
          <div className="flex flex-col justify-around">
            <p className="body-4 text-gray-500 font-bold">Wallet Address</p>
            <p className="body-4 text-gray-300 break-words">
              {data.userProfile?.walletAddress}
            </p>
          </div>
        </div>

        <div className="rounded p-3 border border-midnight bg-[#0B0C24] flex gap-2 justify-between ">
          <div className="flex  p-2">
            <Image src="/icons/email.svg" width={24} height={24} alt="email" />
          </div>
          <div className="flex flex-col justify-around flex-1">
            <p className="body-4 text-gray-500 font-bold">Email</p>
            <p className="body-4 text-gray-300">{data.userProfile?.email}</p>
          </div>

          <div>
            <button className="btn btn-secondary-invert" onClick={changeEmail}>
              Change
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
