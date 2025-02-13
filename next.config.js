/** @type {import('next').NextConfig} */
const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
    providerImportSource: "@mdx-js/react",
  },
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return config
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // Handle www to non-www redirects
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.edgar.barrantes.dev',
          },
        ],
        destination: 'https://edgar.barrantes.dev/:path*',
        permanent: true,
      },
    ]
  },
  // Trailing slash configuration
  trailingSlash: false,
  // Canonical domain configuration
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Link',
            value: '<https://edgar.barrantes.dev/:path*>; rel="canonical"',
          },
        ],
      },
    ]
  },
}

module.exports = withMDX(nextConfig)
