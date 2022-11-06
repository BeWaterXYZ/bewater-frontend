import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { useMenuData } from '@/hooks/useMenuData';

import { Header } from './header';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Header',
  component: Header,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Header>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Header> = (args) => {
  const { menuData } = useMenuData();
  return <Header menuData={menuData} {...args} />;
};

export const ShowButton = Template.bind({});
ShowButton.args = {
  showButton: true,
};

export const ShowAvatar = Template.bind({});
ShowAvatar.args = {
  token: {
    headers: {
      Authorization: 'Bearer eyiasdfkl;qwerj;kj',
    },
    user: {},
  },
  showButton: false,
};
