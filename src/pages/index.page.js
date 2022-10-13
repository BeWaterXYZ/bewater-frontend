import { HeaderWrapper } from '@/components/header';
import { Footer } from '@/components/footer';
import React ,{ useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { WalletButton } from './walletButton';
import { useAccount, useSignMessage, useNetwork } from 'wagmi'
import axios from 'axios'

const App = () => {
    const { isConnected, address } = useAccount()
    const { chain } = useNetwork()
    const { status } = useSession()
    const { signMessageAsync } = useSignMessage()
    const { data: session } = useSession();

    useEffect(() => {
        const handleAuth = async () => {
            const userData = { address, chain: chain.id, network: 'evm' }

            const { data } = await axios.post('/api/auth/request-message', userData, {
                headers: {
                    'content-type': 'application/json',
                },
            })

            const message = data.message

            const signature = await signMessageAsync({ message })

            const { url } = await signIn('credentials', {
                message,
                signature,
                redirect: false,
            })
        }
        if (status === 'unauthenticated' && isConnected) {
            handleAuth()
        }
    }, [isConnected])

    return(
        <div className="layout" data-theme="light">
            <HeaderWrapper />

            {!session && (
                 <div
                  style={{
                    padding: '120px 50px',
                    background: 'white'
                  }}
                >
                    <div id="content" className='mx-auto'>
                      <h1 className='typ-h5'>Welcome aboard.</h1>
                      <WalletButton />
                      <div id="otherLogin">
                          <button type="button" onClick={() => signIn('github')}>
                            Sign in with Github
                          </button>
                          <button type="button" onClick={() => signIn('discord')}>
                            Sign in with Discord
                          </button>
                          <button type="button">
                            Sign in with Twitter
                          </button>
                          <button type="button" onClick={() => signIn('google')}>
                            Sign in with Google
                          </button>
                      </div>
                      <div className='typ-body-small'>By singning in or conecting wallet, you agree to our <b>Terms of Service </b>and acknowledge that you have read our <strong>Privacy Policy</strong> and <strong>Cookie Use</strong>.</div>
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
            <Footer />
        </div>
    );
}

export default App;
