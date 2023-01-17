/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/teleapi/:path*',
        destination: 'http://teleuniv.in/:path*' // Proxy to Backend
      }
    ]
  }
}

module.exports = nextConfig
