import Client from 'shopify-buy-with-tags'

const client = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
})

const clientFr = Client.buildClient({
  domain: process.env.SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.SHOPIFY_ACCESS_TOKEN,
  language: 'fr',
})

const pickOptionValueProps = ({ value }) => value

const pickOptionProps = ({ id, name, values }) => ({
  id,
  name,
  values: values.map(pickOptionValueProps),
})

const pickSelectedOptionProps = ({ name, value }) => ({
  name,
  value,
})

const pickImageProps = ({ id, src, altText }) => ({ id, src, altText })
const pickVariantProps = ({
  id,
  title,
  price,
  available,
  compareAtPrice,
  image,
  selectedOptions,
}) => ({
  id,
  title,
  price,
  available,
  compareAtPrice,
  image: pickImageProps(image),
  selectedOptions: selectedOptions
    .filter((o) => o.name !== 'Title')
    .map(pickSelectedOptionProps),
})

const pickProductProps = ({
  id,
  availableForSale,
  createdAt,
  updatedAt,
  descriptionHtml,
  description,
  productType,
  title,
  publishedAt,
  options,
  images,
  variants,
  handle,
  type,
  tags,
}) => ({
  id,
  availableForSale,
  createdAt,
  updatedAt,
  descriptionHtml,
  description,
  productType,
  title,
  publishedAt,
  options: options.filter((o) => o.name !== 'Title').map(pickOptionProps),
  images: images.map(pickImageProps),
  variants: variants.map(pickVariantProps),
  tags: tags.map((tag) => tag.value),
  handle,
  type,
})

export const getProducts = async () => {
  const [collectionsEn, collectionsFr] = await Promise.all([
    client.collection.fetchAllWithProducts(),
    clientFr.collection.fetchAllWithProducts(),
  ])
  const productsEn = collectionsEn[0].products
  const productsFr = collectionsFr[0].products
  const clearProductsEn = productsEn.map(pickProductProps)
  const clearProductsFr = productsFr.map(pickProductProps)
  const products = clearProductsEn
    .slice(0, clearProductsEn.length)
    .map((productEn) => {
      return {
        en: productEn,
        fr: clearProductsFr.find((productFr) => productFr.id === productEn.id),
      }
    })
  return products
}

export const getProductByHandle = async ({ params: { handle } }) => {
  const productEn = await client.product.fetchByHandle(handle)
  const productFr = await clientFr.product.fetchByHandle(handle)
  return { en: pickProductProps(productEn), fr: pickProductProps(productFr) }
}

export const getProductHandles = async () => {
  const products = await client.product.fetchAll()
  const handles = products.map((p) => p.handle)
  return handles
}
