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
      {
        hostname: "*.clerk.com",
      },
    ],
  },
};

module.exports = nextConfig;
