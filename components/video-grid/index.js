import { useCallback, useEffect, useState, useMemo } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import { arrayShuffle } from '@adriantombu/array-shuffle'
import { VideoItem } from '@/components'
import { VIDEO_BLOCK_TYPE } from '@/consts'
import { insertAt } from '@/lib/utils'
import styles from './styles.module.scss'

const BLOCK_INDICIES = [
  [0, 1, 3, 4],
  [1, 2, 4, 5],
  [3, 4, 6, 7],
  [4, 5, 7, 8],
]

const groupVideosById = (videos, blockId, isTakeover, defaultVideoTime) => {
  return videos.reduce((map, video, videoIndex) => {
    const isBlock = video.__typename === VIDEO_BLOCK_TYPE
    return isBlock
      ? {
          ...map,
          ...groupVideosById(
            video.itemsCollection.items,
            video.sys.id,
            video.isTakeover,
            video.defaultVideoTime
          ),
        }
      : {
          ...map,
          [video.sys.id]: {
            ...video,
            blockId,
            isTakeover,
            indexInBlock: blockId ? videoIndex : null,
            blockCount: blockId ? videos.length : null,
            defaultVideoTime: defaultVideoTime || video.defaultVideoTime,
          },
        }
  }, {})
}

const randomItem = (array) => array[Math.floor(Math.random() * array.length)]

const VideoGrid = ({ videos, hasUserInteraction, pageHasFocus }) => {
  const videoMap = useMemo(() => groupVideosById(videos), [videos])
  const [unmutedVideoIndex, setUnmutedVideoIndex] = useState(null)
  const [currentVideos, setCurrentVideos] = useState([])
  const [takeover, setTakeover] = useState(null)
  const [syncBlocks, setSyncBlocks] = useState({})

  const setSyncBlock = (blockId, ref) => {
    setSyncBlocks((prevSyncBlocks) => ({
      ...prevSyncBlocks,
      [blockId]: ref,
    }))
  }

  useEffect(() => {
    setCurrentVideos(
      arrayShuffle(
        Object.values(videoMap).filter((video) => !video.blockId)
      ).slice(0, 9)
    )
  }, [videoMap])

  const switchToNextVideo = useCallback(
    (index) => {
      const prevVideo = currentVideos[index]
      const nextVideoCandidates = Object.values(videoMap).filter(
        (v) => !currentVideos.find((cv) => cv.sys.id === v.sys.id)
      )
      const nextVideo = randomItem(nextVideoCandidates)

      if (prevVideo.isTakeover) {
        const indiciesToReplace = []
        currentVideos.forEach((v, i) => {
          if (v.blockId === prevVideo.blockId) {
            indiciesToReplace.push(i)
          }
        })

        const newVideos = arrayShuffle(
          nextVideoCandidates.filter((v) => !v.isTakeover)
        ).slice(0, indiciesToReplace.length)

        const newCurrentVideos = indiciesToReplace.reduce(
          (items, indexToReplace, itemIndex) =>
            insertAt(items, newVideos[itemIndex], indexToReplace),
          currentVideos
        )
        setCurrentVideos(newCurrentVideos)
      } else if (nextVideo.isTakeover) {
        const videoBlock = videos.find((v) => v.sys.id === nextVideo.blockId)
        const indicies = randomItem(
          BLOCK_INDICIES.filter((i) => i.indexOf(index) !== -1)
        )
        const newVideos = videoBlock.itemsCollection.items.reduce(
          (items, item, itemIndex) =>
            insertAt(items, videoMap[item.sys.id], indicies[itemIndex]),
          currentVideos
        )
        setCurrentVideos(newVideos)
        setTakeover({
          videoCount: videoBlock.itemsCollection.items.length,
          refs: [],
        })
      } else {
        setCurrentVideos([
          ...currentVideos.slice(0, index),
          nextVideo,
          ...currentVideos.slice(index + 1),
        ])
      }
    },
    [currentVideos, setCurrentVideos, videoMap]
  )

  useEffect(() => {
    if (takeover && takeover.videoCount === takeover.refs.length) {
      let cptCount = 0
      const launchTakeover = () => {
        if (cptCount === takeover.videoCount) {
          takeover.refs.forEach((ref) => ref.play())
        }
      }
      const handleCPT = () => {
        cptCount++
        launchTakeover()
      }
      takeover.refs.forEach((r) => {
        if (r.readyState >= 4) {
          cptCount++
          launchTakeover()
        } else {
          r.addEventListener('canplaythrough', handleCPT)
          r.load()
        }
      })
    }
  }, [takeover])

  return (
    <div className="py-20 my-grid">
      {currentVideos.slice(0, 9).map((video, videoIndex) => (
        <div className="w-2/6 mb-1" key={videoIndex}>
          <TransitionGroup className="overflow-hidden aspect-w-16 aspect-h-9">
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
                  setTakeover={setTakeover}
                  syncBlocks={syncBlocks}
                  setSyncBlock={setSyncBlock}
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
