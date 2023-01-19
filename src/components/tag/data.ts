import { type } from 'os';

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

export type Role = typeof RoleOptionsRaw[number]['value'];

export const SkillOptionsRaw = [
  {
    value: 'Python',
    label: '#Python',
  },
  {
    value: 'JavaScript',
    label: '#JavaScript',
  },
  {
    value: 'TypeScript',
    label: '#TypeScript',
  },
  {
    value: 'Rust',
    label: '#Rust',
  },
  {
    value: 'Golang',
    label: '#Golang',
  },
  {
    value: 'Java',
    label: '#Java',
  },
  {
    value: 'Move',
    label: '#Move',
  },
  {
    value: 'Cairo',
    label: '#Cairo',
  },
  {
    value: 'Vyper',
    label: '#Vyper',
  },
  {
    value: 'Solidity',
    label: '#Solidity',
  },
  {
    value: 'React',
    label: '#React',
  },
  {
    value: 'Vue',
    label: '#Vue',
  },
  {
    value: 'Next.js',
    label: '#Next.js',
  },
  {
    value: 'Nuxt.js',
    label: '#Nuxt.js',
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
    value: 'Cloud Computing',
    label: '#Cloud Computing',
  },
  {
    value: 'Machine Learning',
    label: '#Machine Learning',
  },
  {
    value: 'AI',
    label: '#AI',
  },
  {
    value: 'AR/VR/XR',
    label: '#AR/VR/XR',
  },
  {
    value: 'Cybersecurity',
    label: '#Cybersecurity',
  },

  {
    value: 'DevOps',
    label: '#DevOps',
  },
  {
    value: 'Docker',
    label: '#Docker',
  },
  {
    value: 'K8s',
    label: '#K8s',
  },

  {
    value: '3D Design',
    label: '#3D Design',
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
    value: 'Motion Design',
    label: '#Motion Design',
  },
  {
    value: 'Character Design',
    label: '#Character Design',
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
    text: '!text-[#94A3B8]',
  },
}));

export type Skill = typeof SkillOptionsRaw[number]['value'];

export const ProjectTagOptionsRaw = [
  {
    value: 'Account Abstraction',
    label: 'Account Abstraction',
  },
  {
    value: 'Public Goods',
    label: 'Public Goods',
  },
  {
    value: 'DeFi',
    label: 'DeFi',
  },

  {
    value: 'NFT',
    label: 'NFT',
  },
  {
    value: 'Gaming',
    label: 'Gaming',
  },
  {
    value: 'GameFi',
    label: 'GameFi',
  },
  {
    value: 'DAO Tooling',
    label: 'DAO Tooling',
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
    value: 'SocialFi',
    label: 'SocialFi',
  },
  {
    value: 'Zero Knowledge Proofs',
    label: 'Zero Knowledge Proofs',
  },
  {
    value: 'Metaverse',
    label: 'Metaverse',
  },
  {
    value: 'Others',
    label: 'Others',
  },
] as const;
export const ProjectTagOptions: Option[] = ProjectTagOptionsRaw.map((op) => ({
  ...op,
  classes: {
    container: 'mono-4 border !rounded  m-1 !bg-transparent uppercase !px-1',
    text: '!text-white !p-[1px]',
  },
}));

export type ProjectTag = typeof ProjectTagOptionsRaw[number]['value'];
