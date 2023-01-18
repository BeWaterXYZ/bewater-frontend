export type Option = {
  value: string;
  label: string;
  classes: {
    container: string;
    text: string;
  };
};

export const RoleOptionsRaw = [
  {
    value: 'Product Manager',
    label: 'Product Manager',
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
  {
    value: 'Full Stack Developer',
    label: 'Full Stack Developer',
    classes: {
      container: '!bg-[#164E63] !border-[#0E7490] border',
    },
  },
  {
    value: 'Security Engineer',
    label: 'Security Engineer',
    classes: {
      container: '!bg-[#701A75] !border-[#A21CAF] border',
    },
  },
  {
    value: 'Data Analyst',
    label: 'Data Analyst',
    classes: {
      container: '!bg-[#4C1D95] !border-[#6D28D9] border',
    },
  },
] as const;

export const RoleOptions = RoleOptionsRaw.map((op) => ({
  ...op,
  classes: { ...op.classes, text: 'body-4 !text-white' },
}));

export type Roles = typeof RoleOptionsRaw[number]['value'];

export const SkillOptionsRaw = [
  {
    value: 'Solidity',
    label: '#Solidity',
  },
  {
    value: 'React',
    label: '#React',
  },
  {
    value: 'Angular',
    label: '#Angular',
  },
  {
    value: 'Vue',
    label: '#Vue',
  },
  {
    value: 'iOS',
    label: '#iOS',
  },
  {
    value: 'Android',
    label: '#Android',
  },
  {
    value: 'Database',
    label: '#Database',
  },
  {
    value: 'ML&AI',
    label: '#ML&AI',
  },
  {
    value: 'DevOps',
    label: '#DevOps',
  },

  {
    value: 'Cybersecurity',
    label: '#Cybersecurity',
  },
  {
    value: '3D',
    label: '#3D',
  },

  {
    value: 'UI/UX',
    label: '#UI/UX',
  },
  {
    value: 'Branding',
    label: '#Branding',
  },

  {
    value: 'Motion',
    label: '#Motion',
  },
  {
    value: 'Character',
    label: '#Character',
  },
  {
    value: 'Illustration',
    label: '#Illustration',
  },
] as const;

export const SkillOptions: Option[] = SkillOptionsRaw.map((op) => ({
  ...op,
  classes: {
    container: '!rounded-full !bg-[#1E293B]  body-4',
    text: '!text-grey',
  },
}));

export type Skill = typeof SkillOptionsRaw[number]['value'];

export const TagOptionsRaw = [
  {
    value: 'DeFi',
    label: 'DeFi',
  },
  {
    value: 'NFTs',
    label: 'NFTs',
  },
  {
    value: 'Gaming',
    label: 'Gaming',
  },
  {
    value: 'DAO',
    label: 'DAO',
  },

  {
    value: 'Layer 2',
    label: 'Layer 2',
  },
  {
    value: 'Wallet/Payments',
    label: 'Wallet/Payments',
  },

  {
    value: 'Developer Tool',
    label: 'Developer Tool',
  },
  {
    value: 'Data/Analytics',
    label: 'Data/Analytics',
  },

  {
    value: 'Audio/Video',
    label: 'Audio/Video',
  },
  {
    value: 'Social Network',
    label: 'Social Network',
  },
  {
    value: 'Zero Knowledge',
    label: 'Zero Knowledge',
  },
  {
    value: 'Metaverse',
    label: 'Metaverse',
  },
  {
    value: 'Others',
    label: 'Others',
  },
];
export const TagOptions: Option[] = TagOptionsRaw.map((op) => ({
  ...op,
  classes: {
    container: '!rounded-full !bg-[#1E293B]  body-4',
    text: '!text-grey',
  },
}));
