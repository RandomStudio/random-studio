const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  experimental: { esmExternals: true },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/NikeLab-ACG',
        destination: '/nikelab-acg',
        permanent: false,
      },
      {
        source: '/NikeLab-Tech-Pack',
        destination: '/nikelab-tech-pack',
        permanent: false,
      },
    ],
  },
});
