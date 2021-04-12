import { Typograph, Layout, Image } from '@/components'
import useTranslation from 'next-translate/useTranslation'
import { getMainPage } from '@/lib/contentful'
import { withCommonData } from '@/lib/utils'

export const getStaticProps = async (context) => {
  const { commonData, data: page } = await withCommonData(getMainPage)(context)
  return {
    props: {
      commonData,
      page,
    },
  }
}

const HomePage = ({ commonData, page }) => {
  const { t } = useTranslation('common')
  const images = page.galleryCollection.items
  return (
    <Layout {...commonData}>
      <h1 className="mb-6 text-reg-head">{t('test')}</h1>
      <div className="desktop:w-1/3">
        <Typograph>{page.description}</Typograph>
      </div>
      <div className="flex flex-col desktop:flex-row items-start flex-wrap mt-5">
        {images.map((item) => {
          return (
            <div className="w-full p-2 desktop:w-1/4" key={item.url}>
              <Image src={item.url} width={item.width} height={item.height} />
            </div>
          )
        })}
      </div>
    </Layout>
  )
}

export default HomePage
