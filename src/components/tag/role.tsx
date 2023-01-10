'use client';
import clsx from 'clsx';
import { RoleOptions, Roles, TagOption } from './data';
import { Tag } from './tag';

const mapsTagRole = RoleOptions.reduce((prev, cur) => {
  prev[cur.value] = cur;
  return prev;
}, {} as { [index: string]: TagOption });
interface TagRoleProps {
  label: Roles;
  onClick?: () => void;
}

export function TagRole({ label, onClick }: TagRoleProps) {
  let option = mapsTagRole[label];
  return (
    <Tag
      label={option.label}
      classes={clsx(option.classes.container, option.classes.text)}
      onClick={onClick}
    />
  );
}
