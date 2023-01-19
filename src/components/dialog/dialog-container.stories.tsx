import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DialogContainer } from './index';
import { Challenge } from '@/services/challenge';

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
    team_join: {
      id: '1',
      name: 'team name',
      project: {
        id: '123',
        teamId: '1',
        status: 'ACTIVE',
        name: 'team title',
        description: 'team ideaDescription',
        tags: [],
      },
      status: 'ACTIVE',
      challengeId: 1,
      openingRoles: [],
      skills: [],
      teamMembers: [],
    },
  },
  // eslint-disable-next-line
  closeDialog: () => {},
};

export const TeamCreate = Template.bind({});

TeamCreate.args = {
  dialogs: {
    team_create: {
      challenge: {
        id: '123',
      } as Challenge,
    },
  },
  // eslint-disable-next-line
  closeDialog: () => {},
};
