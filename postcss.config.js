const { join } = require('path');

module.exports = {
  plugins: [
    'postcss-browser-reporter',
    [
      'postcss-mixins',
      {
        mixinsDir: join(__dirname, 'src/styles/mixins'),
      },
    ],
    'postcss-nested',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          grid: false,
        },
        stage: 0,
      },
    ],
  ],
};
