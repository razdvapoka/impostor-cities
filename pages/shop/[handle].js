import { Product } from '@/components'
import {
  getProductByHandle,
  getProductHandles,
  getProducts,
} from '@/lib/shopify'
import { withCommonData } from '@/lib/utils'

export const getStaticProps = async (context) => {
  const {
    commonData,
    data: [product, products],
  } = await withCommonData((c) =>
    Promise.all([getProductByHandle(c), getProducts(c)])
  )(context)
  return {
    props: {
      commonData,
      product,
      products,
    },
  }
}

export const getStaticPaths = async ({ locales }) => {
  const handles = await getProductHandles()
  return {
    paths: handles.flatMap((handle) =>
      locales
        ? locales.map((locale) => ({ params: { handle }, locale }))
        : { params: { handle } }
    ),
    fallback: false,
  }
}

const ProductPage = ({ commonData, product, products }) => {
  return (
    <Product commonData={commonData} product={product} products={products} />
  )
}

export default ProductPage
