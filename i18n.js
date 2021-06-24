module.exports = {
  locales: ['en', 'fr'],
  defaultLocale: 'en',
  localeDetection: true,
  // loadLocaleFrom: (locale) => {
  //   return fetch(
  //     `${process.env.NEXT_PUBLIC_HOST_URL}/api/locales/${locale}`
  //   ).then((response) => response.json())
  // },
  pages: {
    '*': ['common'],
  },
}
