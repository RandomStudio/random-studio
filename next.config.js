module.exports = {
  env: {
    CDN_URL: process.env.PRODUCTION
      ? 'https://d3j85u6uj65sfx.cloudfront.net'
      : '',
  },
  experimental: { esmExternals: true },
};
