module.exports = {
  webpack(config, options) {
    config.devtool = 'eval-source-map';
    return config;
  },
};
