/** @type {import('next').NextConfig} */
let nextConfig = {
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
