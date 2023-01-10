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
    value: 'PM',
    label: 'PM',
    classes: {
      container: '!bg-[#713F12] !border-[#A16207] border',
    },
  },
  {
    value: 'Designer',
    label: 'Designer',
    classes: {
      container: '!bg-[#831843] !border-[#BE185D] border',
    },
  },
  {
    value: 'Frontend Developer',
    label: 'Frontend Developer',
    classes: {
      container: '!bg-[#14532D] !border-[#15803D] border',
    },
  },
  {
    value: 'Backend Developer',
    label: 'Backend Developer',
    classes: {
      container: '!bg-[#1E3A8A] !border-[#1D4ED8] border',
    },
  },
  {
    value: 'Blockchain Developer',
    label: 'Blockchain Developer',
    classes: {
      container: '!bg-[#312E81] !border-[#4338CA] border',
    },
  },
].map((op) => ({
  ...op,
  classes: { ...op.classes, text: 'body-4 !text-white' },
}));

export type Skill = 'react' | 'typescript' | 'solidity' | 'javascript';
export const SkillOptions: TagOption[] = [
  {
    value: 'React',
    label: '#React',
  },
  {
    value: 'Solidity',
    label: '#Solidity',
  },
].map((op) => ({
  ...op,
  classes: {
    container: '!rounded-full !bg-[#1E293B]  body-4',
    text: '!text-grey',
  },
}));
