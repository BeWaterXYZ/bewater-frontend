'use client';
import clsx from 'clsx';
import { Skill, SkillOptions, Option } from './data';
import { Tag } from './tag';

const mapsTagSkill = SkillOptions.reduce((prev, cur) => {
  prev[cur.value] = cur;
  return prev;
}, {} as { [index: string]: Option });
interface TagSkillProps {
  label: Skill;
  onClick?: () => void;
}

export function TagSkill({ label, onClick }: TagSkillProps) {
  let option = mapsTagSkill[label];
  !option && console.log({ label });
  return (
    <Tag
      label={option.label}
      classes={clsx(option.classes.container, option.classes.text)}
      onClick={onClick}
    />
  );
}
