import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Card } from './card';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Card',
  component: Card,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Card>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Card> = (args) => {
  return (
    <div className="bg-night">
      <div className="w-80 ">
        <Card />
      </div>
    </div>
  );
};

export const Normal = Template.bind({});
