import { Product } from '@/components'
import { getProductByHandle, getProductHandles } from '@/lib/shopify'
import { withCommonData } from '@/lib/utils'

export const getStaticProps = async (context) => {
  const { commonData, data } = await withCommonData(getProductByHandle)(context)
  return {
    props: {
      commonData,
      product: data,
    },
  }
}

export const getStaticPaths = async ({ locales }) => {
  const handles = await getProductHandles()
  console.log(handles)
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
