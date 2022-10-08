import BWHeader from './header'
import BWFooter from './footer'
import { Layout, Button } from 'antd';
import React ,{ useEffect } from 'react';
import TwitterIcon from './twitterIcon';
import GithubIcon from './githubIcon';
import GoogleIcon from './googleIcon';
import DiscordIcon from './discordIcon';
import { useSession, signIn, signOut } from "next-auth/react";
import { WalletButton } from './walletButton';
import { useAccount, useSignMessage, useNetwork } from 'wagmi'
import axios from 'axios'

const { Content } = Layout;

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
        <Layout className="layout" theme="light">
            <BWHeader />
           
            {!session && (
                 <Content
                  style={{
                    padding: '120px 50px',
                    background: 'white'
                  }}
                >
                    <div id="content">
                        <h1>Welcome aboard.</h1>
                        <WalletButton />
                        <div id="otherLogin">
                            <Button type="text" icon={<GithubIcon />} onClick={() => signIn('github')}>Sign in with Github</Button>
                            <Button type="text" icon={<DiscordIcon />} onClick={() => signIn('discord')}>Sign in with Discord</Button>
                            <Button type="text" icon={<TwitterIcon />} >Sign in with Twitter</Button>
                            <Button type="text" icon={<GoogleIcon />} onClick={() => signIn('google')}>Sign in with Google</Button>
                        </div>
                      <text>By singning in or conecting wallet, you agree to our <b>Terms of Service </b>and acknowledge that you have read our <strong>Privacy Policy</strong> and <strong>Cookie Use</strong>.</text>
                    </div>
            </Content>
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
            <BWFooter />
        </Layout>
    );
}

export default App;