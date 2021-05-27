import { useMemo, useState, useRef, useCallback } from 'react'
import { useBreakpoint } from '@/lib/hooks'
import Arrow from '../../../assets/icons/slider-arrow.svg'
import { useToggle, useMouse, useAsync, useMeasure } from 'react-use'
import { Layout } from '@/components'
import Image from 'next/image'
import { useEmblaCarousel } from 'embla-carousel/react'
import cn from 'classnames'
import styles from './styles.module.scss'
import { hasVariants, getSizeOption, enOnly, frOnly } from '@/lib/utils'
import { useCart } from '@/contexts/cart'
import getT from 'next-translate/getT'
import useTranslation from 'next-translate/useTranslation'
import { ProductCard } from '@/components/pages/shop'

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
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const scrollNext = () => {
    if (emblaApi.canScrollNext()) {
      emblaApi.scrollNext()
      const slideCount = emblaApi.slideNodes().length
      setCurrentSlideIndex((currentSlideIndex + 1) % slideCount)
    }
  }
  const scrollPrev = () => {
    if (emblaApi.canScrollPrev()) {
      emblaApi.scrollPrev()
      const slideCount = emblaApi.slideNodes().length
      setCurrentSlideIndex(
        currentSlideIndex - 1 < 0 ? slideCount - 1 : currentSlideIndex - 1
      )
    }
  }

  const isPrevDisabled = emblaApi ? !emblaApi.canScrollPrev() : false
  const isNextDisabled = emblaApi ? !emblaApi.canScrollNext() : false

  return (
    <div className="relative">
      <div className={cn('overlay z-10 mobile:hidden', styles.overlay)}>
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

const ProductDescription = ({ descriptionHtml, t }) => {
  const [isOpen, toggleOpen] = useToggle(false)
  const [ref, { height }] = useMeasure()
  return (
    <div>
      <button
        className={cn(
          `mt-8 text-ts3B pointer-events-none
           mobile:pointer-events-auto mobile:mt-0 mobile:text-ts2 mobile:transition-colors`,
          {
            'mobile:text-grey': isOpen,
          }
        )}
        onClick={toggleOpen}
      >
        {t('description')}
        <span
          className={cn(
            'hidden mobile:inline-block transition-opacity',
            styles.arrow,
            { 'opacity-0': isOpen }
          )}
        >
          <Arrow />
        </span>
      </button>
      <div
        className={cn(
          'overflow-hidden hidden mobile:block',
          styles.description
        )}
        style={{ height: isOpen ? height : 0 }}
      >
        <div ref={ref}>
          <div
            className="pt-3 text-ts3"
            dangerouslySetInnerHTML={{ __html: descriptionHtml }}
          />
        </div>
      </div>
      <div
        className="text-ts3 mobile:hidden"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
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
  const priceString = `$${parseInt(price)} CDN`
  const { value: t } = useAsync(async () => {
    const tr = await getT(locale, 'common')
    return tr
  }, [])
  const variantsExist = hasVariants(variants)
  return (
    <div className="pt-2 border-t-2 border-white border-solid mobile:border-t-1 ">
      <div
        className="text-ts2"
        dangerouslySetInnerHTML={{ __html: title.replace(' — ', '<br/>') }}
      />
      <div className="text-ts2">{priceString}</div>
      {t && (
        <div>
          {variantsExist && (
            <div>
              <div className="mt-3 text-ts1B mobile:hidden">
                {t('selectSize')}
              </div>
              <div className="mt-1 space-x-4 mobile:mt-0">
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
          <ProductDescription t={t} descriptionHtml={descriptionHtml} />
        </div>
      )}
    </div>
  )
}

const ProductButtons = ({
  addVariantToCart,
  locale,
  disabled,
  isAvailable,
  isComingSoon,
}) => {
  const { value: t } = useAsync(async () => {
    const tr = await getT(locale, 'common')
    return tr
  }, [])
  return (
    <div className="pt-2 border-t-2 border-white border-solid mobile:border-t-1 mobile:my-6">
      {t && (
        <div>
          <button
            className="text-ts2 hover:text-grey transition-colors disabled:pointer-events-none"
            onClick={addVariantToCart}
            disabled={disabled || !isAvailable || isComingSoon}
          >
            {isComingSoon
              ? t('comingSoon')
              : !isAvailable
              ? t('soldOut')
              : t('addToCart')}
          </button>
        </div>
      )}
    </div>
  )
}

const Product = ({ commonData, product, products }) => {
  const otherProducts = useMemo(
    () => products.filter((p) => p.en.id !== product.en.id),
    [products, product]
  )
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === 'MOBILE'
  const { lang } = useTranslation('common')
  const { en, fr } = product
  const productId = en.id
  const isComingSoon = en.tags.indexOf('comingsoon') !== -1
  const variantsExist = hasVariants(en.variants)
  const isAvailable = variantsExist
    ? en.variants.some((v) => v.available)
    : en.variants[0].available
  const [selectedVariantId, setSelectedVariantId] = useState(
    variantsExist ? null : en.variants[0].id
  )
  const [cart, setCart] = useCart()

  const addVariantToCart = useCallback(() => {
    const variant = { count: 1, variantId: selectedVariantId }
    const addedProductVariants = cart[productId]
    const variantIndex = addedProductVariants
      ? addedProductVariants.findIndex((v) => v.variantId === selectedVariantId)
      : -1
    if (variantIndex !== -1) {
      variant.count = addedProductVariants[variantIndex].count + 1
    }
    setCart({
      ...cart,
      [productId]: addedProductVariants
        ? variantIndex === -1
          ? [...addedProductVariants, variant]
          : [
              ...addedProductVariants.slice(0, variantIndex),
              variant,
              ...addedProductVariants.slice(variantIndex + 1),
            ]
        : [variant],
    })

    setSelectedVariantId(variantsExist ? null : en.variants[0].id)
  }, [cart, setCart, product, selectedVariantId])

  const { t } = useTranslation('common')

  return (
    <Layout {...commonData}>
      <div className="mt-22 my-grid mobile:mt-13">
        <div className="w-4/8 mobile:w-full mobile:order-3">
          {en.images.length > 1 ? (
            <Slider>
              {en.images.map((image, imageIndex) => (
                <div key={imageIndex} className="embla__slide">
                  <Image
                    layout="responsive"
                    width={600}
                    height={600}
                    sizes="(max-width: 750px) 100vw, 50vw"
                    src={image.src}
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <div className="aspect-w-1 aspect-h-1">
              <Image layout="fill" src={en.images[0].src} />
            </div>
          )}
        </div>
        <div className={cn('w-2/8 mobile:w-full mobile:order-1', enOnly(lang))}>
          <ProductInfo
            locale="en"
            selectedVariantId={selectedVariantId}
            setSelectedVariantId={setSelectedVariantId}
            {...en}
          />
        </div>
        <div className={cn('w-2/8 mobile:w-full mobile:order-1', frOnly(lang))}>
          <ProductInfo
            locale="fr"
            selectedVariantId={selectedVariantId}
            setSelectedVariantId={setSelectedVariantId}
            {...fr}
          />
        </div>
        <div className="fixed bottom-0 left-0 w-screen px-1 mobile:static mobile:w-full mobile:px-0 mobile:order-2">
          <div className="my-grid">
            <div className="w-4/8 mobile:hidden" />
            <div className={cn('w-2/8 mobile:w-full', enOnly(lang))}>
              <ProductButtons
                addVariantToCart={addVariantToCart}
                disabled={selectedVariantId === null}
                locale="en"
                isAvailable={isAvailable}
                isComingSoon={isComingSoon}
              />
            </div>
            <div className={cn('w-2/8 mobile:w-full', frOnly(lang))}>
              <ProductButtons
                addVariantToCart={addVariantToCart}
                disabled={selectedVariantId === null}
                locale="fr"
                isAvailable={isAvailable}
                isComingSoon={isComingSoon}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hidden pt-1 mt-2 border-white border-solid mobile:block border-t-1">
        <div className="text-ts3B">{t('otherItems')}</div>
        <div className="mt-12 my-grid">
          {otherProducts.map((p, productIndex) => (
            <div key={productIndex} className="w-4/8">
              <ProductCard {...p} isMobile={isMobile} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Product
