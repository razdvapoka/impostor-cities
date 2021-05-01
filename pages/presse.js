import { Typograph, Layout, Image } from '@/components'
import { getMainPage } from '@/lib/contentful'
import { withCommonData } from '@/lib/utils'

export const getStaticProps = async (context) => {
  const { commonData } = await withCommonData()(context)
  return {
    props: {
      commonData,
    },
    revalidate: 10,
  }
}

const PressPage = ({ commonData }) => {
  return (
    <Layout {...commonData}>
      <h1 className="mb-6 text-reg-head">PRESSE</h1>
    </Layout>
  )
}

export default PressPage
