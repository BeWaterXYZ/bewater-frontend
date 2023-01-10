import * as React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { TagSkill } from './index';
import { TagRole } from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Tag',
  component: TagRole,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    size: {
      control: 'text',
    },
    color: {
      control: 'text',
    },
  },
} as ComponentMeta<typeof TagRole>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof TagRole> = (args) => (
  <div>
    <div className="flex gap-2">
      <TagRole label="Designer" />
      <TagRole label="Frontend Developer" />
      <TagRole label="Backend Developer" />
      <TagRole label="Blockchain Developer" />
    </div>
    <div className="flex gap-2">
      <TagRole label="Designer" onClick={() => {}} />
      <TagRole label="Frontend Developer" onClick={() => {}} />
      <TagRole label="Backend Developer" onClick={() => {}} />
      <TagRole label="Blockchain Developer" onClick={() => {}} />
    </div>
  </div>
);
export const Role = Template.bind({});

const Template2: ComponentStory<typeof TagSkill> = (args) => (
  <div>
    <div className="flex gap-2">
      <TagSkill label="React" />
      <TagSkill label="Solidity" />
    </div>
    <div className="flex gap-2">
      <TagSkill label="React" onClick={() => {}} />
      <TagSkill label="Solidity" onClick={() => {}} />
    </div>
  </div>
);
export const Skill = Template2.bind({});
