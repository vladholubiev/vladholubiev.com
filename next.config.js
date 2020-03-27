/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const withCSS = require('@zeit/next-css');

const {ANALYZE} = process.env;

module.exports = withCSS({
  exportPathMap() {
    return {
      '/': {page: '/'},
      '/serverless-libreoffice': {page: '/serverless-libreoffice'},
      '/projects/learning-materials': {page: '/projects/learning-materials'},
      '/projects/webstorm-live-templates-for-jest': {
        page: '/projects/webstorm-live-templates-for-jest'
      },
      '/projects/quickreview-for-github': {page: '/projects/quickreview-for-github'}
    };
  },
  webpack(config) {
    if (ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          analyzerPort: 8888,
          openAnalyzer: true
        })
      );
    }

    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/));

    return config;
  }
});
