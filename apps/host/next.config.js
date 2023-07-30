/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://build.bewater.xyz/host/:path*',
        permanent: true,
      },
    ]
  },
};

module.exports = nextConfig;
