import { useCallback, useEffect, useState } from 'react'
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
  const [hasUserInteraction, setHasUserInteraction] = useState(false)
  const [pageHasFocus, setPageHasFocus] = useState(true)
  const handleClick = useCallback(() => {
    if (!hasUserInteraction) {
      setHasUserInteraction(true)
    }
  }, [hasUserInteraction, setHasUserInteraction])
  const handlePageLostFocus = useCallback(() => {
    setPageHasFocus(false)
  }, [setPageHasFocus])
  const handlePageGotFocus = useCallback(() => {
    setPageHasFocus(true)
  }, [setPageHasFocus])
  useEffect(() => {
    window.addEventListener('click', handleClick)
    window.addEventListener('blur', handlePageLostFocus)
    window.addEventListener('focus', handlePageGotFocus)
    return () => {
      window.removeEventListener('click', handleClick)
      window.removeEventListener('blur', handlePageLostFocus)
      window.removeEventListener('focus', handlePageGotFocus)
    }
  }, [])
  return (
    <Layout {...commonData}>
      <VideoGrid
        videos={videos}
        hasUserInteraction={hasUserInteraction}
        pageHasFocus={pageHasFocus}
      />
    </Layout>
  )
}

export default HomePage
