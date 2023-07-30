import { OptionItem } from './types';
import { createUnionSchema } from '@/types/utils';

export const RoleSet = [
  'Product Manager',
  'Designer',
  'Frontend Developer',
  'Backend Developer',
  'Blockchain Developer',
  'Full Stack Developer',
  'Security Engineer',
  'Data Analyst',
  'Others',
] as const;

export type RoleUnion = (typeof RoleSet)[number];

const styleMap: Record<RoleUnion, string> = {
  'Product Manager': '!bg-[#713F12] !border-[#A16207] border',
  Designer: '!bg-[#831843] !border-[#BE185D] border',
  'Frontend Developer': '!bg-[#14532D] !border-[#15803D] border',
  'Backend Developer': '!bg-[#1E3A8A] !border-[#1D4ED8] border',
  'Blockchain Developer': '!bg-[#312E81] !border-[#4338CA] border',
  'Full Stack Developer': '!bg-[#164E63] !border-[#0E7490] border',
  'Security Engineer': '!bg-[#701A75] !border-[#A21CAF] border',
  'Data Analyst': '!bg-[#4C1D95] !border-[#6D28D9] border',
  Others: '!bg-[#0F172A] !border-[#374151] border',
};

export const RoleSetOptions: OptionItem<RoleUnion>[] = RoleSet.map((role) => ({
  label: role,
  value: role,
  classes: {
    container: styleMap[role] + ' h-5 my-0',
    text: 'body-4 !text-white leading-4 !py-0',
  },
}));

export const RoleSetScheme = createUnionSchema(RoleSet);
