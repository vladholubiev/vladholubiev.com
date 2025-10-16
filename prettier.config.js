import * as tailwindPlugin from 'prettier-plugin-tailwindcss'


import shelfConfig from '@shelf/prettier-config' with { type: 'json' } ;

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
export default {
  ...shelfConfig,
  plugins: [tailwindPlugin],
} ;
