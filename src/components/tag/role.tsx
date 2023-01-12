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
  simple?: boolean;
  onClick?: () => void;
}

export function TagRole({ label, onClick, simple = false }: TagRoleProps) {
  let option = mapsTagRole[label];
  if (!option) console.log({ label });
  return (
    <Tag
      label={simple ? '' : option.label}
      title={option.label}
      classes={clsx(option.classes.container, option.classes.text, {
        '!rounded-full !w-4 !h-4 !block !p-0': simple,
      })}
      onClick={onClick}
    />
  );
}
