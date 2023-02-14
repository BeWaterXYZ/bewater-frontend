'use client';
import { useDialogStore } from '@/components/dialog/store';
import { useLoadingWhen } from '@/components/loading/store';
import { getOAuthUrl } from '@/services/auth';
import {
  useFetchUser,
  useFetchUserSocialConnections,
} from '@/services/user.query';
import { useAuthStore } from '@/stores/auth';
import Image from 'next/image';
export default function Page() {
  const user = useAuthStore((s) => s.user);
  const showDialog = useDialogStore((s) => s.open);
  const { data: userProfile, isLoading } = useFetchUser(user?.userId);
  const { data: socialConnections, isLoading: isLoading2 } =
    useFetchUserSocialConnections(user?.userId);

  useLoadingWhen(isLoading || isLoading2);

  if (isLoading || isLoading2) return null;

  if (!userProfile) return null;

  const changeEmail = () => {
    showDialog('email_change', true);
  };
  const connect = (platform: string) => {
    let data = getOAuthUrl({
      platform: platform,
      redirectURI: window.location.href,
    });
  };
  const disconnect = (platform: string) => {
    let data = getOAuthUrl({
      platform: platform,
      redirectURI: window.location.href,
    });
  };

  return (
    <div className="flex flex-row h-full container flex-wrap min-h-[50vh]">
      <div className="w-full mt-6 flex flex-col gap-3">
        {/* wallet address  */}
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
            <p className="body-4 text-gray-300 break-all">
              {userProfile.userProfile?.walletAddress}
            </p>
          </div>
        </div>
        {/* email */}
        <div className="rounded p-3 border border-midnight bg-[#0B0C24] flex gap-2 justify-between ">
          <div className="flex  p-2">
            <Image src="/icons/email.svg" width={24} height={24} alt="email" />
          </div>
          <div className="flex flex-col justify-around flex-1">
            <p className="body-4 text-gray-500 font-bold">Email</p>
            <p className="body-4 text-gray-300">
              {userProfile.userProfile?.email}
            </p>
          </div>
          <div>
            <button className="btn btn-secondary-invert" onClick={changeEmail}>
              Change
            </button>
          </div>
        </div>
        {/* github figma */}
        {['github', 'figma'].map((platform) => {
          let connection = socialConnections?.find(
            (c) => c.platform === platform,
          );
          return (
            <div
              key={platform}
              className="rounded p-3 border border-midnight bg-[#0B0C24] flex gap-2 justify-between "
            >
              <div className="flex  p-2">
                <Image
                  src={`/icons/company/${platform}.svg`}
                  width={24}
                  height={24}
                  alt={platform}
                />
              </div>
              <div className="flex flex-col justify-around flex-1">
                {connection ? (
                  <>
                    <p className="body-4 text-gray-500 font-bold capitalize">
                      {platform}
                    </p>
                    <p className="body-4 text-gray-300">{connection?.handle}</p>
                  </>
                ) : (
                  <p className="body-4 text-grey-500">
                    Connect your <span className="capitalize">{platform}</span>{' '}
                    account
                  </p>
                )}
              </div>
              <div>
                {connection ? (
                  <button
                    className="btn btn-secondary-invert"
                    onClick={() => disconnect(platform)}
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => connect(platform)}
                  >
                    Connect
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
