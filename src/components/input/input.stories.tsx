import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './input';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/Input',
  component: Input,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Input>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Input> = (args) => {
  return <Input {...args} />;
};

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Enter your full name',
  label: 'Name',
  name: 'name',
  errors: {},
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Disabled text',
  label: 'Name',
  name: 'name',
  disabled: true,
  errors: {},
};
