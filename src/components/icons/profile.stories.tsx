import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IconProfile } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Icons/IconProfile',
  component: IconProfile,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'text',
    },
    color: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof IconProfile>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IconProfile> = (args) => <IconProfile {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  color: '#040000',
  size: '16px',
};
