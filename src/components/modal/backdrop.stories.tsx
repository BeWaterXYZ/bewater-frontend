import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Backdrop } from './backdrop';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Backdrop',
  component: Backdrop,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Backdrop>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Backdrop> = (args) => (
  <Backdrop {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  children: (
    <div className="text-xl font-bold w-fit mx-auto mt-10 text-purple-500">
      child of backdrop
    </div>
  ),
  // eslint-disable-next-line
  onClick: () => {},
};
