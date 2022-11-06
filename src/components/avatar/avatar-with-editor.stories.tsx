import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AvatarWithEditor } from './avatar-with-editor';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/AvatarWithEditor',
  component: AvatarWithEditor,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof AvatarWithEditor>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AvatarWithEditor> = (args) => (
  <AvatarWithEditor {...args} />
);

export const NotUploaded = Template.bind({});
NotUploaded.args = {
  src: '',
  walletAddress: '0x1234561234561234561234561234561234561234',
};

export const Uploaded = Template.bind({});
Uploaded.args = {
  src: 'https://pbs.twimg.com/profile_images/1434703855158104068/6Jg879l1_400x400.jpg',
};
