/** @type {import('next').NextConfig} */
const nextConfig = {images: {
    domains: [
      "course-material-dev.s3.us-east-2.amazonaws.com"
    ]
  }}

  module.exports = {
    ...nextConfig,
    webpack: (config) => {
      config.module.rules.push({
        test: /\.(mp3|wav|ogg)$/i,
        use: {
          loader: 'url-loader',
        },
      });
  
      return config;
    }
  };
