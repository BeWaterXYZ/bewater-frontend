import { createUnionSchema } from '@/types/utils';
import { OptionItem } from './types';

export const SkillSet = [
  'Python',
  'JavaScript',
  'TypeScript',
  'Rust',
  'Golang',
  'Java',
  'Move',
  'Cairo',
  'Vyper',
  'Solidity',
  'React',
  'Vue',
  'Next.js',
  'Nuxt.js',
  'iOS',
  'Android',
  'Database',
  'Cloud Computing',
  'Machine Learning',
  'AI',
  'AR/VR/XR',
  'Cybersecurity',
  'DevOps',
  'Docker',
  'K8s',
  '3D Design',
  'UI/UX',
  'Branding',
  'Motion Design',
  'Character Design',
  'Illustration',
] as const;

export type SkillUnion = (typeof SkillSet)[number];

export const SkillSetOptions: OptionItem<SkillUnion>[] = SkillSet.map(
  (skill) => ({
    label: skill,
    value: skill,
    classes: {
      container: '!rounded-full !bg-midnight  h-5  my-0',
      text: '!text-grey-400 body-4 leading-5 !py-0',
    },
  }),
);

export const SkillSetScheme = createUnionSchema(SkillSet);
