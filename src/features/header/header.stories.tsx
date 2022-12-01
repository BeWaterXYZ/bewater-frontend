import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { useMenuData } from '@/features/header/useMenuData';

import { HeaderImpl, HeaderUserArea } from './header';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Header',
  component: HeaderImpl,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof HeaderImpl>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HeaderImpl> = (args) => {
  const { menuData } = useMenuData();
  return <HeaderImpl {...args} menuData={menuData.main} />;
};

export const ShowButton = Template.bind({});
ShowButton.args = {
  userArea: <HeaderUserArea isAuthed={false} user={{ walletAddress: 'xxx' }} />,
};

export const ShowAvatar = Template.bind({});
ShowAvatar.args = {
  userArea: <HeaderUserArea isAuthed={true} user={{ walletAddress: 'xxx' }} />,
};
