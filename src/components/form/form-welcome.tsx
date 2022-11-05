import clsx from 'clsx';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Loading } from '@/components/loading';
import { useFetchUser } from '@/services/user';

import type { FieldValues } from 'react-hook-form';

interface Props {
  className?: string;
}

export const FormWelcome = ({ className }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { isLoading, isError, error, data } = useFetchUser();
  const onSubmit = (data: FieldValues) => console.log(data);
  return isLoading ? (
    <form
      className={clsx('mb-[104px] max-w-[680px]', className)}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" name="userId" value={data?.userProfile?.userId} />
      <Input
        label="Username"
        placeholder="Enter your username"
        required
        errors={errors}
        {...register('username', { required: 'Username is required.' })}
      />
      <Input
        label="Full name"
        placeholder="Enter your full name"
        required
        errors={errors}
        {...register('fullname', { required: 'Full name is required.' })}
      />
      <Button className="mt-16" type="primary" text="Finish Setup" />
    </form>
  ) : (
    <Loading />
  );
};
