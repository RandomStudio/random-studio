/** @type {import('postcss-load-config').Config} */
const { join } = require('path');

const config = {
  plugins: [
    require('postcss-mixins')({
      mixinsDir: join(__dirname, 'src/styles/mixins'),
    },
    ),
    require('postcss-nested'),
    require('postcss-preset-env')({
      autoprefixer: {
        grid: false,
        flexbox: false,
      },
      stage: 0,
    },),
  ]
}

module.exports = config
