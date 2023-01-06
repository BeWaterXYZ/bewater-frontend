export type Roles = 'designer' | 'fe' | 'be' | 'bc';

export type TagOption = {
  value: string;
  label: string;
  classes: {
    container: string;
    text: string;
  };
};

export const RoleOptions: TagOption[] = [
  {
    value: 'designer',
    label: 'Designer',
    classes: {
      container: '!bg-[#831843] !border-[#BE185D] ',
    },
  },
  {
    value: 'fe',
    label: 'Frontend Developer',
    classes: {
      container: '!bg-[#14532D] !border-[#15803D] ',
    },
  },
  {
    value: 'be',
    label: 'Backend Developer',
    classes: {
      container: '!bg-[#1E3A8A] !border-[#1D4ED8',
    },
  },
  {
    value: 'bc',
    label: 'Blockchain Developer',
    classes: {
      container: '!bg-[#312E81] !border-[#4338CA]',
    },
  },
].map((op) => ({
  ...op,
  classes: { ...op.classes, text: 'body-4 !text-white' },
}));

export type Skill = 'react' | 'typescript' | 'solidity' | 'javascript';
export const SkillOptions: TagOption[] = [
  {
    value: 'react',
    label: '#React',
  },
  {
    value: 'typescript',
    label: '#Typescript',
  },
].map((op) => ({
  ...op,
  classes: {
    container: '!rounded-full !bg-[#1E293B]  body-4',
    text: '!opacity-75 !text-grey',
  },
}));
