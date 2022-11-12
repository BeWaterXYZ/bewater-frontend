import { useEffect } from 'react';
import clsx from 'clsx';
import { useAccount, useConnect, useNetwork, useSignMessage } from 'wagmi';
import { useToggle, useLocalStorage } from 'react-use';

import { Logo } from '@/components/logos';
import useNavigator from '@/hooks/useNavigator';
import { isAuthed, useAuthContext } from '@/hooks/useAuth';
import {
  submitGetLoginMessage,
  submitVerifySignedMessage,
} from '@/services/auth';

import type { UserLocalStorage } from '@/models/user';

export function ConnectWallet() {
  const [isLogining, setIsLogining] = useToggle(false);
  const [_token, setToken] = useLocalStorage<string>('authToken');
  const [_user, setUser] = useLocalStorage<UserLocalStorage>('user');
  const { isConnected, address } = useAccount();
  const navigator = useNavigator();
  const { chain } = useNetwork();
  const { signMessageAsync } = useSignMessage();
  const { connect, connectors } = useConnect();
  const authToken = useAuthContext();

  useEffect(() => {
    const asyncAuth = async () => {
      try {
        if (address && chain?.id) {
          const messageParams = {
            walletAddress: address,
            chain: `${chain?.id}`,
            network: 'evm',
          };
          const { message } = await submitGetLoginMessage(messageParams);
          // console.log({ message });
          const signature = await signMessageAsync({ message });
          // console.log({ signature });
          const { token, userId, isNewUser } = await submitVerifySignedMessage({
            message,
            signature,
          });
          setToken(token);
          setUser({
            ..._user,
            userId,
            walletAddress: address,
            isNewUser,
          });
          if (isNewUser) {
            navigator.goToWelcome();
          } else {
            navigator.goToUserSettings();
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthed(authToken) && _user) {
      if (_user.isNewUser) {
        navigator.goToWelcome();
      } else {
        navigator.goToUserSettings();
      }
    } else if (!isLogining && isConnected && !isAuthed(authToken)) {
      // console.log('start asyncAuth...');
      setIsLogining(true);
      void asyncAuth();
    }
  }, [
    isConnected,
    navigator,
    authToken,
    address,
    chain,
    isLogining,
    _user,
    setIsLogining,
    setToken,
    setUser,
    signMessageAsync,
  ]);

  return (
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
          onClick={() => connect({ connector })}
        >
          <Logo code={connector.name} />
          <span>{connector.name}</span>
          {/* {!connector.ready && ' (unsupported)'} */}
          {/* {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'} */}
        </button>
      ))}

      {/* {error && <div>{error.message}</div>} */}
    </div>
  );
}
