import useTranslation from 'next-translate/useTranslation'
import { useEffect, useCallback, useMemo, useState } from 'react'
import { useAsync } from 'react-use'
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
import DeleteMIcon from '../../../assets/icons/delete-m.svg'
import IncMIcon from '../../../assets/icons/inc-m.svg'
import DecMIcon from '../../../assets/icons/dec-m.svg'

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
  const { lang } = useTranslation('common')
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
      <div className={cn('w-1/8 mobile:w-4/8', enOnly(lang))}>
        <div className="flex justify-between">
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: product.en.title.replace(' — ', '<br/>'),
              }}
            />
            {colorEn && <div className="hidden mobile:block">{colorEn}</div>}
            {sizeEn && <div className="hidden mobile:block">{sizeEn}</div>}
          </div>
          <button
            className={cn(
              styles.deleteMButton,
              'text-grey mr-2 hidden mobile:block'
            )}
            onClick={deleteVariant}
          >
            <DeleteMIcon />
          </button>
        </div>
      </div>
      <div className={cn('w-1/8 mobile:w-4/8', frOnly(lang))}>
        <div className="flex justify-between">
          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: product.fr.title.replace(' — ', '<br/>'),
              }}
            />
            {colorFr && <div className="hidden mobile:block">{colorFr}</div>}
            {sizeFr && <div className="hidden mobile:block">{sizeFr}</div>}
          </div>
          <button
            className={cn(
              styles.deleteMButton,
              'text-grey mr-2 hidden mobile:block'
            )}
            onClick={deleteVariant}
          >
            <DeleteMIcon />
          </button>
        </div>
      </div>
      <div className={cn('w-1/16 mobile:hidden')}>{colorEn || '—'}</div>
      <div className={cn('w-1/8 mobile:hidden')}>{colorFr || '—'}</div>
      <div className={cn('w-1/16 mobile:hidden')}>{sizeEn || '—'}</div>
      <div className={cn('w-1/8 mobile:hidden')}>{sizeFr || '—'}</div>
      <div className="w-1/8 mobile:order-2 mobile:w-2/8">
        <div className="flex mobile:justify-between">
          <div>{count}</div>
          <div className="ml-3 mobile:hidden">
            <button
              className={cn(styles.decButton, 'text-grey')}
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
          <div className="hidden ml-3 mobile:flex">
            <button
              className={cn(styles.decMButton, 'text-grey')}
              onClick={decreaseNumber}
            >
              <DecMIcon />
            </button>
            <button
              className={cn(styles.incMButton, 'text-grey')}
              onClick={increaseNumber}
            >
              <IncMIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="w-1/8 mobile:hidden">
        {getPriceString(variantEn.price)}
      </div>
      <div className="order-1 hidden mobile:block w-2/8">
        {`$${parseInt(variantEn.price)}`}
      </div>
      <div className="w-1/8 mobile:hidden">
        <button
          className={cn(styles.deleteButton, 'text-grey')}
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
    <div className="pt-2 pb-20 border-b-2 border-white mobile:pt-5 mobile:pb-8 mobile:border-b-0 my-grid">
      <div className="w-6/8 mobile:w-4/8" />
      <div className="w-2/8 text-ts2 mobile:text-ts3B mobile:w-4/8">
        {getPriceString(total)}
      </div>
    </div>
  )
}

