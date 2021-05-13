import { useCallback, useEffect, useState, useMemo } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { arrayShuffle } from '@adriantombu/array-shuffle'
import { VideoItem } from '@/components'
import { VIDEO_BLOCK_TYPE } from '@/consts'
import styles from './styles.module.scss'

const groupVideosById = (videos, blockId) => {
  return videos.reduce((map, video) => {
    const isBlock = video.__typename === VIDEO_BLOCK_TYPE
    return isBlock
      ? {
          ...map,
          ...groupVideosById(video.itemsCollection.items, video.sys.id),
        }
      : {
          ...map,
          [video.sys.id]: { ...video, blockId },
        }
  }, {})
}

const randomItem = (array) => array[Math.floor(Math.random() * array.length)]

const VideoGrid = ({ videos, hasUserInteraction, pageHasFocus }) => {
  const videoMap = useMemo(() => groupVideosById(videos), [videos])
  const [unmutedVideoIndex, setUnmutedVideoIndex] = useState(null)
  const [currentVideos, setCurrentVideos] = useState([])

  useEffect(() => {
    setCurrentVideos(
      arrayShuffle(Object.values(videoMap).filter((video) => !video.blockId))
    )
  }, [videoMap])

  const switchToNextVideo = useCallback(
    (index) => {
      const nextVideo = randomItem(
        Object.values(videoMap).filter(
          (v) => !currentVideos.find((cv) => cv.sys.id === v.sys.id)
        )
      )
      setCurrentVideos([
        ...currentVideos.slice(0, index),
        nextVideo,
        ...currentVideos.slice(index + 1),
      ])
    },
    [currentVideos, setCurrentVideos, videoMap]
  )

  return (
    <div className="py-20 my-grid">
      {currentVideos.slice(0, 9).map((video, videoIndex) => (
        <div className="w-2/6 mb-1" key={videoIndex}>
          <TransitionGroup className="aspect-w-16 aspect-h-9 overflow-hidden">
            <CSSTransition
              key={video.sys.id}
              timeout={1000}
              classNames={{ ...styles }}
            >
              <div>
                <VideoItem
                  key={video.sys.id}
                  id={video.sys.id}
                  index={videoIndex}
                  unmutedVideoIndex={unmutedVideoIndex}
                  setUnmutedVideoIndex={setUnmutedVideoIndex}
                  hasUserInteraction={hasUserInteraction}
                  pageHasFocus={pageHasFocus}
                  switchToNextVideo={switchToNextVideo}
                  {...video}
                />
              </div>
            </CSSTransition>
          </TransitionGroup>
        </div>
      ))}
    </div>
  )
}

export default VideoGrid
