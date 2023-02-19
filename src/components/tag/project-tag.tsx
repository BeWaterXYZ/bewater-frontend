'use client';
import {
  ProjectTagSetOptions,
  ProjectTagUnion,
} from '@/constants/options/project-tag';
import { OptionItem } from '@/constants/options/types';
import clsx from 'clsx';
import { Tag } from './tag';

const mapsTagSkill = ProjectTagSetOptions.reduce((prev, cur) => {
  prev[cur.value] = cur;
  return prev;
}, {} as { [index: string]: OptionItem<ProjectTagUnion> });

interface TagProjectTagProps {
  label: ProjectTagUnion;
  className?: string;
  onClick?: () => void;
}

export function TagProjectTag({
  label,
  onClick,
  className,
}: TagProjectTagProps) {
  let option = mapsTagSkill[label];
  !option && console.log({ label });
  return (
    <Tag
      label={option.label}
      classes={clsx(option.classes.container, option.classes.text, className)}
      onClick={onClick}
    />
  );
}
