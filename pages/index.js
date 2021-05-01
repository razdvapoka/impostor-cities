import { Typograph, Layout } from '@/components'
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
    revalidate: 10,
  }
}

const HomePage = ({ commonData, page }) => {
  const { t } = useTranslation('common')
  return (
    <Layout {...commonData}>
      <h1 className="mb-6 text-ts1">{t('test')}</h1>
      <div className="desktop:w-1/3">
        <Typograph>{page.description}</Typograph>
      </div>
    </Layout>
  )
}

export default HomePage