const Checkout = ({ isCheckoutAvailable, checkout }) => {
  const { t, lang } = useTranslation('common')
  return (
    <>
      <div className="pt-2 my-grid mobile:text-grey mobile:pb-1">
        <div className="w-4/8" />
        <div className={cn('w-2/8 mobile:w-4/8', enOnly(lang))}>
          <div className="mb-8 text-ts1B">
            Shipping & taxes
            <br />
            calculated at checkout
          </div>
          <a
            href={checkout?.url}
            target="_blank"
            rel="noreferrer"
            className={cn(
              'text-ts2 mobile:hidden hover:text-grey transition-colors',
              { 'pointer-events-none': !isCheckoutAvailable }
            )}
          >
            Checkout
          </a>
        </div>
        <div className={cn('w-2/8 mobile:w-4/8', frOnly(lang))}>
          <div className="mb-8 text-ts1B">
            Expédition et taxes
            <br />
            calculé à la caisse
          </div>
          <a
            href={checkout?.url}
            target="_blank"
            rel="noreferrer"
            className={cn(
              'text-ts2 mobile:hidden hover:text-grey transition-colors',
              { 'pointer-events-none': !isCheckoutAvailable }
            )}
          >
            Passer à la caisse
          </a>
        </div>
      </div>
      <div className="hidden mobile:block mobile:border-t-1 mobile:border-white ">
        <div className="pt-2 my-grid">
          <div className="w-4/8">
            <a
              href={checkout?.url}
              target="_blank"
              rel="noreferrer"
              className={cn('text-left text-tsC', {
                'pointer-events-none': !isCheckoutAvailable,
              })}
            >
              {t('checkout')}
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

const CartHeader = () => {
  const { lang } = useTranslation('common')
  return (
    <div className="pt-3 mb-1 my-grid text-ts1B mobile:pt-2">
      <div className={cn('w-1/8 mobile:w-4/8 mobile:text-grey', enOnly(lang))}>
        <div className="pb-8 mobile:pb-2">Item</div>
      </div>
      <div className={cn('w-1/8 mobile:w-4/8 mobile:text-grey', frOnly(lang))}>
        <div className={cn('pb-8 relative mobile:pb-2', styles.leftBorder)}>
          Article
        </div>
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
        <div className={cn('pb-8 relative mobile:pb-2', styles.leftBorder)}>
          Qty
        </div>
      </div>
      <div
        className={cn(
          'w-1/16 mobile:order-2 mobile:w-2/8 mobile:text-grey',
          frOnly(lang)
        )}
      >
        <div className="relative pb-8 mobile:pb-2">Qté</div>
      </div>
      <div
        className={cn(
          'w-1/16 mobile:order-1 mobile:w-2/8 mobile:text-grey',
          enOnly(lang)
        )}
      >
        <div className={cn('pb-8 relative mobile:pb-2', styles.leftBorder)}>
          Price
        </div>
      </div>
      <div
        className={cn(
          'w-1/16 mobile:order-1 mobile:w-2/8 mobile:text-grey',
          frOnly(lang)
        )}
      >
        <div className="relative pb-8 mobile:pb-2">Prix</div>
      </div>
    </div>
  )
}

const Products = ({ cart, setCart, productMap }) => {
  return (
    <div
      className={`
      border-b-2 border-white
      mobile:border-b-1 mobile:border-t-1
      pb-15 mobile:pt-2 mobile:pb-4`}
    >
      {Object.keys(cart).map((key) => {
        const product = productMap[key]
        const selectedVariants = cart[key]
        return (
          <div className="space-y-2" key={key}>
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

const getProductMap = (products) =>
  products.reduce(
    (map, product) => ({
      ...map,
      [product.en.id]: product,
    }),
    {}
  )

const getCartTotal = (cart, productMap) => {
  return Object.keys(cart).reduce((total, productKey) => {
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
}

const getLineItems = (cart) =>
  Object.values(cart).flatMap((variants) =>
    variants.map(({ variantId, count }) => ({
      variantId,
      quantity: count,
    }))
  )

const createCheckout = (lineItems) =>
  fetch('/api/create-checkout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ lineItems }),
  })
    .then((response) => response.json())
    .catch((err) => {
      console.log('ERROR', err)
      return null
    })

const replaceLineItems = (checkoutId, lineItems) =>
  fetch('/api/replace-checkout-items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ checkoutId, lineItems }),
  }).catch((err) => {
    console.log('ERROR', err)
  })

const Cart = ({ commonData, products }) => {
  const [cart, setCart] = useCart()
  const [checkout, setCheckout] = useState(null)
  const [isCheckoutAvailable, setIsCheckoutAvailable] = useState(false)

  useAsync(async () => {
    setIsCheckoutAvailable(false)
    const lineItems = getLineItems(cart)
    if (checkout) {
      await replaceLineItems(checkout.id, lineItems)
    } else {
      const newCheckout = await createCheckout(lineItems)
      setCheckout(newCheckout)
    }
    setIsCheckoutAvailable(true)
  }, [checkout, cart])

  const productMap = useMemo(() => getProductMap(products), [products])

  const cartTotal = useMemo(() => getCartTotal(cart, productMap), [
    cart,
    productMap,
  ])

  return (
    <Layout {...commonData}>
      <div className={cn('mobile:border-t-1 mobile:border-white', styles.cart)}>
        <CartHeader />
        <Products cart={cart} setCart={setCart} productMap={productMap} />
        <TotalHeader />
        <Total total={cartTotal} />
        <Checkout
          isCheckoutAvailable={isCheckoutAvailable && cartTotal > 0}
          checkout={checkout}
        />
      </div>
    </Layout>
  )
}

export default Cart
