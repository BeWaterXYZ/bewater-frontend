import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z
  .object({
    email: z.string().email(),
    userName: z.string().min(3, { message: 'Required' }),
    bio: z.string().min(3, { message: 'Required' }),
    fullName: z.string().min(3, { message: 'At least 3 characters' }),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function useSettingsForm(config: Parameters<typeof useForm<Inputs>>[0]) {
  return useForm<Inputs>({
    resolver: zodResolver(schema),
    ...config,
  });
}
