/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'razkdnvjiphbjmghodwt.supabase.co',
        port: '',
        pathname: '/storage/**'
      },
    ]
  }
};

module.exports = nextConfig;
