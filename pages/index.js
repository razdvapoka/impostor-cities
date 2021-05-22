import { useCallback, useEffect, useState } from 'react'
import { HeadphonesAlert, Layout, VideoGrid } from '@/components'
import { getVideos } from '@/lib/contentful'
import { withCommonData } from '@/lib/utils'
import { useUserInteraction } from '@/contexts/user-interaction'

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
  const [userInteraction] = useUserInteraction()
  const [pageHasFocus, setPageHasFocus] = useState(true)
  const handlePageLostFocus = useCallback(() => {
    setPageHasFocus(false)
  }, [setPageHasFocus])
  const handlePageGotFocus = useCallback(() => {
    setPageHasFocus(true)
  }, [setPageHasFocus])
  useEffect(() => {
    window.addEventListener('blur', handlePageLostFocus)
    window.addEventListener('focus', handlePageGotFocus)
    return () => {
      window.removeEventListener('blur', handlePageLostFocus)
      window.removeEventListener('focus', handlePageGotFocus)
    }
  }, [])
  return (
    <Layout {...commonData}>
      <VideoGrid
        videos={videos}
        hasUserInteraction={userInteraction}
        pageHasFocus={pageHasFocus}
      />
      {!userInteraction && <HeadphonesAlert />}
    </Layout>
  )
}

export default HomePage
