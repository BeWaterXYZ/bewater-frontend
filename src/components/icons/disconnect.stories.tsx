import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IconDisconnect } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Icons/IconDisconnect',
  component: IconDisconnect,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'text',
    },
    color: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof IconDisconnect>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IconDisconnect> = (args) => <IconDisconnect {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  color: '#040000',
  size: '16px',
};
