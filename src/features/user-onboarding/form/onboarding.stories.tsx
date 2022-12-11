import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormOnboarding } from './onboarding';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/FormWelcome',
  component: FormOnboarding,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FormOnboarding>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormOnboarding> = (args) => {
  return <FormOnboarding {...args} />;
};

export const Normal = Template.bind({});
Normal.args = {
  user: {},
};
