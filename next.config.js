/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: false,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ["source.unsplash.com", "images.unsplash.com", "ipfs.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "**.bewater.xyz",
      },
      {
        hostname: "*.clerk.com",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/en/campaigns/bewater-web3-zh",
        destination: "/en/campaigns/1",
      },
      {
        source: "/zh/campaigns/bewater-web3-zh",
        destination: "/zh/campaigns/1",
      },
    ];
  },

  // swcMinify: true,

  // // Disabling Next.js ESLint check with custom one as there is
  // // a separate step for it in the CI workflow

  // // Force .page prefix on page files (ex. index.page.tsx) so generated files can be included in /pages directory without Next.js throwing build errors
  // pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  // eslint: {
  //   dirs: ['src'],
  // },
  // // This will build the project as a standalone app inside the Docker image.
  // output: 'standalone',
};

module.exports = nextConfig;
