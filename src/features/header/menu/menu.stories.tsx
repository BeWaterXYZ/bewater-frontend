import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { mainMenu } from '../menu-data';

import { Menu } from './menu';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Menu',
  component: Menu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Menu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Menu> = () => {
  return <Menu items={mainMenu || []} />;
};

export const Normal = Template.bind({});
