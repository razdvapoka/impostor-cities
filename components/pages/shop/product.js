import { useState, useRef, useCallback } from 'react'
import { useMouse, useAsync } from 'react-use'
import { Layout } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { useEmblaCarousel } from 'embla-carousel/react'
import cn from 'classnames'
import styles from './styles.module.scss'
import { hasVariants, getSizeOption } from '@/lib/utils'
import { useCart } from '@/contexts/cart'
import getT from 'next-translate/getT'

const OverlayButton = ({ disabled, handleClick, className, isReversed }) => {
  const ref = useRef(null)
  const { elX, elY } = useMouse(ref, { whenHovered: true })
  return (
    <button
      ref={ref}
      className={cn(
        'absolute top-0 h-full w-1/2 border-none bg-none',
        styles.overlayButton,
        className
      )}
      onClick={handleClick}
      disabled={disabled}
    >
      <div
        className={cn(styles.overlayButtonCursor, 'absolute')}
        style={{
          left: elX,
          top: elY,
          transform: `translate(-50%, -50%) scale(${
            isReversed ? '-1' : '1'
          }, 1)`,
        }}
      />
    </button>
  )
}

const Slider = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const scrollNext = () => {
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext()
      setCurrentSlideIndex(currentSlideIndex + 1)
    }
  }
  const scrollPrev = () => {
    if (emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev()
      setCurrentSlideIndex(currentSlideIndex - 1)
    }
  }

  const isPrevDisabled = emblaApi ? !emblaApi.canScrollPrev() : false
  const isNextDisabled = emblaApi ? !emblaApi.canScrollNext() : false

  return (
    <div className="relative">
      <div className={cn('overlay z-10', styles.overlay)}>
        <OverlayButton
          disabled={isPrevDisabled}
          handleClick={scrollPrev}
          className="left-0"
          isReversed
        />
        <OverlayButton
          disabled={isNextDisabled}
          handleClick={scrollNext}
          className="right-0"
        />
      </div>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container">{children}</div>
      </div>
    </div>
  )
}
const ProductInfo = ({
  title,
  variants,
  locale,
  descriptionHtml,
  selectedVariantId,
  setSelectedVariantId,
}) => {
  const { price } = variants[0]
  const priceString = `$${price} CDN`
  const { value: t } = useAsync(async () => {
    const tr = await getT(locale, 'common')
    return tr
  }, [])
  const variantsExist = hasVariants(variants)
  return (
    <div className="pt-2 border-t-2 border-white border-solid ">
      <div className="text-ts2">{title}</div>
      <div className="text-ts2">{priceString}</div>
      {t && (
        <div>
          {variantsExist && (
            <div>
              <div className="mt-3 text-ts3B">{t('selectSize')}</div>
              <div className="mt-1 space-x-4">
                {variants.map((variant, variantIndex) => (
                  <button
                    key={variantIndex}
                    className={cn(
                      `text-ts2
                       disabled:pointer-events-none disabled:line-through
                       hover:text-grey transition-colors`,
                      { 'text-grey': variant.id === selectedVariantId }
                    )}
                    disabled={!variant.available}
                    onClick={() => {
                      setSelectedVariantId(
                        variant.id === selectedVariantId ? null : variant.id
                      )
                    }}
                  >
                    {getSizeOption(variant).value}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="mt-8 text-ts3B">{t('description')}</div>
          <div
            className="text-ts3"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
      )}
    </div>
  )
}

const ProductButtons = ({
  addVariantToCart,
  isVariantSelected,
  locale,
  disabled,
}) => {
  const { value: t } = useAsync(async () => {
    const tr = await getT(locale, 'common')
    return tr
  }, [])
  return (
    <div className="pt-2 border-t-2 border-white border-solid">
      {t && (
        <div>
          {isVariantSelected ? (
            <Link href={`/${t('cart')}`} locale={locale}>
              <a className="block text-ts2">{t('goToCart')}</a>
            </Link>
          ) : (
            <button
              className="text-ts2 hover:text-grey transition-colors disabled:pointer-events-none"
              onClick={addVariantToCart}
              disabled={disabled}
            >
              {t('addToCart')}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

const Product = ({ commonData, product }) => {
  const { en, fr } = product
  const productId = en.id
  const variantsExist = hasVariants(en.variants)
  const [selectedVariantId, setSelectedVariantId] = useState(
    variantsExist ? null : en.variants[0].id
  )
  const [cart, setCart] = useCart()

  console.log(cart)

  const isVariantSelected = cart.selected[productId]?.find(
    (vId) => vId === selectedVariantId
  )
  console.log(selectedVariantId, isVariantSelected)

  const addVariantToCart = useCallback(() => {
    setCart({
      ...cart,
      selected: {
        ...cart.selected,
        [productId]: cart.selected[productId]
          ? [...cart.selected[productId], selectedVariantId]
          : [selectedVariantId],
      },
    })
    setSelectedVariantId(variantsExist ? null : en.variants[0].id)
  }, [cart, setCart, product, selectedVariantId])

  return (
    <Layout {...commonData}>
      <div className="mt-22 my-grid">
        <div className="w-4/8">
          {en.images.length > 1 ? (
            <Slider>
              {en.images.map((image, imageIndex) => (
                <div key={imageIndex} className="embla__slide">
                  <div className="aspect-w-1 aspect-h-1">
                    <Image layout="fill" src={image.src} />
                  </div>
                </div>
              ))}
            </Slider>
          ) : (
            <div className="aspect-w-1 aspect-h-1">
              <Image layout="fill" src={en.images[0].src} />
            </div>
          )}
        </div>
        <div className="w-2/8">
          <ProductInfo
            locale="en"
            selectedVariantId={selectedVariantId}
            setSelectedVariantId={setSelectedVariantId}
            {...en}
          />
        </div>
        <div className="w-2/8">
          <ProductInfo
            locale="fr"
            selectedVariantId={selectedVariantId}
            setSelectedVariantId={setSelectedVariantId}
            {...fr}
          />
        </div>
        <div className="w-4/8" />
        <div className="w-2/8">
          <ProductButtons
            addVariantToCart={addVariantToCart}
            isVariantSelected={isVariantSelected}
            disabled={selectedVariantId === null}
            locale="en"
          />
        </div>
        <div className="w-2/8">
          <ProductButtons
            addVariantToCart={addVariantToCart}
            isVariantSelected={isVariantSelected}
            disabled={selectedVariantId === null}
            locale="fr"
          />
        </div>
      </div>
    </Layout>
  )
}

export default Product
