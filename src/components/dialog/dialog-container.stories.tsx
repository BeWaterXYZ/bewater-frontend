import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DialogContainer } from './index';

export default {
  title: 'Base/DialogContainer',
  component: DialogContainer,
  argTypes: {},
} as ComponentMeta<typeof DialogContainer>;

const Template: ComponentStory<typeof DialogContainer> = (args) => (
  <DialogContainer {...args} />
);

export const MetaMask = Template.bind({});

MetaMask.args = {
  dialogs: {
    metamask_not_support: true,
  },
  // eslint-disable-next-line
  closeDialog: () => {},
};

export const TeamJoin = Template.bind({});

TeamJoin.args = {
  dialogs: {
    team_join: { teamId: '1' },
  },
  // eslint-disable-next-line
  closeDialog: () => {},
};

export const TeamCreate = Template.bind({});

TeamCreate.args = {
  dialogs: {
    team_create: true,
  },
  // eslint-disable-next-line
  closeDialog: () => {},
};
