module.exports = {
  env: {
    CDN_URL: process.env.NODE_ENV === 'production'
      ? 'https://d3j85u6uj65sfx.cloudfront.net'
      : '',
  },
  experimental: { esmExternals: true },
};
