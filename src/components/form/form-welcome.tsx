import clsx from 'clsx';

import { Button } from '@/components/button';

import { FormItem } from './form-item';

interface Props {
  className?: string;
}

export const FormWelcome = ({ className }: Props) => {
  return (
    <form className={clsx('mb-[104px] max-w-[680px]', className)}>
      <FormItem
        label={'Username'}
        required
        type={'input'}
        inputType={'normal'}
        buttonType={''}
        buttonText={''}
        linkText={''}
        placeholder={'Enter your username'}
      />
      <FormItem
        label={'Fullname'}
        required
        type={'input'}
        inputType={'normal'}
        buttonType={''}
        buttonText={''}
        linkText={''}
        placeholder={'Enter your full name'}
      />
      <Button className="mt-16" type="primary" text="Finish Setup" />
    </form>
  );
};
