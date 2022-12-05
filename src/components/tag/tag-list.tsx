import clsx from 'clsx';

import { Tag } from '@/components/tag';

interface Props {
  className?: string;
}

export const TagList = ({ className }: Props) => {
  return (
    <div className="flex flex-col gap-y-3">
      <label className="h5">Skills</label>
      <div className={clsx('flex flex-col gap-y-2', className)}>
        <Tag name="React" isSkill={true} />
        <Tag name="Next.js" isSkill={true} />
        <Tag name="TypeScript" isSkill={true} />
        <Tag name="Tailwind CSS" isSkill={true} />
      </div>
    </div>
  );
};
