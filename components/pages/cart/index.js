import useTranslation from 'next-translate/useTranslation'
import { useCallback, useMemo } from 'react'
import { Layout } from '@/components'
import { useCart } from '@/contexts/cart'
import styles from './styles.module.scss'
import {
  getPriceString,
  getSizeOption,
  getColorOption,
  enOnly,
  frOnly,
} from '@/lib/utils'
import cn from 'classnames'
import DeleteIcon from '../../../assets/icons/delete.svg'
import IncIcon from '../../../assets/icons/inc.svg'
import DecIcon from '../../../assets/icons/dec.svg'

const getVariants = (product, variantId) => {
  const variantEn = product.en.variants.find((v) => v.id === variantId)
  const variantFr = product.fr.variants.find((v) => v.id === variantId)
  return { variantEn, variantFr }
}

const CartProduct = ({
  product,
  variant: { variantId, count },
  cart,
  setCart,
}) => {
  const { variantEn, variantFr } = getVariants(product, variantId)
  const deleteVariant = useCallback(() => {
    const productId = product.en.id
    setCart({
      ...cart,
      [productId]: cart[productId].filter((v) => v.variantId !== variantId),
    })
  }, [product, variantId, cart, setCart])
  const decreaseNumber = useCallback(() => {
    const productId = product.en.id
    setCart({
      ...cart,
      [productId]: cart[productId].map((v) =>
        v.variantId === variantId && v.count > 1
          ? { ...v, count: v.count - 1 }
          : v
      ),
    })
  }, [product, variantId, cart, setCart])
  const increaseNumber = useCallback(() => {
    const productId = product.en.id
    setCart({
      ...cart,
      [productId]: cart[productId].map((v) =>
        v.variantId === variantId ? { ...v, count: v.count + 1 } : v
      ),
    })
  }, [product, variantId, cart, setCart])
  const colorEn = getColorOption(variantEn)?.value
  const colorFr = getColorOption(variantFr)?.value
  const sizeEn = getSizeOption(variantEn)?.value
  const sizeFr = getSizeOption(variantFr)?.value
  return (
    <div className="my-grid text-ts1B">
      <div className="w-1/8">{product.en.title}</div>
      <div className="w-1/8">{product.fr.title}</div>
      <div className="w-1/16">{colorEn || '—'}</div>
      <div className="w-1/8">{colorFr || '—'}</div>
      <div className="w-1/16">{sizeEn || '—'}</div>
      <div className="w-1/8">{sizeFr || '—'}</div>
      <div className="w-1/8">
        <div className="flex">
          <div>{count}</div>
          <button
            className={cn(styles.decButton, 'text-grey ml-3')}
            onClick={decreaseNumber}
          >
            <DecIcon />
          </button>
          <button
            className={cn(styles.incButton, 'text-grey')}
            onClick={increaseNumber}
          >
            <IncIcon />
          </button>
        </div>
      </div>
      <div className="w-1/8">{getPriceString(variantEn.price)}</div>
      <div className="w-1/8">
        <button
          className={cn(
            styles.deleteButton,
            // 'hover:text-grey transition-colors'
            'text-grey'
          )}
          onClick={deleteVariant}
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  )
}

const TotalHeader = () => {
  const { lang } = useTranslation('common')
  return (
    <div className="pt-2 my-grid mobile:text-grey">
      <div className="w-6/8 mobile:w-4/8" />
      <div className={cn('w-1/16 text-ts1B mobile:w-4/8', enOnly(lang))}>
        Total
      </div>
      <div className={cn('w-1/16 text-ts1B mobile:w-4/8', frOnly(lang))}>
        Totale
      </div>
    </div>
  )
}
const Total = ({ total }) => {
  return (
    <div className="pt-2 pb-20 border-b-2 border-white mobile:pt-5 mobile:pb-10 mobile:border-b-0 my-grid">
      <div className="w-6/8 mobile:w-4/8" />
      <div className="w-2/8 text-ts2 mobile:text-ts3B mobile:w-4/8">
        {getPriceString(total)}
      </div>
    </div>
  )
}

const Checkout = ({ handleCheckout }) => {
  return (
    <div className="pt-2 my-grid">
      <div className="w-4/8" />
      <div className="w-2/8">
        <div className="text-ts1B">
          Shipping & taxes
          <br />
          calculated at checkout
        </div>
        <button onClick={handleCheckout} className="mt-8 text-ts2">
          Checkout
        </button>
      </div>
      <div className="w-2/8">
        <div className="text-ts1B">
          Expédition et taxes
          <br />
          calculé à la caisse
        </div>
        <button onClick={handleCheckout} className="mt-8 text-ts2">
          Passer à la caisse
        </button>
      </div>
    </div>
  )
}

