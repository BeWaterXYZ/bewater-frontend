import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ButtonGroup } from './button-group';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/ButtonGroup',
  component: ButtonGroup,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ButtonGroup>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

const Template: ComponentStory<typeof ButtonGroup> = (args) => (
  <ButtonGroup {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  name1: 'MetaMask',
  name2: 'Coinbase Wallet',
  name3: 'WalletConnect',
};
