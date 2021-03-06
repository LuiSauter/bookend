// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'localhost',
      'bookendd.vercel.app',
      'avatars.githubusercontent.com',
      'i.ibb.co',
      'giphy.com',
      'i.giphy.com',
      'flagicons.lipis.dev',
      '192.168.0.10:3000',
    ],
    formats: ['image/webp'],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  }
})
