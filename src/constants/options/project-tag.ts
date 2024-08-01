import { OptionItem } from "./types";

const ProjectTagSet = [
  "GameFi",
  "DeFi",
  "NFT",
  "Web3",
  "AIGC",
  "DAO Tool",
  "Web3 Security",
  "Zero Knowledge",
  "Virtual Assistants and Chatbots",
  "Finance and Investment",
  "Business and Marketing",
  "Others",
] as const;

type ProjectTagUnion = (typeof ProjectTagSet)[number];

export const ProjectTagSetOptions: OptionItem<ProjectTagUnion>[] =
  ProjectTagSet.map((tag) => ({
    label: tag,
    value: tag,
    classes: {
      container:
        "body-4 border border-grey-300 !rounded !bg-transparent uppercase !px-1",
      text: "!text-grey-300 !p-0",
    },
  }));

export function obtainProjectTagOptions(tagSet: string[]) {
  const tagSetOptions: OptionItem<string>[] = tagSet.map((tag) => ({
    label: tag,
    value: tag,
    classes: {
      container:
        "body-4 border border-grey-300 !rounded !bg-transparent uppercase !px-1",
      text: "!text-grey-300 !p-0",
    },
  }));
  return tagSetOptions;
}
