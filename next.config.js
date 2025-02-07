module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  webpack(config, options) {
    config.devtool = 'eval-source-map';
    return config;
  },
};
