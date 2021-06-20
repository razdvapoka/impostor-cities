import { useState, useCallback, useEffect } from 'react'
import { useVideo } from 'react-use'
import Overlay from './overlay'

const VideoItem = ({
  playingVideoIndex,
  setPlayingVideoIndex,
  vimeoUrl,
  vimeoPosterUrl,
  person,
  captionEn,
  captionFr,
  cameraNumber,
  unmutedVideoIndex,
  setUnmutedVideoIndex,
  index,
  syncBlocks,
  setSyncBlock,
  blockId,
  blockCount,
  indexInBlock,
  hasUserInteraction,
  stopOnHover,
  pageHasFocus,
  switchToNextVideo,
  isTakeover,
  setTakeover,
  isMobile,
  captionType,
  defaultVideoTime = 0,
}) => {
  const switchToNext = useCallback(
    (isManual) => {
      switchToNextVideo(index, isManual)
    },
    [index, switchToNextVideo]
  )

  const handleEnded = useCallback(() => {
    if (blockId && !isTakeover) {
      setSyncBlock(blockId, null)
    }
    switchToNext()
  }, [switchToNext, blockId, isTakeover, setSyncBlock])

  const isMuted =
    !isMobile &&
    (!pageHasFocus ||
      !hasUserInteraction ||
      (unmutedVideoIndex !== null && index !== unmutedVideoIndex))
  const [video, state, controls, ref] = useVideo(
    <video
      className="object-contain object-center"
      src={vimeoUrl}
      poster={vimeoPosterUrl}
      playsInline
      muted={isMuted}
      onEnded={handleEnded}
    />
  )

  useEffect(() => {
    if (!isTakeover && !isMobile) {
      preloadAndPlay()
    }
  }, [isTakeover, isMobile])

  useEffect(() => {
    if (ref && ref.current) {
      if (isTakeover) {
        setTakeover((takeover) => ({
          ...takeover,
          refs: [...takeover.refs, ref.current],
        }))
      } else if (blockId) {
        if (syncBlocks[blockId]) {
          ref.current.currentTime = syncBlocks[blockId].currentTime
        }
        setSyncBlock(blockId, ref.current)
      }
    }
  }, [ref])

  const [isLoading, setIsLoading] = useState(false)
  const preloadAndPlay = useCallback(() => {
    if (ref.current && state.paused) {
      if (ref.current.readyState > 1) {
        controls.play()
      } else {
        if (!isLoading) {
          const handleCanPlay = () => {
            controls.play()
            setIsLoading(false)
          }
          const handleLoadStart = () => {
            setIsLoading(true)
          }
          ref.current.addEventListener('canplay', handleCanPlay, { once: true })
          ref.current.addEventListener('loadstart', handleLoadStart, {
            once: true,
          })
          ref.current.load()
        }
      }
    }
  }, [state, controls, ref, isLoading, setIsLoading])

  const handleClick = useCallback(() => {
    if (playingVideoIndex === index) {
      setPlayingVideoIndex(null)
    } else {
      setPlayingVideoIndex(index)
      preloadAndPlay()
    }
  }, [index, playingVideoIndex, setPlayingVideoIndex])

  useEffect(() => {
    if (isMobile && index === playingVideoIndex && state.paused) {
      preloadAndPlay()
    }
  }, [isMobile, index, playingVideoIndex, state])

  useEffect(() => {
    if (isMobile && index !== playingVideoIndex) {
      controls.pause()
    }
  }, [isMobile, index, playingVideoIndex, controls])

  const handleMouseEnter = useCallback(() => {
    if (stopOnHover) {
      if (!state.paused) {
        controls.pause()
      }
    } else if (index !== unmutedVideoIndex) {
      setUnmutedVideoIndex(index)
    }
  }, [
    index,
    unmutedVideoIndex,
    setUnmutedVideoIndex,
    stopOnHover,
    state.paused,
    controls.pause,
  ])

  const handleMouseLeave = useCallback(() => {
    if (stopOnHover) {
      if (state.paused) {
        controls.play()
      }
    } else if (index === unmutedVideoIndex) {
      setUnmutedVideoIndex(null)
    }
  }, [
    index,
    unmutedVideoIndex,
    setUnmutedVideoIndex,
    stopOnHover,
    state.paused,
    controls.play,
  ])

  return (
    <div
      className="aspect-w-16 aspect-h-9"
      {...(isMobile
        ? { onClick: handleClick }
        : {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
          })}
    >
      {video}
      <Overlay
        stopOnHover={stopOnHover}
        captionEn={captionEn}
        captionFr={captionFr}
        videoTime={state.time + defaultVideoTime}
        isTakeover={isTakeover}
        indexInBlock={indexInBlock}
        cameraNumber={cameraNumber}
        person={person}
        switchToNext={switchToNext}
        blockCount={blockCount}
        isMobile={isMobile}
        isPlaying={!state.paused}
        isLoading={isLoading}
        captionType={captionType}
      />
    </div>
  )
}

export default VideoItem
