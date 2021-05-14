export const DEFAULT_ITEM_ORDERING = 'sys_publishedAt_DESC'

const GRAPHQL_API_BASE_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`

const VIDEO_ITEM_FIELDS = `
  sys {
    id
  }
  title
  vimeoUrl
  vimeoPosterUrl
  stopOnHover
  captionEn: caption(locale: "en")
  captionFr: caption(locale: "fr")
  nextVideoItem {
    sys {
      id
    }
  }
`

const PRESS_FIELDS = `
  title,
  assets,
  inquiriesTitle,
  inquiries,
  inquiriesUrl
`

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

export async function getVideos() {
  const query = `
    query {
    videosCollection(limit: 1) {
      items {
        title
        itemsCollection(limit: 100) {
          items {
            ... on VideoItem {
              ${VIDEO_ITEM_FIELDS}
              __typename
            }
            ... on VideoBlock {
              sys {
                id
              }
              __typename
              title
              isTakeover
              itemsCollection(limit: 10) {
                items {
                  ${VIDEO_ITEM_FIELDS}
                }
              }
            }
          }
        }
      }
    }
  }

  `
  const {
    data: {
      videosCollection: {
        items: [videosCollection],
      },
    },
  } = await fetchGraphQL(query)
  const {
    itemsCollection: { items: videos },
  } = videosCollection
  return videos
}

export async function getCommonData() {
  return {}
}
