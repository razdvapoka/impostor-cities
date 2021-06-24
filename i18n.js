const url = process.env.VERCEL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000'

module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localeDetection: true,
  // loadLocaleFrom: (locale) => {
  //   console.log('URL:', url)
  //   return fetch(`${url}/api/locales/${locale}`).then((response) =>
  //     response.json()
  //   )
  // },
  pages: {
    '*': ['common'],
  },
}
