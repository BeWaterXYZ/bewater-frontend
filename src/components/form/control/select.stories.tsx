import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Select } from './select';
import { useForm } from 'react-hook-form';
import { RoleOptions } from '@/components/tag';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/Select',
  component: Select,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Select>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Select> = (args) => {
  const { control } = useForm();
  return (
    <div className="p-4 bg-night">
      <Select {...args} control={control} />
    </div>
  );
};

export const Normal = Template.bind({});
Normal.args = {
  placeholder: 'Enter your full name',
  label: 'Name',
  name: 'name',
  error: undefined,
  options: RoleOptions,
};
