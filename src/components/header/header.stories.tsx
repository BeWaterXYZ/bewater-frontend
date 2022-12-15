import { ComponentMeta, ComponentStory } from '@storybook/react';

import { HeaderImpl } from './header';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Header',
  component: HeaderImpl,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof HeaderImpl>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof HeaderImpl> = (args) => {
  return <HeaderImpl {...args} />;
};

export const Normal = Template.bind({});
Normal.args = {
  logo: <div>this is logo</div>,
  nav: <div>this is nav</div>,
  user: <div>this is user</div>,
};
