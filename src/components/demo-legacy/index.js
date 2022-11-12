import React, { useEffect } from 'react';
import axios from 'axios';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useAccount, useSignMessage, useNetwork } from 'wagmi';

import Discord from '@/components/logos/discord.svg';
import Github from '@/components/logos/github.svg';
import Google from '@/components/logos/google.svg';
import Twitter from '@/components/logos/twitter.svg';

import { WalletButton } from './walletButton';

const DemoLegacyContent = () => {
  const { isConnected, address } = useAccount();
  const { chain } = useNetwork();
  const { status } = useSession();
  const { signMessageAsync } = useSignMessage();
  const { data: session } = useSession();

  useEffect(() => {
    const handleAuth = async () => {
      const userData = { address, chain: chain.id, network: 'evm' };
      const { data } = await axios.post('/api/auth/request-message', userData, {
        headers: {
          'content-type': 'application/json',
        },
      });
      const message = data.message;
      const signature = await signMessageAsync({ message });
      const { url } = await signIn('credentials', {
        message,
        signature,
        redirect: false,
      });
    };
    if (status === 'unauthenticated' && isConnected) {
      handleAuth();
    }
  }, [isConnected]);

  return (
    <>
      {!session && (
        <div className="py-[120px] px-[50px]">
          <div id="content" className="w-[280px] mx-auto">
            <h1 className="typ-h5">Welcome aboard.</h1>
            <WalletButton />
            <div id="otherLogin">
              <button type="button" onClick={() => signIn('github')}>
                <Github className="inline-block mr-2" />
                <span>Sign in with Github</span>
              </button>
              <button type="button" onClick={() => signIn('discord')}>
                <Discord className="inline-block mr-2" />
                <span>Sign in with Discord</span>
              </button>
              <button type="button">
                <Twitter className="inline-block mr-2" />
                <span>Sign in with Twitter</span>
              </button>
              <button type="button" onClick={() => signIn('google')}>
                <Google className="inline-block mr-2" />
                <span>Sign in with Google</span>
              </button>
            </div>
            <div className="typ-body-small">
              By singning in or conecting wallet, you agree to our{' '}
              <span className="font-bold">Terms of Service </span>and
              acknowledge that you have read our{' '}
              <span className="font-bold">Privacy Policy</span> and{' '}
              <span className="font-bold">Cookie Use</span>.
            </div>
          </div>
        </div>
      )}
      {session && (
        <div>
          <h4>Signed in as {session.user.name}</h4>
          <h4>Users' email is {session.user.email} </h4>
          <h4>Users' access_token is {session.accessToken} </h4>
          <h4>Users' wallet address is {session.user.address} </h4>
          <h4>Users' profile id is {session.user.profileId} </h4>
          <h4>Users' signature is {session.user.signature} </h4>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </>
  );
};

export default DemoLegacyContent;
