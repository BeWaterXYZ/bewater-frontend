import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SocialLink } from './social-link';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Form/SocialLink',
  component: SocialLink,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SocialLink>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SocialLink> = (args) => {
  return <SocialLink {...args} />;
};

export const GithubUnconnect = Template.bind({});
GithubUnconnect.args = {
  label: 'Github',
  name: 'github',
};

export const GithubConnected = Template.bind({});
GithubConnected.args = {
  label: 'Github',
  name: 'github',
  value: 'https://github.com/bewater',
};

export const DiscordUnconnect = Template.bind({});
DiscordUnconnect.args = {
  label: 'Discord',
  name: 'discord',
};

export const DiscordConnected = Template.bind({});
DiscordConnected.args = {
  label: 'Discord',
  name: 'discord',
  value: 'https://discord.com/bewater',
};

export const TwitterUnconnect = Template.bind({});
TwitterUnconnect.args = {
  label: 'Twitter',
  name: 'twitter',
};

export const TwitterConnected = Template.bind({});
TwitterConnected.args = {
  label: 'Twitter',
  name: 'twitter',
  value: 'https://twitter.com/bewater',
};
