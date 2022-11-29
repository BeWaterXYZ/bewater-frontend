import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Snackbar } from './';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Snackbar',
  component: Snackbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Snackbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Snackbar> = (args) => (
  <Snackbar {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  title: 'Unable to change your couse',
  text: 'Please check your connection and try again.',
  open: true,
};

export const LongText = Template.bind({});
LongText.args = {
  title: 'Unable to change your couse',
  text: 'Could be some issue with you internet. Please check your connection, restart your router and try again.',
  open: true,
};