const CartHeader = () => {
  const { lang } = useTranslation('common')
  return (
    <div className="pt-3 mb-1 my-grid text-ts1B mobile:pt-2">
      <div className={cn('w-1/8 mobile:w-4/8 mobile:text-grey', enOnly(lang))}>
        <div className="pb-8">Item</div>
      </div>
      <div className={cn('w-1/8 mobile:w-4/8 mobile:text-grey', frOnly(lang))}>
        <div className={cn('pb-8 relative', styles.leftBorder)}>Article</div>
      </div>
      <div className="w-1/16 mobile:hidden">
        <div className={cn('pb-8 relative', styles.leftBorder)}>Colour</div>
      </div>
      <div className="w-1/8 mobile:hidden">
        <div className={cn('pb-8 relative', styles.leftBorder)}>Couleur</div>
      </div>
      <div className="w-1/16 mobile:hidden">
        <div className={cn('pb-8 relative', styles.leftBorder)}>Size</div>
      </div>
      <div className="w-1/8 mobile:hidden">
        <div className={cn('pb-8 relative', styles.leftBorder)}>Grandeur</div>
      </div>
      <div
        className={cn(
          'w-1/16 mobile:order-2 mobile:w-2/8 mobile:text-grey',
          enOnly(lang)
        )}
      >
        <div className={cn('pb-8 relative', styles.leftBorder)}>Qty</div>
      </div>
      <div
        className={cn(
          'w-1/16 mobile:order-2 mobile:w-2/8 mobile:text-grey',
          frOnly(lang)
        )}
      >
        <div className="relative pb-8">Qté</div>
      </div>
      <div
        className={cn(
          'w-1/16 mobile:order-1 mobile:w-2/8 mobile:text-grey',
          enOnly(lang)
        )}
      >
        <div className={cn('pb-8 relative', styles.leftBorder)}>Price</div>
      </div>
      <div
        className={cn(
          'w-1/16 mobile:order-1 mobile:w-2/8 mobile:text-grey',
          frOnly(lang)
        )}
      >
        <div className="relative pb-8">Prix</div>
      </div>
    </div>
  )
}

const Products = ({ cart, setCart, productMap }) => {
  return (
    <div className="border-b-2 border-white mobile:border-b-1 pb-15">
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
                cart={cart}
                setCart={setCart}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

const getProductMap = (products) => () =>
  products.reduce(
    (map, product) => ({
      ...map,
      [product.en.id]: product,
    }),
    {}
  )

const getCartTotal = (cart, productMap) =>
  Object.keys(cart).reduce((total, productKey) => {
    const product = productMap[productKey]
    const variants = cart[productKey]
    return (
      total +
      variants.reduce(
        (productTotal, { count, variantId }) =>
          productTotal +
          count *
            parseInt(product.en.variants.find((v) => v.id === variantId).price),
        0
      )
    )
  }, 0)

const getLineItems = (cart) =>
  Object.values(cart).flatMap((variants) =>
    variants.map(({ variantId, count }) => ({
      variantId,
      quantity: count,
    }))
  )

const checkout = (lineItems) =>
  fetch('/api/checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ lineItems }),
  })
    .then((response) => response.json())
    .then(({ url }) => {
      window.open(url, '_blank')
    })
    .catch((err) => {
      console.log('ERROR', err)
    })

const Cart = ({ commonData, products }) => {
  const [cart, setCart] = useCart()

  const productMap = useMemo(() => getProductMap(products), [products])

  const cartTotal = useMemo(() => getCartTotal(cart, productMap), [
    cart,
    productMap,
  ])

  const handleCheckout = useCallback(() => {
    checkout(getLineItems(cart))
  }, [cart])

  return (
    <Layout {...commonData}>
      <div className={cn('mobile:border-t-1 mobile:border-white', styles.cart)}>
        <CartHeader />
        <Products cart={cart} setCart={setCart} productMap={productMap} />
        <TotalHeader />
        <Total total={cartTotal} />
        <Checkout handleCheckout={handleCheckout} />
      </div>
    </Layout>
  )
}

export default Cart
