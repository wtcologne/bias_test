/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Bilder aus dem public-Ordner werden automatisch unterstützt
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

