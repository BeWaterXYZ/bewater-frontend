import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Dialog } from './dialog';

export default {
  title: 'Base/Dialog',
  component: Dialog,
  argTypes: {},
} as ComponentMeta<typeof Dialog>;

const Template: ComponentStory<typeof Dialog> = (args) => <Dialog {...args} />;

export const Normal = Template.bind({});

Normal.args = {
  children: <div>123</div>,
  open: true,
  defaultOpen: true,
};
