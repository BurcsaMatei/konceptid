// next.config.js
const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.plugins.push(createVanillaExtractPlugin());
    return config;
  },
  // Important pentru /app și server components:
  experimental: {
    serverActions: false, // asigură-te că nu ai incompatibilități
  }
};

module.exports = nextConfig;
