import { useCallback, useEffect } from 'react'
import { useVideo } from 'react-use'
import Overlay from './overlay'

const VideoItem = ({
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
    !pageHasFocus ||
    !hasUserInteraction ||
    (unmutedVideoIndex !== null && index !== unmutedVideoIndex)
  const [video, state, controls, ref] = useVideo(
    <video
      className="object-contain object-center"
      src={vimeoUrl}
      poster={vimeoPosterUrl}
      autoPlay={!isTakeover && !isMobile}
      playsInline
      muted={isMuted}
      onEnded={handleEnded}
    />
  )

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

  useEffect(() => {
    if (isMobile) {
      if (index === unmutedVideoIndex && state.paused) {
        controls.play()
      } else if (index !== unmutedVideoIndex && !state.paused) {
        controls.pause()
      }
    }
  }, [unmutedVideoIndex, index, isMobile, state, controls])

  const handleClick = useCallback(() => {
    if (index === unmutedVideoIndex) {
      setUnmutedVideoIndex(null)
    } else {
      setUnmutedVideoIndex(index)
    }
  }, [
    index,
    unmutedVideoIndex,
    setUnmutedVideoIndex,
    stopOnHover,
    state,
    controls,
  ])

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
        captionType={captionType}
      />
    </div>
  )
}

export default VideoItem
