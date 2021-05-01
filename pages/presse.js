import { Press } from '@/components'
import { getPressPage } from '@/lib/contentful'
import { withCommonData } from '@/lib/utils'

export const getStaticProps = async (context) => {
  const { commonData, data } = await withCommonData(getPressPage)(context)
  return {
    props: {
      commonData,
      data,
    },
    revalidate: 10,
  }
}

const PressPage = ({ commonData, data }) => {
  return <Press commonData={commonData} data={data} />
}

export default PressPage
