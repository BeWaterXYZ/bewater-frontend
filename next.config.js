/** @type {import('next').NextConfig} */

const { withSentryConfig } = require('@sentry/nextjs');

const isInGithubAction = !!process.env.GITHUB_ACTION;

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
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
  async redirects() {
    return [
      {
        source: '/challenges/:cid',
        destination: '/challenges/:cid/intro',
        permanent: true,
      },
    ];
  },
};

const sentryModuleExports = {
  // your existing module.exports

  // Optional build-time configuration options
  sentry: {
    // See the sections below for information on the following options:
    //   'Configure Source Maps':
    //     - disableServerWebpackPlugin
    //     - disableClientWebpackPlugin
    //     - hideSourceMaps
    //     - widenClientFileUpload
    //   'Configure Legacy Browser Support':
    //     - transpileClientSDK
    //   'Configure Serverside Auto-instrumentation':
    //     - autoInstrumentServerFunctions
    //     - excludeServerRoutes
    hideSourceMaps: true,
  },
};

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
// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins

const configWithSentry = withSentryConfig(
  { ...nextConfig, ...sentryModuleExports },
  sentryWebpackPluginOptions,
);

module.exports = isInGithubAction ? nextConfig : configWithSentry;
