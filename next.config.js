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
      '/learning-materials': {page: '/learning-materials'}
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
