// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // erzeugt ./out für den statischen Upload
  output: 'export',

  // wichtig für Shared Hosting (kein Image-Optimizer)
  images: { unoptimized: true },

  // sorgt für /route/ -> /route/index.html (Apache/Hostinger-freundlich)
  trailingSlash: true,

  // Falls du in ein Unterverzeichnis deployst (z. B. domain.tld/website):
  // basePath: '/website',
  // assetPrefix: '/website/',
};

export default nextConfig;
