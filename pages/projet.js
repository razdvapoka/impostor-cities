import { Project } from '@/components'
import { getProjectPage } from '@/lib/contentful'
import { withCommonData } from '@/lib/utils'

export const getStaticProps = async (context) => {
  const { commonData, data } = await withCommonData(getProjectPage)(context)
  return {
    props: {
      commonData,
      data,
    },
    revalidate: 10,
  }
}

const ProjectPage = ({ commonData, data }) => {
  return <Project commonData={commonData} data={data} />
}

export default ProjectPage
