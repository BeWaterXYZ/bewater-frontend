/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.unsplash.com",
      },
      {
        hostname: "*.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
