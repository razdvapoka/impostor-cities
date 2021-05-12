import { Shop } from '@/components'
import { getProducts } from '@/lib/shopify'
import { withCommonData } from '@/lib/utils'
import { CartProvider } from '@/contexts/cart'

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

const ShopPage = ({ commonData, products }) => {
  return (
    <CartProvider
      initialValue={{
        products,
        selected: {},
      }}
    >
      <Shop commonData={commonData} products={products} />
    </CartProvider>
  )
}

export default ShopPage
