import { createUnionSchema } from '@/types/utils';
import { OptionItem } from './types';

export const ProjectTagSet = [
  'GameFi',
  'DeFi',
  'NFT',
  'Web3 Security',
  'Zero Knowledge',
  'DAO Tool',
] as const;

export type ProjectTagUnion = (typeof ProjectTagSet)[number];

export const ProjectTagSetOptions: OptionItem<ProjectTagUnion>[] =
  ProjectTagSet.map((tag) => ({
    label: tag,
    value: tag,
    classes: {
      container:
        'body-4 border border-grey-300 !rounded !bg-transparent uppercase !px-1',
      text: '!text-grey-300 !p-0',
    },
  }));

export const ProjectTagSetScheme = createUnionSchema(ProjectTagSet);
