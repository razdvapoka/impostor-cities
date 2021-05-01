export const DEFAULT_ITEM_ORDERING = 'sys_publishedAt_DESC'

const MAIN_PAGE_GRAPHQL_FIELDS = `
  sys {
    id
  }
  title
  description
  galleryCollection {
    items {
      url
      width
      height
    }
  }
`

const GRAPHQL_API_BASE_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`

async function fetchGraphQL(query) {
  return fetch(GRAPHQL_API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({ query }),
  }).then((response) => response.json())
}

// const queryParamToWhereClause = (param, value) =>
//   value
//     ? `${param}: { slug_in: [${value
//         .split(',')
//         .map((c) => `"${c}"`)
//         .join(',')}] },`
//     : ''

export async function getMainPage() {
  const query = `
    query {
      page(id: "${process.env.MAIN_PAGE_ID}") {
        ${MAIN_PAGE_GRAPHQL_FIELDS}
      }
    }
  `
  const {
    data: { page },
  } = await fetchGraphQL(query)
  return page
}

const PRESS_FIELDS = `
  title,
  assets,
  inquiriesTitle,
  inquiries,
  inquiriesUrl
`

export async function getPressPage() {
  const query = `
    query {
      en: pressCollection(locale: "en") {
        items {
          ${PRESS_FIELDS}
        }
      }
      fr: pressCollection(locale: "fr") {
        items {
          ${PRESS_FIELDS}
        }
      }
    }
  `
  const {
    data: {
      en: {
        items: [en],
      },
      fr: {
        items: [fr],
      },
    },
  } = await fetchGraphQL(query)
  return { en, fr }
}

export async function getCommonData() {
  /*
  const query = `query {
      settingsCollection (limit: 1) {
        items {
        }
      }
    }`
  const {
    data: {
      settingsCollection: { items },
    },
  } = await fetchGraphQL(query)
  return items[0]
  */
  return {}
}
