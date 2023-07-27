import { Challenge } from "@/services/types";
import * as Hero from "./blocks/hero";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  Cross2Icon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Languages } from "@/i18n";

export interface SectionProps {
  lang: Languages;
  challenge: Challenge;

  section: Challenge["metadata"]["en"]["sections"][number];
}
export interface SectionEditProps extends SectionProps {
  data: any;
  children: React.ReactNode;
}

export interface Block {
  Component: React.ComponentType<SectionProps>;
  Edit: React.ComponentType<SectionEditProps>;
  movable?: boolean;
}

const maps: Record<string, Block> = {
  hero: Hero,
};
export function Section({ section, challenge, lang }: SectionProps) {
  let Block = maps[section.component];

  return (
    <div className="relative">
      <Block.Component section={section} challenge={challenge} lang={lang} />

      <div className="absolute right-0 top-0 flex m-8">
        <button type="button" onClick={(e) => {}}>
          <TrashIcon className="mr-1 text-grey-500" />
        </button>
        <button type="button" onClick={(e) => {}}>
          <ArrowUpIcon className="mr-1 text-grey-500" />
        </button>
        <button type="button" onClick={(e) => {}}>
          <ArrowDownIcon className="mr-1 text-grey-500" />
        </button>

        <Block.Edit
          section={section}
          challenge={challenge}
          data={section.data}
          lang={lang}
        >
          <button
            className="text-grey-300 flex items-center text-[12px]"
            onClick={() => {}}
          >
            <Pencil1Icon className="mr-1 text-grey-500" />
            Edit
          </button>
        </Block.Edit>
      </div>
    </div>
  );
}
