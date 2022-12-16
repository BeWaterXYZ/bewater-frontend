'use client';
import clsx from 'clsx';
import { useToggle } from 'react-use';
import { useConnect } from 'wagmi';

import { Loading } from '@/components/loading';
import { Logo } from '@/components/logos';
// import useNavigator from '@/hooks/useNavigator';
import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/components/toast/store';
import { useDialogStore } from '@/components/dialog/store';

import { connectWallet, startSignMsgAndVerify } from './connect';

import type { Connector } from 'wagmi';
import { useRouter } from 'next/navigation';

export function WalletOptions() {
  const addToast = useToastStore((s) => s.add);
  const openDialog = useDialogStore((s) => s.open);
  const clearToast = useToastStore((s) => s.clear);
  const setAuthState = useAuthStore((s) => s.setState);
  const [isLogining, setIsLogining] = useToggle(false);
  // const navigator = useNavigator();
  let router = useRouter();
  const { connectors } = useConnect();

  const connector = connectors.filter((c) => c.ready)[0];

  const onConnectorClick = async (connector: Connector) => {
    if (!connector.ready) {
      if (connector.id === 'metaMask') {
        openDialog('metamask_not_support', true);
        // openModal('metamask');
        return;
      }
    }
    try {
      clearToast();
      setIsLogining(true);
      const { address, chainId } = await connectWallet(connector);
      if (address && chainId) {
        const { token, userId, userProfile } = await startSignMsgAndVerify(
          address,
          chainId,
        );

        setAuthState({
          token,
          user: { userId, walletAddress: address, isNewUser: !userProfile },
        });

        if (!userProfile) {
          // navigator.goToWelcome();
          router.push('/user/onboarding');
        } else {
          // navigator.goToUserSettings();
          router.push('/user/settings');
        }
      }
    } catch (error) {
      addToast({
        title: 'Oops',
        description: 'Connect Wallet Failed. Please try again.',
        type: 'error',
      });
    } finally {
      setIsLogining(false);
    }
  };

  return (
    <>
      <div className="min-h-[200px]">
        <button
          className={clsx(
            ' w-full h-12 border border-solid border-day  flex flex-row justify-center items-center px-4 gap-x-4',
          )}
          key={connector.id}
          onClick={() => void onConnectorClick(connector)}
        >
          {/* <Logo code={connector.name} /> */}
          {/* <span className="body-2">{connector.name}</span> */}
          <span className="body-2 text-day uppercase">Connect Wallet</span>
        </button>
      </div>
      {isLogining ? <Loading /> : null}
    </>
  );
}
