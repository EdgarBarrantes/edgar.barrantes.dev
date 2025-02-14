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
    // Optimize image formats
    formats: ['image/avif', 'image/webp'],
    // Enable blur placeholder
    minimumCacheTTL: 60,
  },
  // Enable compression
  compress: true,
  experimental: {
    // Optimize JS bundle
    optimizePackageImports: ['lucide-react'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    // Optimize bundle size
    if (config.mode === 'production') {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 70000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

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
          // Add performance-related headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

module.exports = withMDX(nextConfig)
