const { merge } = require('webpack-merge');
const webpackConfig = require('react-scripts/config/webpack.config');

module.exports = merge(webpackConfig('development'), {
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
    },
  },
});
