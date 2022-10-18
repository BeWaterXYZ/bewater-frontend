import clsx from 'clsx';

import Metamask from '@/components/logos/metamask.svg';
import Coinbase from '@/components/logos/coinbase.svg';
import WalletConnect from '@/components/logos/wallet-connect.svg';
import Discord from '@/components/logos/discord.svg';
import Github from '@/components/logos/github.svg';
import Google from '@/components/logos/google.svg';
import Twitter from '@/components/logos/twitter.svg';

export enum LogoCodes {
  metamask = 'metamask',
  coinbasewallet = 'coinbasewallet',
  walletconnect = 'walletconnect',

  discord = 'discord',
  github = 'github',
  google = 'google',
  twitter = 'twitter',
}

export interface LogoProps {
  /**
   * Applies a class attribute to svg element.
   */
  className?: string;
  /**
   * Applies logo code attributes to svg element.
   */
  code?: string;
}

interface innerProps {
  viewBox: string;
  className: string;
}

export const Logo = ({ className, code, ...restProps }: LogoProps) => {
  const iClassName = clsx('inline-block', className);
  const _code = code?.replaceAll(/\s/g, '').toLowerCase() as LogoCodes;
  const logos = {
    [LogoCodes.metamask]: (_props: innerProps) => <Metamask {..._props} />,
    [LogoCodes.coinbasewallet]: (_props: innerProps) => (
      <Coinbase {..._props} />
    ),
    [LogoCodes.walletconnect]: (_props: innerProps) => (
      <WalletConnect {..._props} />
    ),
    [LogoCodes.discord]: (_props: innerProps) => <Discord {..._props} />,
    [LogoCodes.github]: (_props: innerProps) => <Github {..._props} />,
    [LogoCodes.google]: (_props: innerProps) => <Google {..._props} />,
    [LogoCodes.twitter]: (_props: innerProps) => <Twitter {..._props} />,
  };
  const Logo = _code ? logos[_code] : null;

  return Logo ? (
    <Logo viewBox="0 0 16 16" className={iClassName} {...restProps} />
  ) : null;
};
