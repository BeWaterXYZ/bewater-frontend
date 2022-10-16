import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormWelcome } from './form-welcome';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/FormWelcome',
  component: FormWelcome,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FormWelcome>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormWelcome> = () => {
  return <FormWelcome />;
};

export const Normal = Template.bind({});
