import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z
  .object({
    email: z.string().email(),
  })
  .required();

export type Inputs = z.infer<typeof schema>;

export function useHomeForm(config: Parameters<typeof useForm<Inputs>>[0]) {
  return useForm<Inputs>({
    resolver: zodResolver(schema),
    ...config,
  });
}
