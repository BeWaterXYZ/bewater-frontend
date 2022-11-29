import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Stats } from './stats';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Stats',
  component: Stats,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Stats>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Stats> = (args) => {
  return <Stats {...args} />;
};

export const Normal = Template.bind({});
