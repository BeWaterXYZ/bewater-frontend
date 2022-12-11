import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { nav } from '../linkts';

import { Nav } from './nav';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Nav',
  component: Nav,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Nav>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Nav> = () => {
  return <Nav items={nav || []} />;
};

export const Normal = Template.bind({});
