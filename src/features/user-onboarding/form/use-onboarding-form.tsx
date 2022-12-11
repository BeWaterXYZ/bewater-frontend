import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export type Inputs = {
  email: string;
  userName: string;
  fullname: string;
};

const schema = z
  .object({
    email: z.string().email(),
    userName: z.string().min(3, { message: 'Required' }),
    fullname: z.string().min(3, { message: 'At least 3 characters' }),
  })
  .required();

export function useOnboardingForm() {
  return useForm<Inputs>({
    resolver: zodResolver(schema),
  });
}
