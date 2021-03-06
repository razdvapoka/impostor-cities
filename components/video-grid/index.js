import { useCallback, useEffect, useState, useMemo } from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import pickRandomWeighted from 'pick-random-weighted'
import { VideoItem } from '@/components'
import { VIDEO_BLOCK_TYPE } from '@/consts'
import { insertAt } from '@/lib/utils'
import { useBreakpoint } from '@/lib/hooks'
import styles from './styles.module.scss'

const VIDEO_COUNT = 9
const VIDEO_COUNT_MOBILE = 6

const BLOCK_INDICIES = [
  [0, 1, 3, 4],
  [1, 2, 4, 5],
  [3, 4, 6, 7],
  [4, 5, 7, 8],
]

const BLOCK_INDICIES_MOBILE = [[0, 1, 2, 3]]

const TRANSITION_DURATION = 1000
const TAG_REGEXP = /\*(?<tag>.+)\*/

const getVideoTag = (video) => {
  const matches = video.title.match(TAG_REGEXP)
  return matches ? matches.groups.tag.toLowerCase() : null
}

const getActiveTags = (videos) =>
  videos
    .filter((video) => video.tag)
    .reduce((tags, video) => tags.add(video.tag), new Set())

const groupVideosById = (
  videos,
  blockId,
  isTakeover,
  defaultVideoTime,
  blockDescriptionEn,
  blockDescriptionFr
) => {
  return videos.reduce((map, video, videoIndex) => {
    const isBlock = video.__typename === VIDEO_BLOCK_TYPE
    // to handle videos that are a part of a takeover and a separate item at the same time
    const videoId = `${video.sys.id}${blockId || ''}`
    return isBlock
      ? {
          ...map,
          ...groupVideosById(
            video.itemsCollection.items,
            video.sys.id,
            video.isTakeover,
            video.defaultVideoTime,
            video.descriptionEn,
            video.descriptionFr
          ),
        }
      : {
          ...map,
          [videoId]: {
            ...video,
            blockId,
            isTakeover,
            indexInBlock: blockId ? videoIndex : null,
            blockCount: blockId ? videos.length : null,
            defaultVideoTime: defaultVideoTime || video.defaultVideoTime,
            captionEn: blockDescriptionEn || video.captionEn,
            captionFr: blockDescriptionFr || video.captionFr,
            isLobby: video.title.indexOf('LOBBY') !== -1,
            tag: getVideoTag(video),
          },
        }
  }, {})
}

const randomItem = (array) => array[Math.floor(Math.random() * array.length)]

const randomVideoItem = (videos) => {
  return pickRandomWeighted(
    videos.map((video) => [video, video.probability || 1])
  )
}

const randomVideoItems = (videos, count) => {
  let candidates = videos.map((video, videoIndex) => [
    videoIndex,
    video.probability || 1,
  ])
  const pickedVideos = []
  for (let i = 0; i < count; i++) {
    const pickedIndex = pickRandomWeighted(candidates)
    const pickedVideo = videos[pickedIndex]
    pickedVideos.push(pickedVideo)
    candidates = candidates.filter(
      ([index]) =>
        index !== pickedIndex &&
        (!pickedVideo.tag || pickedVideo.tag !== videos[index].tag)
    )
  }
  return pickedVideos
}

const VideoGrid = ({ videos, hasUserInteraction, pageHasFocus }) => {
  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === 'MOBILE'
  const videoMap = useMemo(() => groupVideosById(videos), [videos])
  const [unmutedVideoIndex, setUnmutedVideoIndex] = useState(null)
  const [playingVideoIndex, setPlayingVideoIndex] = useState(null)
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
      randomVideoItems(
        Object.values(videoMap).filter(
          (video) =>
            !video.isTakeover &&
            !video.isLobby &&
            (!isMobile || !video.stopOnHover)
        ),
        window.innerWidth < 750 ? VIDEO_COUNT_MOBILE : VIDEO_COUNT
      )
    )
  }, [])

  const switchToNextVideo = useCallback(
    (index, isManual) => {
      const prevVideo = currentVideos[index]
      const isAlreadyTakenOver = currentVideos.some((v) => v.isTakeover)
      const isAlreadyLobbied = currentVideos.some((v) => v.isLobby)
      const activeTags = getActiveTags(currentVideos)
      const nextVideoCandidates = Object.values(videoMap).filter(
        (v) =>
          // don't choose a video that's already on the grid
          !currentVideos.find((cv) => cv.sys.id === v.sys.id) &&
          // don't choose a takeover if there already is one on the grid
          // or the switch wasn't initiated by click
          // or it's the mobile version
          ((!isAlreadyTakenOver && !isMobile && isManual) || !v.isTakeover) &&
          // don't choose lobby videos if there already is one on the grid
          (!isAlreadyLobbied || !v.isLobby) &&
          // don't choose typographic videos on mobile
          (!isMobile || !v.stopOnHover) &&
          // don't choose videos with tags that already are on the grid
          !activeTags.has(v.tag)
      )
      const nextVideo = prevVideo.nextVideoItem
        ? nextVideoCandidates.find(
            (v) => v.sys.id === prevVideo.nextVideoItem.sys.id
          ) || randomVideoItem(nextVideoCandidates)
        : randomVideoItem(nextVideoCandidates)

      if (prevVideo.isTakeover) {
        const indiciesToReplace = []
        currentVideos.forEach((v, i) => {
          if (v.blockId === prevVideo.blockId) {
            indiciesToReplace.push(i)
          }
        })

        const newVideos = randomVideoItems(
          nextVideoCandidates.filter((v) => !v.isTakeover),
          indiciesToReplace.length
        )

        const newCurrentVideos = indiciesToReplace.reduce(
          (items, indexToReplace, itemIndex) =>
            insertAt(items, newVideos[itemIndex], indexToReplace),
          currentVideos
        )
        setCurrentVideos(newCurrentVideos)
      } else if (nextVideo.isTakeover) {
        const blockVideos = Object.values(videoMap).filter(
          (v) => v.blockId === nextVideo.blockId
        )
        const blockIndicies = isMobile ? BLOCK_INDICIES_MOBILE : BLOCK_INDICIES
        const indicies = randomItem(
          blockIndicies.filter((i) => i.indexOf(index) !== -1)
        )
        const newVideos = blockVideos
          .sort((v1, v2) => (v1.indexInBlock > v2.indexInBlock ? 1 : -1))
          .reduce(
            (items, item, itemIndex) =>
              insertAt(
                items,
                videoMap[`${item.sys.id}${nextVideo.blockId}`],
                indicies[itemIndex]
              ),
            currentVideos
          )
        setCurrentVideos(newVideos)
        setTakeover({
          videoCount: blockVideos.length,
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
    [currentVideos, setCurrentVideos, videoMap, isMobile]
  )

  // preload takeover videos to synchronize them
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
    <div className="py-20 my-grid mobile:py-13">
      {currentVideos
        .slice(0, isMobile ? VIDEO_COUNT_MOBILE : VIDEO_COUNT)
        .map((video, videoIndex) => (
          <div className="w-2/6 mb-1 mobile:w-full" key={videoIndex}>
            <TransitionGroup className="w-full overflow-hidden aspect-w-16 aspect-h-9">
              <CSSTransition
                key={video.sys.id}
                timeout={TRANSITION_DURATION}
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
                    isMobile={isMobile}
                    playingVideoIndex={playingVideoIndex}
                    setPlayingVideoIndex={setPlayingVideoIndex}
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
