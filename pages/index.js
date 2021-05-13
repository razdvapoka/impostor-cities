import { Layout, VideoGrid } from '@/components'
import { getVideos } from '@/lib/contentful'
import { withCommonData } from '@/lib/utils'

export const getStaticProps = async (context) => {
  const { commonData, data: videos } = await withCommonData(getVideos)(context)
  return {
    props: {
      commonData,
      videos,
    },
    revalidate: 10,
  }
}

const HomePage = ({ commonData, videos }) => {
  return (
    <Layout {...commonData}>
      <VideoGrid videos={videos} />
    </Layout>
  )
}

export default HomePage
