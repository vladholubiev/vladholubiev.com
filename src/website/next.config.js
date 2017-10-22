const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const {ANALYZE} = process.env;

module.exports = {
  exportPathMap() {
    return {
      '/': {page: '/'}
    }
  },
  webpack(config) {
    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }));
    }

    return config
  }
};
