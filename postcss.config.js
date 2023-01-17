const { join } = require('path');

module.exports = {
  plugins: [
    [
      'postcss-mixins',
      {
        mixinsDir: join(__dirname, 'src/styles/mixins'),
      },
    ],
    'postcss-nested',
    [
      'postcss-custom-media',
      {
        importFrom: join(__dirname, 'src/styles/mixins/_mediaqueries.css'),
      },
    ],
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          grid: false,
          flexbox: false,
        },
        stage: 0,
      },
    ],
  ],
};
