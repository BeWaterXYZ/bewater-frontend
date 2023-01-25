'use client';
import { RoleSetOptions, RoleUnion } from '@/constants/options/role';
import { OptionItem } from '@/constants/options/types';
import clsx from 'clsx';
import { Tag } from './tag';

const mapsTagRole = RoleSetOptions.reduce((prev, cur) => {
  prev[cur.value] = cur;
  return prev;
}, {} as { [index: string]: OptionItem<RoleUnion> });
interface TagRoleProps {
  label: RoleUnion;
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
