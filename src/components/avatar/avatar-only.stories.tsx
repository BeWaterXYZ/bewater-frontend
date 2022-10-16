import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AvatarOnly } from './avatar-only';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/AvatarOnly',
  component: AvatarOnly,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof AvatarOnly>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AvatarOnly> = (args) => {
  return <AvatarOnly {...args} />;
};

export const WalletAddress = Template.bind({});
WalletAddress.args = {
  walletAddress: '0x1234561234561234561234561234561234561234',
};

export const ImageUrl = Template.bind({});
ImageUrl.args = {
  imageUrl:
    'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80',
};
