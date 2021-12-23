/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'localhost',
      'bookendd.vercel.app',
      '192.168.0.10:3000',
    ],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}
