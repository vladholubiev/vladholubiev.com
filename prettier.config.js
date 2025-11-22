import shelfConfig from '@shelf/prettier-config' with {type: 'json'};

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  ...shelfConfig,
};

export default config;
