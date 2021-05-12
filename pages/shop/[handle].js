import { Product } from '@/components'
import { getProductByHandle, getProductHandles } from '@/lib/shopify'
import { withCommonData } from '@/lib/utils'

export const getStaticProps = async (context) => {
  const { commonData, data: product } = await withCommonData(
    getProductByHandle
  )(context)
  return {
    props: {
      commonData,
      product,
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

const ProductPage = ({ commonData, product }) => {
  return <Product commonData={commonData} product={product} />
}

export default ProductPage
