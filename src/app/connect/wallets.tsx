'use client';
import clsx from 'clsx';
import { useConnect } from 'wagmi';

import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/components/toast/store';
import { useDialogStore } from '@/components/dialog/store';

import { connectWallet, startSignMsgAndVerify } from './connect';

import type { Connector } from 'wagmi';
import { useLoadingStoreAction } from '@/components/loading/store';
import { useNavigator } from '@/hooks/useNavigator';

export function WalletOptions() {
  const addToast = useToastStore((s) => s.add);
  const openDialog = useDialogStore((s) => s.open);
  const clearToast = useToastStore((s) => s.clear);
  const setAuthState = useAuthStore((s) => s.setState);
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const navigator = useNavigator();
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
      showLoading();
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
          navigator.goToWelcome();
        } else {
          navigator.gotAfterConnect();
        }
      }
    } catch (error) {
      addToast({
        title: 'Oops',
        description: 'Connect Wallet Failed. Please try again.',
        type: 'error',
      });
    } finally {
      dismissLoading();
    }
  };

  return (
    <>
      <div className="min-h-[200px]">
        <button
          className={clsx(
            'btn btn-primary-invert w-full h-12 flex flex-row justify-center items-center px-4 gap-x-4',
          )}
          key={connector.id}
          onClick={() => void onConnectorClick(connector)}
        >
          {/* <Logo code={connector.name} /> */}
          {/* <span className="body-2">{connector.name}</span> */}
          <span className="body-2 text-day uppercase">Connect Wallet</span>
        </button>
      </div>
    </>
  );
}
