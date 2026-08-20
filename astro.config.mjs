// @ts-check
import { fileURLToPath } from 'node:url';

import postcssGlobalData from '@csstools/postcss-global-data';
import { defineConfig } from 'astro/config';
import postcssMixins from 'postcss-mixins';
import postcssPresetEnv from 'postcss-preset-env';

const mixinsDir = fileURLToPath(new URL('./src/styles/mixins', import.meta.url));
const mediaQueries = fileURLToPath(
  new URL('./src/styles/mixins/_mediaqueries.css', import.meta.url),
);

// https://astro.build/config
export default defineConfig({
  vite: {
    css: {
      postcss: {
        plugins: [
          postcssMixins({ mixinsDir }),
          postcssGlobalData({ files: [mediaQueries] }),
          postcssPresetEnv({
            stage: 0,
            autoprefixer: {
              grid: false,
              flexbox: false,
            },
          }),
        ],
      },
    },
  },
});
