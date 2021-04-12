import { Layout } from '@/components'
import { withCommonData } from '@/lib/utils'

export const getStaticProps = async (context) => {
  const { commonData } = await withCommonData()(context)
  return {
    props: {
      commonData,
    },
  }
}

const NotFoundPage = ({ commonData }) => {
  return (
    <Layout {...commonData}>
      <h1 className="text-head-wide-40">404</h1>
    </Layout>
  )
}

export default NotFoundPage
