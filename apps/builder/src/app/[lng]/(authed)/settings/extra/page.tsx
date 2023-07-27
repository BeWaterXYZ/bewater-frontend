'use client';
import {
  useLoadingStoreAction,
  useLoadingWhen,
} from '@/components/loading/store';
import { getOAuthUrl } from '@/services/auth';
import {
  useFetchUser,
  useFetchUserSocialConnections,
  useMutationDisconnectSocialConnection,
} from '@/services/user.query';
import { useClerk } from '@clerk/nextjs';
import Image from 'next/image';
import { FormUserSettings } from './form/form-settings';
export default function Page() {
  const user = useClerk().user;
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const { data: userProfile, isLoading } = useFetchUser(user?.id);
  const mutation = useMutationDisconnectSocialConnection();
  const { data: socialConnections, isLoading: isLoading2 } =
    useFetchUserSocialConnections(user?.id);

  useLoadingWhen(isLoading || isLoading2);

  if (isLoading || isLoading2) return null;

  if (!userProfile) return null;

  const connect = async (platform: string) => {
    showLoading();
    let data = await getOAuthUrl({
      platform: platform,
      redirectURI: window.location.href,
    });
    window.location.href = data.oauthURL;
  };
  const disconnect = async (platform: string) => {
    showLoading();
    try {
      await mutation.mutateAsync(platform);
    } finally {
      dismissLoading();
    }
  };

  return (
    <div className="container">
      <FormUserSettings data={userProfile!} />

      <div className="flex flex-row h-full  flex-wrap min-h-[50vh]">
        <div className="w-full mt-6 flex flex-col gap-3">
          {/* github figma */}
          {['GitHub', 'Figma'].map((platform) => {
            let connection = socialConnections?.find(
              (c) => c.platform.toLowerCase() === platform.toLowerCase(),
            );
            return (
              <div
                key={platform}
                className="rounded p-3 border border-midnight bg-latenight flex gap-2 justify-between "
              >
                <div className="flex  p-2">
                  <Image
                    src={`/icons/${platform.toLowerCase()}.svg`}
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
                      <p className="body-4 text-gray-300">
                        {connection?.handle}
                      </p>
                    </>
                  ) : (
                    <p className="body-4 text-grey-500">
                      Connect your{' '}
                      <span className="capitalize">{platform}</span> account
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
    </div>
  );
}
