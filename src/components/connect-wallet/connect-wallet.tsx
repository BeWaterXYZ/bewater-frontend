import { useEffect } from 'react';
import clsx from 'clsx';
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSignMessage,
} from 'wagmi';
import { useToggle, useLocalStorage } from 'react-use';

import { Logo } from '@/components/logos';
import { Loading } from '@/components/loading';
import useNavigator from '@/hooks/useNavigator';
import { isAuthed, useAuthContext } from '@/hooks/useAuth';
import {
  submitGetLoginMessage,
  submitVerifySignedMessage,
} from '@/services/auth';
import { urlWithBasePath } from '@/utils/urlWithBasePath';

import type { Connector } from 'wagmi';
import type { UserLocalStorage } from '@/models/user';

export function ConnectWallet() {
  const [startLogin, setStartLogin] = useToggle(false);
  const [isLogining, setIsLogining] = useToggle(false);
  const [_token, setToken] = useLocalStorage<string>('authToken');
  const [_user, setUser] = useLocalStorage<UserLocalStorage>('user');
  const { isConnected, connector: activeConnector, address } = useAccount();
  const { disconnect } = useDisconnect();
  const navigator = useNavigator();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect({
      onError(error) {
        console.error('Error::::', error);
        // TODO: logger
      },
    });
  const authToken = useAuthContext();

  useEffect(() => {
    const asyncAuth = async () => {
      try {
        setIsLogining(true);
        if (address && chain?.id) {
          const messageParams = {
            walletAddress: address,
            chain: `${chain?.id}`,
            network: 'evm',
          };
          const { message } = await submitGetLoginMessage(messageParams);
          const signature = await signMessageAsync({ message });
          const { token, userId, userProfile } =
            await submitVerifySignedMessage({
              message,
              signature,
            });
          setToken(token);
          setUser({
            ..._user,
            userId,
            walletAddress: address,
            isNewUser: !userProfile,
          });
          if (!userProfile) {
            window.location.href = urlWithBasePath('/welcome');
          } else {
            window.location.href = urlWithBasePath('/user/settings');
          }
        }
      } catch (error) {
        console.error('asyncAuth::', error);
        // TODO: logger
      } finally {
        setIsLogining(false);
        setStartLogin(false);
        disconnect();
      }
    };

    if (isAuthed(authToken) && _user) {
      if (_user.isNewUser) {
        navigator.goToWelcome();
      } else {
        navigator.goToUserSettings();
      }
    } else if (
      startLogin &&
      !isLogining &&
      !isLoading &&
      isConnected &&
      !isAuthed(authToken)
    ) {
      void asyncAuth();
    }
  }, [
    isConnected,
    activeConnector,
    navigator,
    authToken,
    address,
    chain,
    startLogin,
    isLogining,
    isLoading,
    _user,
    setIsLogining,
    setStartLogin,
    setToken,
    setUser,
    signMessageAsync,
    disconnect,
  ]);

  const onClick = (connector: Connector) => {
    setStartLogin(true);
    if (!isConnected || activeConnector?.id !== connector.id) {
      connect({ connector });
    }
  };

  return (
    <>
      <div className="w-[320px]">
        {connectors.map((connector, i) => (
          <button
            className={clsx(
              'w-full h-12 border-t border-l border-r border-solid border-[#E4E4E4] flex flex-row items-center px-4 gap-x-4',
              'hover:bg-[#E4E4E4]',
              {
                'rounded-t-button': i === 0,
                'rounded-b-button border-b': i === connectors.length - 1,
              },
            )}
            // disabled={!connector.ready}
            key={connector.id}
            onClick={() => onClick(connector)}
          >
            <Logo code={connector.name} />
            <span>{connector.name}</span>
            {/* {!connector.ready && ' (unsupported)'} */}
            {isLoading &&
              connector.id === pendingConnector?.id &&
              ' (connecting)'}
          </button>
        ))}

        {error && (
          <div className="mt-3 text-center text-red-400">{error.message}</div>
        )}
      </div>
      {isLoading || isLogining ? <Loading /> : null}
    </>
  );
}
