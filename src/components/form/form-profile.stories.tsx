import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { getMockUserProfile } from '@/__mock__/user';

import { FormProfile } from './form-profile';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/FormProfile',
  component: FormProfile,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof FormProfile>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof FormProfile> = (args) => {
  return <FormProfile {...args} />;
};

export const Normal = Template.bind({});
Normal.args = {
  user: {
    walletAddress: 'xxxx',
  },
  data: {
    status: 200,
    error: [],
    userExist: true,
    userProfile: getMockUserProfile('testUserId'),
  },
};
