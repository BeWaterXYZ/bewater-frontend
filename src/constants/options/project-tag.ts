// import { createUnionSchema } from '@/types/utils';
import { OptionItem } from './types';

export const ProjectTagSet = [
  "GameFi",
  "DeFi",
  "NFT",
  "Web3 Security",
  "Zero Knowledge",
  "DAO Tool",
  "AIGC",
  "Web3",
  "AIGC+Web3",
  "Virtual Assistants and Chatbots",
  "Professional Services",
  "Finance and Investment",
  "Business and Marketing",
  "ZK Infra and Tooling",
  "ZK Application",
  "Other ZK-related Topics",
  "Others",
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

export function obtainProjectTagOptions(tagSet: string[]) {
  const tagSetOptions = tagSet.map((tag) => ({
    label: tag,
    value: tag,
    classes: {
      container:
        'body-4 border border-grey-300 !rounded !bg-transparent uppercase !px-1',
      text: '!text-grey-300 !p-0',
    },
  }));
  return tagSetOptions;
}

// export const ProjectTagSetScheme = createUnionSchema(ProjectTagSet);
