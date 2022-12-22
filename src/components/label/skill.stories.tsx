import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LabelSkill } from './skill';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/LabelSkill',
  component: LabelSkill,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'text',
    },
    color: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof LabelSkill>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LabelSkill> = (args) => (
  <div>
    <div className="flex gap-2">
      <LabelSkill label="React" />
      <LabelSkill label="Swift" />
      <LabelSkill label="Go" />
    </div>
    <div className="flex gap-2">
      <LabelSkill label="React" onClick={() => {}} />
      <LabelSkill label="Swift" onClick={() => {}} />
      <LabelSkill label="Go" onClick={() => {}} />
    </div>
  </div>
);
export const Normal = Template.bind({});
