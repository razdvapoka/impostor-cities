import useTranslation from 'next-translate/useTranslation'
import getT from 'next-translate/getT'
import { useAsync } from 'react-use'
import { Layout } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { repeat, getSizeOption, hasVariants } from '@/lib/utils'
import cn from 'classnames'

const ProductInfo = ({
  title,
  price,
  variants,
  isAvailable,
  isComingSoon,
  locale,
}) => {
  const { value: t } = useAsync(async () => {
    const tr = await getT(locale, 'common')
    return tr
  }, [])
  return (
    <div>
      <div>{title}</div>
      <div>{price}</div>
      {isComingSoon && t && <div>{t('comingSoon')}</div>}
      {!isComingSoon && isAvailable && (
        <div className="flex space-x-2">
          {variants.map((variant, variantIndex) => (
            <span
              key={variantIndex}
              className={cn({ 'line-through': !variant.available })}
            >
              {getSizeOption(variant).value}
            </span>
          ))}
        </div>
      )}
      {!isComingSoon && !isAvailable && t && <div>{t('soldOut')}</div>}
    </div>
  )
}

const ProductCard = ({
  en: { images, title: titleEn, variants: variantsEn, handle, tags },
  fr: { title: titleFr, variants: variantsFr },
}) => {
  const isComingSoon = tags.indexOf('comingsoon') !== -1
  const { price } = variantsEn[0]
  const priceString = `$${price} CDN`
  const titlesDiffer = titleEn !== titleFr
  const { lang } = useTranslation('common')
  const productHref = `/${lang === 'fr' ? 'boutique' : 'shop'}/${handle}`
  const variantsExist = hasVariants(variantsEn)
  const isAvailable = variantsExist
    ? variantsEn.some((v) => v.available)
    : variantsEn[0].available

  return (
    <Link href={productHref}>
      <a className="block mb-9 hover:text-grey transition-colors">
        <div className="aspect-w-1 aspect-h-1">
          <Image layout="fill" src={images[0].src} />
        </div>
        <div className="flex pt-1 space-x-10 text-ts1B">
          <ProductInfo
            title={titleEn}
            price={priceString}
            variants={variantsEn}
            variantsExist={variantsExist}
            isAvailable={isAvailable}
            isComingSoon={isComingSoon}
            locale="en"
          />
          {titlesDiffer && (
            <ProductInfo
              title={titleFr}
              price={priceString}
              variants={variantsFr}
              variantsExist={variantsExist}
              isAvailable={isAvailable}
              isComingSoon={isComingSoon}
              locale="fr"
            />
          )}
        </div>
      </a>
    </Link>
  )
}

const Shop = ({ commonData, products }) => {
  const fakeProducts = repeat(products, 5).flat()
  return (
    <Layout {...commonData}>
      <div className="mt-22 my-grid mobile:mt-0">
        {/* fakeProducts.map((product, productIndex) => (
          <div key={productIndex} className="w-2/8">
            <ProductCard {...product} />
          </div>
        )) */}
      </div>
    </Layout>
  )
}

export default Shop
