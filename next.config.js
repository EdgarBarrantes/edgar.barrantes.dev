/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // One small Node image for poseidon (olympus DEPLOY.md); Cloudflare compresses, not Next.
  output: 'standalone',
  compress: false,
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
