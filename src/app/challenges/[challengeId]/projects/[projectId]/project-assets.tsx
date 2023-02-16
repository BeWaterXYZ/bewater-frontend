'use client';

import { Project } from '@/services/types';
import { useDialogStore } from '@/components/dialog/store';
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
import { useAuthStore } from '@/stores/auth';
import Image from 'next/image';

const data = [
  {
    label: 'Demo Link',
    key: 'demo',
  },
  {
    label: 'Video',
    key: 'video',
  },
  {
    label: 'Pitch Deck',
    key: 'pick',
  },
  {
    label: 'Github',
    key: 'github',
  },
];

export function ProjectAssets({ project }: { project: Project }) {
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const showDialog = useDialogStore((s) => s.open);
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
    } finally {
      dismissLoading();
    }
  };

  return (
    <div className="my-4 mb-8">
      <h3 className="body-3 font-bold text-grey-500">Assets</h3>
      <div className="w-full mt-6 flex flex-col gap-3">
        {data.map(({ label, key }) => {
          const connection = 1;
          return (
            <div
              key={key}
              className="rounded p-3 border border-midnight bg-[#0B0C24] flex gap-2 justify-between "
            >
              <div className="flex  p-2">
                <Image
                  src={`/icons/company/github.svg`}
                  width={24}
                  height={24}
                  alt={label}
                />
              </div>
              <div className="flex flex-col justify-around flex-1">
                {connection ? (
                  <>
                    <p className="body-4 text-gray-500 font-bold capitalize">
                      {label}
                    </p>
                    <p className="body-4 text-gray-300">{connection}</p>
                  </>
                ) : (
                  <p className="body-4 text-grey-500">
                    Connect your <span className="capitalize">{label}</span>{' '}
                    account
                  </p>
                )}
              </div>
              <div>
                {connection ? (
                  <button
                    className="btn btn-secondary-invert"
                    onClick={() => disconnect(key)}
                  >
                    Disconnect
                  </button>
                ) : (
                  <button
                    className="btn btn-secondary"
                    onClick={() => connect(key)}
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
