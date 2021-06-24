const url = process.env.VERCEL
  ? `https://impostorcities.com`
  : 'http://localhost:3000'

module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localeDetection: true,
  loadLocaleFrom: (locale) => {
    console.log('URL:', url)
    return fetch(`${url}/api/locales/${locale}`).then((response) =>
      response.json()
    )
  },
  pages: {
    '*': ['common'],
  },
}
