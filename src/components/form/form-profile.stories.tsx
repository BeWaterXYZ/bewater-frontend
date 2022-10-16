import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FormProfile } from './form-profile';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/FormProfile',
  component: FormProfile,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FormProfile>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormProfile> = () => {
  return <FormProfile />;
};

export const Normal = Template.bind({});
