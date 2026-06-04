import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    disableStaticImages: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  async redirects() {
    return [
      {
        source: '/final-year-projects',
        destination: '/college-projects',
        permanent: true,
      },
      {
        source: '/research',
        destination: '/services',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
