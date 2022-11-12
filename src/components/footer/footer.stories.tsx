import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Footer } from './footer';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Base/Footer',
  component: Footer,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Footer>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Footer> = () => (
  <div
    className="flex flex-col justify-end"
    style={{ height: 'calc(100vh - 40px)' }}
  >
    <Footer />
  </div>
);

export const Normal = Template.bind({});
