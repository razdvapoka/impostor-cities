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

const ProjectPage = ({ commonData, data, setIsHeaderOpen, isHeaderOpen }) => {
  return (
    <Project
      commonData={commonData}
      data={data}
      setIsHeaderOpen={setIsHeaderOpen}
      isHeaderOpen={isHeaderOpen}
    />
  )
}

export default ProjectPage
