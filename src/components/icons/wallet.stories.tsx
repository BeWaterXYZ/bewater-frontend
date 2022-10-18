import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { IconWallet } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Icons/IconWallet',
  component: IconWallet,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'text',
    },
    color: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof IconWallet>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof IconWallet> = (args) => <IconWallet {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  color: '#040000',
  size: '16px',
};
