'use client';
import clsx from 'clsx';
import { Skill, SkillOptions, TagOption } from './data';
import { Tag } from './tag';

const mapsTagSkill = SkillOptions.reduce((prev, cur) => {
  prev[cur.value] = cur;
  return prev;
}, {} as { [index: string]: TagOption });
interface TagSkillProps {
  label: Skill;
  onClick?: () => void;
}

export function TagSkill({ label, onClick }: TagSkillProps) {
  return (
    <Tag
      label={mapsTagSkill[label].label}
      classes={clsx(
        mapsTagSkill[label].classes.container,
        mapsTagSkill[label].classes.text,
      )}
      onClick={onClick}
    />
  );
}
