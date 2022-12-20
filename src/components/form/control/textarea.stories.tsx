import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TextArea } from './textarea';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/TextArea',
  component: TextArea,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof TextArea>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TextArea> = (args) => {
  return (
    <div className="p-4 bg-night">
      <TextArea {...args} />
    </div>
  );
};

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Enter your full name',
  label: 'Name',
  name: 'name',
  error: undefined,
};
