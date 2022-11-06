import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  text: 'Save Changes',
  type: 'primary',
};

export const Secondary1 = Template.bind({});
Secondary1.args = {
  text: 'Add Role',
  type: 'secondary',
};

export const Secondary2 = Template.bind({});
Secondary2.args = {
  text: 'Add Skill',
  type: 'secondary',
};

export const Danger1 = Template.bind({});
Danger1.args = {
  text: 'Disconnect',
  type: 'danger',
};

export const Danger2 = Template.bind({});
Danger2.args = {
  text: 'Deactivate Account',
  type: 'danger',
};
