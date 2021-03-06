const nextTranslate = require('next-translate')
const withPlugins = require('next-compose-plugins')
const withTM = require('next-transpile-modules')(['@mavrin/remark-typograf'])

module.exports = withPlugins([withTM, nextTranslate], {
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
    domains: ['images.ctfassets.net', 'cdn.shopify.com'],
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
      {
        source: '/en/boutique',
        destination: '/fr/boutique',
        locale: false,
        permanent: true,
      },
      {
        source: '/en/boutique/:handle',
        destination: '/fr/boutique/:handle',
        locale: false,
        permanent: true,
      },
      {
        source: '/en/panier',
        destination: '/fr/panier',
        locale: false,
        permanent: true,
      },
      {
        source: '/en/projet',
        destination: '/fr/projet',
        locale: false,
        permanent: true,
      },
    ]
  },
})
