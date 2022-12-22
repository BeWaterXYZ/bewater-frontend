import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { LabelRole } from './role';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/LabelRole',
  component: LabelRole,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'text',
    },
    color: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof LabelRole>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof LabelRole> = (args) => (
  <div>
    <div className="flex gap-2">
      <LabelRole label="Designer" />
      <LabelRole label="Frontend Developer" />
      <LabelRole label="Backend Developer" />
      <LabelRole label="Blockchain Developer" />
    </div>
    <div className="flex gap-2">
      <LabelRole
        label="Designer"
        onClick={() => {
          console.log(1);
        }}
      />
      <LabelRole label="Frontend Developer" onClick={() => {}} />
      <LabelRole label="Backend Developer" onClick={() => {}} />
      <LabelRole label="Blockchain Developer" onClick={() => {}} />
    </div>
  </div>
);
export const Normal = Template.bind({});
