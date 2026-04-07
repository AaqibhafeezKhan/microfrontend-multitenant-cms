/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  basePath: "/analytics",
  assetPrefix: "/analytics",
  transpilePackages: ["@cms/event-bus", "@cms/tenant-config", "@cms/shared-store"],
  experimental: {
    optimizePackageImports: ["recharts"],
  },
};

module.exports = nextConfig;
