import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Logo } from './logo';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Logo',
  component: Logo,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Logo>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Metamask = Template.bind({});
Metamask.args = {
  code: 'MetaMask',
};

export const Coinbase = Template.bind({});
Coinbase.args = {
  code: 'Coinbase Wallet',
  className: 'w-20 h-20',
};

export const WalletConnect = Template.bind({});
WalletConnect.args = {
  code: 'WalletConnect',
  className: 'w-40 h-40',
};

export const Discord = Template.bind({});
Discord.args = {
  code: 'Discord',
};

export const Github = Template.bind({});
Github.args = {
  code: 'Github',
};

export const Google = Template.bind({});
Google.args = {
  code: 'Google',
};

export const Twitter = Template.bind({});
Twitter.args = {
  code: 'Twitter',
};
