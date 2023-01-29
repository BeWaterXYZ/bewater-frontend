'use client';
import clsx from 'clsx';
import { useConnect } from 'wagmi';

import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/components/toast/store';
import { useDialogStore } from '@/components/dialog/store';

import { connectWallet, getSignMessage, verifyMessage } from './connect';

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
        const { message, isWhitelisted } = await getSignMessage(
          address,
          chainId,
        );

        if (isWhitelisted && message) {
          const { token, userId, userProfile } = await verifyMessage(message);
          setAuthState({
            token,
            user: { userId, walletAddress: address, isNewUser: !userProfile },
          });

          if (!userProfile) {
            navigator.goToWelcome();
          } else {
            navigator.gotoAfterConnect();
          }
        } else {
          addToast({
            title: 'You are not in whitelist',
            description:
              'Stay tuned, we’re launching soon. Join waitlist to get notified when we launch',
            type: 'error',
          });
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
      <div className="min-h-[200px] w-[300px]">
        <button
          className={clsx(
            'btn btn-primary-invert mono-4  w-full h-12 flex flex-row justify-center items-center px-4 gap-x-4',
          )}
          key={connector.id}
          onClick={() => void onConnectorClick(connector)}
        >
          <span className=" text-day uppercase">Connect Wallet</span>
        </button>
      </div>
    </>
  );
}
