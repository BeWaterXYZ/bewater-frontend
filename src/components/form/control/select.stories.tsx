import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from './select';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/Select',
  component: Select,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Select>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Select> = (args) => {
  return (
    <div className="p-4 bg-night">
      <Select {...args} />
    </div>
  );
};

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Enter your full name',
  label: 'Name',
  name: 'name',
  error: undefined,
  options: [
    { label: 'option1', value: 'option1' },
    { label: 'option2', value: 'option2' },
  ],
};
