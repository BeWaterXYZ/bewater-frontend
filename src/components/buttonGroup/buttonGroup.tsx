import clsx from 'clsx';

import { ButtonGroupItem } from './buttonGroup-item';

interface Props {
  className?: string;
}

export const ButtonGroup = ({ className }: Props) => {
  return (
    <ul
      className={clsx(
        'w-80 list-none border border-solid border-[#E4E4E4] rounded-[7px] ',
        className,
      )}
    >
      <ButtonGroupItem name="MetaMask" />
      <ButtonGroupItem name="Coinbase Wallet" />
      <ButtonGroupItem name="WalletConnect" />
    </ul>
  );
};
