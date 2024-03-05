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
        source: '/admin',
        destination: 'https://random-studio.admin.datocms.com',
        permanent: false,
      },
      {
        source: '/newsletter',
        destination: 'http://eepurl.com/gebngv',
        permanent: false,
      },
      {
        source: '/video',
        destination: '/',
        permanent: false,
      },
      {
        source: '/chloe',
        destination:
          'https://random.studio/projects/a-ss21-collection-experience-for-chloe',
        permanent: false,
      },
      {
        source: '/nicetomeetyou',
        destination: '/',
        permanent: false,
      },
      {
        source: '/projects/NikeLab-ACG',
        destination: '/projects/nikelab-acg',
        permanent: false,
      },
      {
        source: '/projects/NikeLab-Tech-Pack',
        destination: '/projects/nikelab-tech-pack',
        permanent: false,
      },
      {
        source: '/cave',
        destination:
          'https://archive-laser-painting--sage-melomakarona-00e1a3.netlify.app/',
        basePath: false,
        permanent: false,
      },
    ];
  },
});
