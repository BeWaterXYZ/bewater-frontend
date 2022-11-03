import clsx from 'clsx';

import { Input } from '../input/input';
import { Button } from '../button/button';
import Wallet from '../icons/wallet';

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
      <label className="block typ-label w-auto text-bw-fore py-1">
        {label}
        {required ? ' *' : null}
      </label>
      {type === 'input' && (
        <Input
          name={label}
          errors={{}}
          placeholder={placeholder}
          type={inputType}
        />
      )}
      {type === 'button' && <Button text={buttonText} type={buttonType} />}
      {type === 'link' && (
        <div className="flex flex-row gap-x-4 items-center justify-between">
          <div className="flex flex-row gap-x-2 items-center w-full">
            <Wallet className="w-4 h-4" />
            <a className="typ-body py-1 text-bw-fore">{linkText}</a>
          </div>
          {showDisconnect && <Button text="Disconnect" type="danger" />}
        </div>
      )}
    </div>
  );
};
