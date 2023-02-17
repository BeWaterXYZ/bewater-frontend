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

export default function WalletOptions() {
  const addToast = useToastStore((s) => s.add);
  const openDialog = useDialogStore((s) => s.open);
  const clearToast = useToastStore((s) => s.clear);
  const setAuthState = useAuthStore((s) => s.setState);
  const { showLoading, dismissLoading } = useLoadingStoreAction();
  const navigator = useNavigator();
  const { connectors } = useConnect();

  const availableConnectors = connectors.filter((c) => c.ready);
  const onConnectorClick = async (connector: Connector) => {
    console.log(connector.name);

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
          const { token, userProfile } = await verifyMessage(message, address);
          setAuthState({
            token,
            user: userProfile,
            walletAddress: address,
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
      <div className="my-4 w-full flex flex-col ">
        {availableConnectors.map((connector, index) => (
          <button
            style={{ top: index * -2 }}
            className={clsx(
              'relative btn btn-primary-invert body-4  w-full h-12',
            )}
            key={connector.id}
            onClick={() => void onConnectorClick(connector)}
          >
            <span className=" text-day uppercase">
              Connect {connector.name}
            </span>
          </button>
        ))}
      </div>
    </>
  );
}
