import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { {{componentName}} } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Icons/{{componentName}}',
  component: {{componentName}},
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'text',
    },
    color: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof {{componentName}}>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof {{componentName}}> = (args) => <{{componentName}} {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  color: '#000',
  size: '48px',
};
