/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.unsplash.com",
      },  {
        hostname: "*.bewater.xyz",
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
