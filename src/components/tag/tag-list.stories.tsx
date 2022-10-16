import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TagList } from './tag-list';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TagList/TagList',
  component: TagList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TagList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TagList> = () => (
  <div
    className="flex flex-col justify-end"
    style={{ height: 'calc(100vh - 40px)' }}
  >
    <TagList />
  </div>
);

export const Normal = Template.bind({});
