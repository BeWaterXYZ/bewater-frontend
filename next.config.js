/** @type {import('next').NextConfig} */
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
