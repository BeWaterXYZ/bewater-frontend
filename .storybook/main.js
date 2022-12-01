const path = require('path');

module.exports = {
  reactDocgen: false,
  stories: [
    '../src/components/**/*.stories.@(jsx|tsx)',
    '../src/pages/**/*.stories.@(jsx|tsx)',
    '../src/features/**/*.stories.@(jsx|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          postcssOptions: {
            plugins: [
              require.resolve('postcss-import'),
              require.resolve('tailwindcss/nesting'),
              require.resolve('tailwindcss'),
              require.resolve('autoprefixer'),
            ],
          },
          implementation: require('postcss'),
        },
      },
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack5',
  },
  webpackFinal: (config) => {
    /**
     * Add support for alias-imports
     * @see https://github.com/storybookjs/storybook/issues/11989#issuecomment-715524391
     */
    config.resolve.alias = {
      ...config.resolve?.alias,
      '@': [path.resolve(__dirname, '../src/'), path.resolve(__dirname, '../')],
    };

    config.resolve.fallback = {
      stream: require.resolve('stream-browserify'),
      crypto: require.resolve('crypto-browserify'),
      path: require.resolve('path-browserify'),
    };

    /**
     * Fixes font import with /
     * @see https://github.com/storybookjs/storybook/issues/12844#issuecomment-867544160
     */
    config.resolve.roots = [
      path.resolve(__dirname, '../public'),
      'node_modules',
    ];

    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg'),
    );
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      loader: require.resolve('@svgr/webpack'),
    });

    // babel-loader + preset-typescript somehow fails to transpile some TS syntax
    // use ts-loader instead
    config.module.rules.push({
      test: /\.tsx?$/,
      loader: 'ts-loader',
    });

    return config;
  },
  staticDirs: ['../public'],
};
