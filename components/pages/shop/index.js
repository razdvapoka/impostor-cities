import useTranslation from 'next-translate/useTranslation'
import { Layout } from '@/components'
import Image from 'next/image'
import Link from 'next/link'
import { repeat } from '@/lib/utils'

const ProductInfo = ({ title, price, options }) => {
  const hasOptions = options.length > 0 && options[0].name !== 'Title'
  return (
    <div>
      <div>{title}</div>
      <div>{price}</div>
      {hasOptions && (
        <div className="flex space-x-2">
          {options[0].values.map((option, optionIndex) => (
            <span key={optionIndex}>{option}</span>
          ))}
        </div>
      )}
    </div>
  )
}

const ProductCard = ({
  en: { images, title: titleEn, variants, options: optionsEn, handle },
  fr: { title: titleFr, options: optionsFr },
}) => {
  const { price } = variants[0]
  const priceString = `$${price} CDN`
  const titlesDiffer = titleEn !== titleFr
  const { lang } = useTranslation('common')
  const productHref = `/${lang === 'fr' ? 'boutique' : 'shop'}/${handle}`
  return (
    <Link href={productHref}>
      <a className="block mb-9 hover:text-grey transition-colors">
        <div className="aspect-w-1 aspect-h-1">
          <Image layout="fill" src={images[0].src} />
        </div>
        <div className="flex space-x-10 pt-1 text-ts3B">
          <ProductInfo
            title={titleEn}
            price={priceString}
            options={optionsEn}
          />
          {titlesDiffer && (
            <ProductInfo
              title={titleFr}
              price={priceString}
              options={optionsFr}
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
      <div className="mt-22 my-grid">
        {fakeProducts.map((product, productIndex) => (
          <div key={productIndex} className="w-2/8">
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default Shop
