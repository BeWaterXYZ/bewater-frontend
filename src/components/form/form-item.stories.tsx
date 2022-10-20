import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormItem } from './form-item';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/FormItem',
  component: FormItem,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FormItem>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormItem> = (args) => {
  return <FormItem {...args} />;
};

export const Input = Template.bind({});
Input.args = {
  placeholder: 'Enter your full name',
  label: 'Username',
  type: 'input',
  inputType: 'normal',
  buttonType: '',
  buttonText: '',
  linkText: '',
};

export const Button = Template.bind({});
Button.args = {
  placeholder: '',
  label: 'Discord',
  type: 'button',
  inputType: '',
  buttonType: 'secondary',
  buttonText: 'Connect Discord',
  linkText: '',
};

export const Link = Template.bind({});
Link.args = {
  placeholder: '',
  label: 'Wallet Address',
  type: 'link',
  inputType: '',
  buttonType: '',
  buttonText: '',
  linkText: '0x1234561234561234561234561234561234561234',
};
