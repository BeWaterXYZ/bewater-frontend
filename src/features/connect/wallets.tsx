import clsx from 'clsx';
import { useToggle } from 'react-use';
import { useConnect } from 'wagmi';

import { Loading } from '@/components/loading';
import { Logo } from '@/components/logos';
import useNavigator from '@/hooks/useNavigator';
import { useAuthStore } from '@/stores/auth';
import { useModalStore } from '@/stores/modal';

import { connectWallet, startSignMsgAndVerify } from './connect';

import type { Connector } from 'wagmi';

interface Props {
  onError?: (text?: string) => void;
}

export function WalletOptions({ onError }: Props) {
  const setAuthState = useAuthStore((s) => s.setState);
  const [isLogining, setIsLogining] = useToggle(false);
  const navigator = useNavigator();
  const openModal = useModalStore((s) => s.open);
  const { connectors } = useConnect();

  const onConnectorClick = async (connector: Connector) => {
    if (!connector.ready) {
      if (connector.id === 'metaMask') {
        openModal('metamask');
        return;
      }
    }
    try {
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
          navigator.goToWelcome();
        } else {
          navigator.goToUserSettings();
        }
      }
    } catch (error) {
      onError && onError('Connect Wallet Failed. Please try again.');
    } finally {
      setIsLogining(false);
    }
  };

  return (
    <>
      <div className="w-[320px]">
        {connectors.map((connector, i) => (
          <button
            className={clsx(
              'w-full h-12 border-t border-l border-r border-solid border-border flex flex-row items-center px-4 gap-x-4',
              'hover:bg-border',
              {
                'rounded-t-md': i === 0,
                'rounded-b-md border-b': i === connectors.length - 1,
              },
            )}
            key={connector.id}
            onClick={() => void onConnectorClick(connector)}
          >
            <Logo code={connector.name} />
            <span>{connector.name}</span>
          </button>
        ))}
      </div>
      {isLogining ? <Loading /> : null}
    </>
  );
}
