/** @type {import('next').NextConfig} */

const api = {
  local: 'http://localhost:3000',
  qa: 'http://bw-backend-elb-532860068.ap-southeast-1.elb.amazonaws.com',
  prod: 'https://api.bewater.xyz',
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const environment = process.env.ENVIRONMENT ?? 'local';

console.log('use', { basePath, environment });

const nextConfig = {
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
