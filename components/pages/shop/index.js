import { Layout } from '@/components'
import Image from 'next/image'
import { repeat } from '@/lib/utils'

const ProductCard = ({
  en: { images, title: titleEn, variants },
  fr: { title: titleFr },
}) => {
  const { price } = variants[0]
  const priceString = `$${price} CDN`
  const titlesDiffer = titleEn !== titleFr
  return (
    <div className="mb-9">
      <div className="aspect-w-1 aspect-h-1">
        <Image layout="fill" src={images[0].src} />
      </div>
      <div className="flex pt-1 text-ts3B">
        <div>
          <div>{titleEn}</div>
          <div>{priceString}</div>
        </div>
        {titlesDiffer && (
          <div className="ml-10">
            <div>{titleFr}</div>
            <div>{priceString}</div>
          </div>
        )}
      </div>
    </div>
  )
}

const Shop = ({ commonData, products }) => {
  console.log(products)
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
