const nextTranslate = require('next-translate')
const withPlugins = require('next-compose-plugins')

module.exports = withPlugins([nextTranslate], {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
    }
    return config
  },
  sassOptions: {
    prependData: `
      @import "assets/scss/theme/index.scss";
    `,
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
  future: {
    webpack5: true,
  },
  async redirects() {
    return [
      {
        source: '/en/presse',
        destination: '/fr/presse',
        locale: false,
        permanent: true,
      },
    ]
  },
})
