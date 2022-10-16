import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Loading } from './loading';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'loadings/loading',
  component: Loading,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Loading>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
);

export const Cover = Template.bind({});
Cover.args = {
  cover: true,
};
export const WithoutCover = Template.bind({});
WithoutCover.args = {
  cover: false,
};
