import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Avatar } from './avatar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Avatar/Avatar',
  component: Avatar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Avatar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const EditingDefault = Template.bind({});
EditingDefault.args = {
  src: '',
  isEditing: true,
};

export const EditingNormal = Template.bind({});
EditingNormal.args = {
  src: 'https://pbs.twimg.com/profile_images/1434703855158104068/6Jg879l1_400x400.jpg',
  isEditing: true,
};

export const NoEditing = Template.bind({});
NoEditing.args = {
  src: 'https://pbs.twimg.com/profile_images/1434703855158104068/6Jg879l1_400x400.jpg',
  isEditing: false,
};
