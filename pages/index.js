import { Layout } from '@/components'
import useTranslation from 'next-translate/useTranslation'
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

const VideoItem = ({ src, poster }) => {
  return (
    <div className="w-2/6 mb-1">
      <div className="aspect-w-16 aspect-h-9">
        <video src={src} poster={poster} autoPlay playsInline loop />
      </div>
    </div>
  )
}

const repeat = (item, count) => {
  const result = []
  for (let i = 0; i < count; i++) {
    result.push(item)
  }
  return result
}

const HomePage = ({ commonData, videos }) => {
  // const { t } = useTranslation('common')
  const fakeVideos = repeat(videos[0], 9)
  return (
    <Layout {...commonData}>
      <div className="my-grid py-20">
        {fakeVideos.map((video) => (
          <VideoItem
            key={video.sys.id}
            src={video.vimeoUrl}
            poster={video.vimeoPosterUrl}
          />
        ))}
      </div>
    </Layout>
  )
}

export default HomePage
