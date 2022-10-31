import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Input } from './input';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Input/Input',
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
  type: 'normal',
  helpText: '',
};

export const Disabled = Template.bind({});
Disabled.args = {
  placeholder: 'Disabled text',
  type: 'disabled',
  helpText: '',
};

export const Error = Template.bind({});
Error.args = {
  placeholder: 'Error text',
  type: 'error',
  helpText: 'This username has been taken.',
};

export const Multiline = Template.bind({});
Multiline.args = {
  placeholder: 'Input your bio',
  type: 'multiline',
  helpText: '',
};
