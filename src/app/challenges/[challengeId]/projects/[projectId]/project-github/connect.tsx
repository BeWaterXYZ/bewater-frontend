'use client';
import { useLoadingStoreAction } from '@/components/loading/store';
import { getOAuthUrl } from '@/services/auth';
import Image from 'next/image';

export function UserConnectGithub() {
  const { showLoading, dismissLoading } = useLoadingStoreAction();

  const onUserConnectGithub = async () => {
    showLoading();
    let data = await getOAuthUrl({
      platform: 'github',
      redirectURI: window.location.href,
    });
    window.location.href = data.oauthURL;
  };
  return (
    <div className="p-6 rounded bg-[#0B0C24] border border-grey-800 flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Image src="/icons/github.svg" alt="github" height={20} width={20} />
          <h5 className="body-2">Connect to Your GitHub Account</h5>
        </div>
        <button className="btn btn-secondary" onClick={onUserConnectGithub}>
          Connect
        </button>
      </div>
      <div>
        <p className="body-3 text-grey-500">
          To connect this project with a GitHub repository to display more info,
          connect your GitHub account first.
        </p>
      </div>
    </div>
  );
}
