const fetch = require('node-fetch')
const fs = require('fs/promises')

fetch(`https://impostorcities.com/api/locales`)
  .then((response) => response.json())
  .then(({ en, fr }) => {
    return Promise.all([
      fs.writeFile('./locales/en/common.json', JSON.stringify(en)),
      fs.writeFile('./locales/fr/common.json', JSON.stringify(fr)),
    ])
      .then(() => {
        console.log('locales got')
      })
      .catch((err) => {
        console.log('ERROR:', err)
      })
  })
