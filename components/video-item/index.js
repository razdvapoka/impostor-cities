import { useCallback, useEffect } from 'react'
import { useVideo } from 'react-use'

const VideoItem = ({
  vimeoUrl,
  vimeoPosterUrl,
  unmutedVideoIndex,
  setUnmutedVideoIndex,
  index,
  hasUserInteraction,
  stopOnHover,
  pageHasFocus,
  switchToNextVideo,
  isTakeover,
  setTakeover,
}) => {
  const switchToNext = useCallback(() => {
    switchToNextVideo(index)
  }, [index, switchToNextVideo])

  const isMuted =
    !pageHasFocus ||
    !hasUserInteraction ||
    (unmutedVideoIndex !== null && index !== unmutedVideoIndex)
  const [video, state, controls, ref] = useVideo(
    <video
      className="object-contain object-center"
      src={vimeoUrl}
      poster={vimeoPosterUrl}
      autoPlay={!isTakeover}
      playsInline
      muted={isMuted}
      onEnded={switchToNext}
    />
  )
  useEffect(() => {
    if (ref && ref.current && isTakeover) {
      setTakeover((takeover) => ({
        ...takeover,
        refs: [...takeover.refs, ref.current],
      }))
    }
  }, [ref])
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
