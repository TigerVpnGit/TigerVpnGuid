import type { NextConfig } from 'next';

export default nextConfig;
const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/TigerVpnGuid',
  images: { unoptimized: true },
  trailingSlash: true,
};
