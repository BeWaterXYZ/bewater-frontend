import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ToastContainer } from './index';

export default {
  title: 'Base/Toast',
  component: ToastContainer,
  argTypes: {},
} as ComponentMeta<typeof ToastContainer>;

const Template: ComponentStory<typeof ToastContainer> = (args) => (
  <ToastContainer {...args} />
);

export const Normal = Template.bind({});

Normal.args = {
  toasts: [
    {
      id: 1,
      title: 'this is title 1',
      description: 'this is description',
      type: 'success',
    },
    {
      id: 2,
      title: 'this is title 1',
      description: 'this is description',
      type: 'info',
    },
    {
      id: 2,
      title: 'this is title 1',
      description: 'this is description',
      type: 'error',
    },
  ],
};
