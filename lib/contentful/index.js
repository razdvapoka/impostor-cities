const DEFAULT_LOCALE = 'en-CA'
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

export async function getMainPage({ locale = DEFAULT_LOCALE }) {
  const query = `
    query {
      page(locale: "${locale}", id: "${process.env.MAIN_PAGE_ID}") {
        ${MAIN_PAGE_GRAPHQL_FIELDS}
      }
    }
  `
  const {
    data: { page },
  } = await fetchGraphQL(query)
  return page
}

export async function getCommonData({ locale = DEFAULT_LOCALE }) {
  /*
  const query = `query {
      settingsCollection (locale: "${locale}", limit: 1) {
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
