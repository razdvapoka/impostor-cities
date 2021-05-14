import { useCallback } from 'react'
import { useVideo } from 'react-use'

const VideoItem = ({
  vimeoUrl,
  vimeoPosterUrl,
  unmutedVideoIndex,
  setUnmutedVideoIndex,
  unmutedBlockVideoIndex,
  setUnmutedBlockVideoIndex,
  index,
  hasUserInteraction,
  stopOnHover,
  pageHasFocus,
  switchToNextVideo,
  isTakeover,
  indexInBlock,
}) => {
  const switchToNext = useCallback(() => {
    switchToNextVideo(index)
  }, [index, switchToNextVideo])

  const handlePlay = useCallback(() => {
    console.log('handlePlay', isTakeover, indexInBlock, unmutedBlockVideoIndex)
    if (unmutedBlockVideoIndex === null && isTakeover) {
      console.log('setUnmutedBlockVideoIndex', indexInBlock)
      setUnmutedBlockVideoIndex(indexInBlock)
    }
  }, [indexInBlock, unmutedBlockVideoIndex, setUnmutedBlockVideoIndex])

  const isMuted =
    !pageHasFocus ||
    !hasUserInteraction ||
    (isTakeover && unmutedBlockVideoIndex !== indexInBlock) ||
    (unmutedVideoIndex !== null && index !== unmutedVideoIndex)
  const [video, state, controls] = useVideo(
    <video
      className="object-contain object-center"
      src={vimeoUrl}
      poster={vimeoPosterUrl}
      autoPlay
      playsInline
      muted={isMuted}
      onEnded={switchToNext}
      onPlaying={handlePlay}
    />
  )
  const handleMouseEnter = useCallback(() => {
    if (stopOnHover) {
      if (!state.paused) {
        controls.pause()
      }
    } else if (
      index !== unmutedVideoIndex &&
      (!isTakeover || (isTakeover && indexInBlock === unmutedBlockVideoIndex))
    ) {
      setUnmutedVideoIndex(index)
    }
  }, [
    index,
    unmutedVideoIndex,
    setUnmutedVideoIndex,
    hasUserInteraction,
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
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={switchToNext}
    >
      {video}
    </div>
  )
}

export default VideoItem
