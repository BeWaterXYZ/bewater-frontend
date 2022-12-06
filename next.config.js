/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

const api = {
  local: 'http://localhost:3000',
  qa: 'http://bw-backend-elb-532860068.ap-southeast-1.elb.amazonaws.com',
  prod: 'https://api.bewater.xyz',
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const environment = process.env.ENVIRONMENT ?? 'local';

const isInCI = process.env.CI ?? false;

console.log('use', { basePath, environment, isInCI });

const nextConfig = {
  sentry: {
    // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
    // for client-side builds. (This will be the default starting in
    // `@sentry/nextjs` version 8.0.0.) See
    // https://webpack.js.org/configuration/devtool/ and
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
    // for more information.
    hideSourceMaps: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  basePath,
  serverRuntimeConfig: {},
  publicRuntimeConfig: {
    basePath,
    environment,
    version: process.env.VERSION || 'local',
    apiHost: api[environment],
  },
  // Disabling Next.js ESLint check with custom one as there is
  // a separate step for it in the CI workflow
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Force .page prefix on page files (ex. index.page.tsx) so generated files can be included in /pages directory without Next.js throwing build errors
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  eslint: {
    dirs: ['src'],
  },
  // This will build the project as a standalone app inside the Docker image.
  output: 'standalone',
  webpack(config) {
    if (config.name === 'client') {
      // choose the right format for Catalyst packages
      config.resolve.conditionNames = ['require', 'import', 'es2015', 'node'];
    }
    config.module.rules.push({
      test: /\.svg$/i,
      // issuer section restricts svg as component only to
      // svgs imported from js / ts files.
      //
      // This allows configuring other behavior for
      // svgs imported from other file types (such as .css)
      issuer: { and: [/\.(js|ts|md)x?$/] },
      use: '@svgr/webpack',
    });
    return config;
  },
};

module.exports = nextConfig;

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  silent: true, // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
console.log(process.env);
// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = isInCI
  ? nextConfig
  : withSentryConfig(nextConfig, sentryWebpackPluginOptions);
