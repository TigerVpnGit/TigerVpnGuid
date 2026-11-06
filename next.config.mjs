import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',  
  basePath: '/TigerVpnGuid', 
  images: {
    unoptimized: true, 
  },
  trailingSlash: true, ت
};

export default nextConfig;
