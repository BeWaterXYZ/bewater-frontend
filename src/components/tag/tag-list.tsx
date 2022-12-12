import clsx from 'clsx';

import { Tag } from '@/components/tag';

interface Props {
  className?: string;
}

export const TagList = ({ className }: Props) => {
  return (
    <div className="flex flex-col gap-y-3">
      <h5 className="heading-5">Skills</h5>
      <div className={clsx('flex flex-col gap-y-2', className)}>
        <Tag name="React" isSkill={true} />
        <Tag name="Next.js" isSkill={true} />
        <Tag name="TypeScript" isSkill={true} />
        <Tag name="Tailwind CSS" isSkill={true} />
      </div>
    </div>
  );
};
