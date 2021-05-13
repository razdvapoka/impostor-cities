// import useTranslation from 'next-translate/useTranslation'
import { Layout } from '@/components'
import { useCart } from '@/contexts/cart'
import styles from './styles.module.scss'
import { getPriceString, getSizeOption, getColorOption } from '@/lib/utils'
import cn from 'classnames'

const getVariants = (product, variantId) => {
  const variantEn = product.en.variants.find((v) => v.id === variantId)
  const variantFr = product.fr.variants.find((v) => v.id === variantId)
  return { variantEn, variantFr }
}

const CartProduct = ({ product, variant: { variantId, count } }) => {
  const { variantEn, variantFr } = getVariants(product, variantId)
  return (
    <div className="my-grid text-ts1B">
      <div className="w-1/8">{product.en.title}</div>
      <div className="w-1/8">{product.fr.title}</div>
      <div className="w-1/16">{getColorOption(variantEn).value}</div>
      <div className="w-1/8">{getColorOption(variantFr).value}</div>
      <div className="w-1/16">{getSizeOption(variantEn).value}</div>
      <div className="w-1/8">{getSizeOption(variantFr).value}</div>
      <div className="w-1/8">{count}</div>
      <div className="w-1/8">{getPriceString(variantEn.price)}</div>
    </div>
  )
}

const Cart = ({ commonData, products }) => {
  const [
    cart,
    // setCart
  ] = useCart()
  const productMap = products.reduce(
    (map, product) => ({
      ...map,
      [product.en.id]: product,
    }),
    {}
  )
  return (
    <Layout {...commonData}>
      <div className={cn('', styles.cart)}>
        <div className="my-grid pt-3 text-ts1B mb-1">
          <div className="w-1/8">
            <div className="pb-8">Item</div>
          </div>
          <div className="w-1/8">
            <div className={cn('pb-8 relative', styles.leftBorder)}>
              Article
            </div>
          </div>
          <div className="w-1/16">
            <div className={cn('pb-8 relative', styles.leftBorder)}>Colour</div>
          </div>
          <div className="w-1/8">
            <div className={cn('pb-8 relative', styles.leftBorder)}>
              Couleur
            </div>
          </div>
          <div className="w-1/16">
            <div className={cn('pb-8 relative', styles.leftBorder)}>Size</div>
          </div>
          <div className="w-1/8">
            <div className={cn('pb-8 relative', styles.leftBorder)}>
              Grandeur
            </div>
          </div>
          <div className="w-1/16">
            <div className={cn('pb-8 relative', styles.leftBorder)}>Qty</div>
          </div>
          <div className="w-1/16">
            <div className="relative pb-8">Qté</div>
          </div>
          <div className="w-1/16">
            <div className={cn('pb-8 relative', styles.leftBorder)}>Price</div>
          </div>
          <div className="w-1/16">
            <div className="relative pb-8">Prix</div>
          </div>
          <div className="w-1/8">
            <div className="relative pb-8">Buttons</div>
          </div>
        </div>
        <div>
          {Object.keys(cart).map((key) => {
            const product = productMap[key]
            const selectedVariants = cart[key]
            return (
              <div key={key}>
                {selectedVariants.map((variant) => (
                  <CartProduct
                    key={variant.variantId}
                    product={product}
                    variant={variant}
                  />
                ))}
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default Cart
