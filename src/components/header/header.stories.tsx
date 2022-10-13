import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Auth } from '@/models/auth';
import { useMenuData } from '@/hooks/useMenuData';

import { Header } from './header';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Headers/Header',
  component: Header,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Header>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Header> = () => {
  const { menuData } = useMenuData({} as Auth);
  return (
    <Header menuData={menuData} />
  )
};

export const Normal = Template.bind({});
