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

export const Normal = Template.bind({});

Normal.args = {
  dialogs: {
    metamask_not_support: true,
  },
  // eslint-disable-next-line
  closeDialog: () => {},
};
