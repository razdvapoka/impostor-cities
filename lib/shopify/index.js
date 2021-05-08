import Client from 'shopify-buy'

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

const pickImageProps = ({ id, src, altText }) => ({ id, src, altText })
const pickVariantProps = ({
  id,
  title,
  price,
  available,
  compareAtPrice,
  image,
}) => ({
  id,
  title,
  price,
  available,
  compareAtPrice,
  image: pickImageProps(image),
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
  type,
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
  options: options.map(pickOptionProps),
  images: images.map(pickImageProps),
  variants: variants.map(pickVariantProps),
  type,
})

export const getProducts = async () => {
  const [productsEn, productsFr] = await Promise.all([
    client.product.fetchAll(),
    clientFr.product.fetchAll(),
  ])
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
