import { createUnionSchema } from '@/types/utils';
import { OptionItem } from './types';

export const ProjectTagSet = [
  'Account Abstraction',
  'Public Goods',
  'DeFi',
  'NFT',
  'Gaming',
  'GameFi',
  'DAO Tooling',
  'Layer 2',
  'Wallet/Payments',
  'Developer Tool',
  'Data/Analytics',
  'Audio/Video',
  'Social Network',
  'SocialFi',
  'Zero Knowledge Proofs',
  'Metaverse',
  'Others',
] as const;

export type ProjectTagUnion = (typeof ProjectTagSet)[number];

export const ProjectTagSetOptions: OptionItem<ProjectTagUnion>[] =
  ProjectTagSet.map((tag) => ({
    label: tag,
    value: tag,
    classes: {
      container:
        'body-4 border border-grey-300 !rounded  m-1 !bg-transparent uppercase !px-1',
      text: '!text-grey-300 ',
    },
  }));

export const ProjectTagSetScheme = createUnionSchema(ProjectTagSet);
