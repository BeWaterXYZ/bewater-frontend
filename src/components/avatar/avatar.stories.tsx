import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Avatar } from './avatar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Avatar',
  component: Avatar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Avatar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Avatar> = (args) => {
  return <Avatar {...args} />;
};

export const WalletAddress = Template.bind({});
WalletAddress.args = {
  walletAddress: '0x1234561234561234561234561234561234561234',
};

export const WalletAddressMenu = Template.bind({});
WalletAddressMenu.args = {
  size: 'small',
  walletAddress: '0x1234561234561234561234561234561234561234',
};

export const ImageUrl = Template.bind({});
ImageUrl.args = {
  src: 'https://pbs.twimg.com/profile_images/1434703855158104068/6Jg879l1_400x400.jpg',
};

export const ImageUrlMenu = Template.bind({});
ImageUrlMenu.args = {
  size: 'small',
  src: 'https://pbs.twimg.com/profile_images/1434703855158104068/6Jg879l1_400x400.jpg',
};
