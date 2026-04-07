/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  transpilePackages: ["@cms/event-bus", "@cms/tenant-config", "@cms/shared-store"],
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
