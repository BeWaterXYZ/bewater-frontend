import clsx from 'clsx';

import Wallet from '../icons/wallet';

import { Input } from './input';

interface Props {
  label: string;
  required?: boolean;
  placeholder?: string;
  type: string;
  inputType: string;
  buttonType: string;
  buttonText: string;
  linkText: string;
  showDisconnect?: boolean;
  className?: string;
}

export const FormItem = ({
  label,
  required,
  placeholder,
  type,
  inputType,
  buttonType,
  buttonText,
  linkText,
  showDisconnect,
  className,
}: Props) => {
  return (
    <div className={clsx('block mb-4', className)}>
      <label className="block body-3 w-auto  py-1">
        {label}
        {required ? ' *' : null}
      </label>
      {type === 'input' && (
        <Input
          name={label}
          error={undefined}
          placeholder={placeholder}
          type={inputType}
        />
      )}
      {type === 'button' && (
        <button className={`btn ${buttonType}`}>{buttonText}</button>
      )}
      {type === 'link' && (
        <div className="flex flex-row gap-x-4 items-center justify-between">
          <div className="flex flex-row gap-x-2 items-center w-full">
            <Wallet className="w-4 h-4 " color="white" />
            <a className="body-1 py-1  break-all">{linkText}</a>
          </div>
          {showDisconnect && (
            <button className="btn btn-danger">Disconnect</button>
          )}
        </div>
      )}
    </div>
  );
};
