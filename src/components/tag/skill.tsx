"use client";
import { SkillSetOptions, SkillUnion } from "@/constants/options/skill";
import { OptionItem } from "@/constants/options/types";
import clsx from "clsx";
import { Tag } from "./tag";

const mapsTagSkill = SkillSetOptions.reduce((prev, cur) => {
  prev[cur.value] = cur;
  return prev;
}, {} as { [index: string]: OptionItem<SkillUnion> });
interface TagSkillProps {
  label: SkillUnion;
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
