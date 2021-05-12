import { Cart } from '@/components'
import { getProducts } from '@/lib/shopify'
import { withCommonData } from '@/lib/utils'

export const getStaticProps = async (context) => {
  const { commonData, data } = await withCommonData(getProducts)(context)
  return {
    props: {
      commonData,
      products: data,
    },
    revalidate: 10,
  }
}

const CartPage = ({ commonData, products }) => {
  return <Cart commonData={commonData} products={products} />
}

export default CartPage
