import * as tailwindPlugin from 'prettier-plugin-tailwindcss'
import shelfConfig from '@shelf/prettier-config' with { type: 'json' } ;
export default {
  ...shelfConfig,
  plugins: [tailwindPlugin],
}
