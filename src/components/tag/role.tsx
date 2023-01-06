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
  return (
    <Tag
      label={mapsTagRole[label].label}
      classes={clsx(
        mapsTagRole[label].classes.container,
        mapsTagRole[label].classes.text,
      )}
      onClick={onClick}
    />
  );
}
