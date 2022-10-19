import clsx from 'clsx';

import { FormItem } from './form-item';

interface Props {
  className?: string;
}

export const Form = ({ className }: Props) => {
  return (
    <form className={clsx('mb-[104px] max-w-[680px]', className)}>
      <FormItem
        label={'Username'}
        type={'input'}
        inputType={'normal'}
        buttonType={''}
        buttonText={''}
        linkText={''}
        placeholder={'Enter your username'}
      />
      <FormItem
        label={'Fullname'}
        type={'input'}
        inputType={'normal'}
        buttonType={''}
        buttonText={''}
        linkText={''}
        placeholder={'Enter your full name'}
      />
      <FormItem
        label={'Wallet Address'}
        type={'link'}
        inputType={''}
        buttonType={''}
        buttonText={''}
        linkText={'0x1234561234561234561234561234561234561234'}
        placeholder={''}
      />
      <FormItem
        label={'Github'}
        type={'link'}
        inputType={''}
        buttonType={''}
        buttonText={''}
        linkText={'https://github.com/someone'}
        placeholder={''}
        showDisconnect={true}
      />
      <FormItem
        label={'Discord'}
        type={'button'}
        inputType={''}
        buttonType={'secondary'}
        buttonText={'Connect Discord'}
        linkText={''}
        placeholder={''}
      />
      <FormItem
        label={'Twitter'}
        type={'button'}
        inputType={''}
        buttonType={'secondary'}
        buttonText={'Connect Twitter'}
        linkText={''}
        placeholder={''}
      />
    </form>
  );
};
