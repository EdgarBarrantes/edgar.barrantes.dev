/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.edgar.barrantes.dev' }],
        destination: 'https://edgar.barrantes.dev/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
