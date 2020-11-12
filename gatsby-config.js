const postCssCustomProperties = require('postcss-custom-properties');

const gatsbyConfig = {
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            // options: {
            //   name: "uploads",
            // },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
              quality: 90,
              withWebp: {
                quality: 90,
              },
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cache',
      options: {
        // Caching the public directory on long term can result in a huge directory
        // size which can break your netlify build. Enable this with caution
        cachePublic: true,
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        postCssPlugins: [postCssCustomProperties()],
      },
    },
    {
      resolve: 'gatsby-plugin-polyfill-io', //  ios12> & ie11
      options: {
        features: ['IntersectionObserver'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/site`,
        name: 'site',
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        identityWidgetInitConfig: {
          APIUrl: 'https://random.studio/netlify-identity',
        },
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
};

// CONTEXT is a netlify env
if (
  process.env.CONTEXT === 'production' ||
  process.env.CONTEXT === 'deploy-preview'
) {
  const gaConfig = {
    resolve: 'gatsby-plugin-google-analytics',
    options: {
      trackingId: 'UA-9384788-13',
      head: true,
      anonymize: true,
      respectDNT: true,
    },
  };

  gatsbyConfig.plugins.push(gaConfig);
}

module.exports = gatsbyConfig;
