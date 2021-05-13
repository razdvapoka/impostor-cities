import { useCallback } from 'react'
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
  transitionState,
  title,
  id,
  switchToNextVideo,
}) => {
  const handleClick = useCallback(() => {
    switchToNextVideo(index)
  }, [index, switchToNextVideo])
  const isMuted =
    !pageHasFocus ||
    !hasUserInteraction ||
    (unmutedVideoIndex !== null && index !== unmutedVideoIndex)
  const [video, state, controls] = useVideo(
    <video
      className="object-contain object-center"
      src={vimeoUrl}
      poster={vimeoPosterUrl}
      autoPlay
      playsInline
      loop
      muted={isMuted}
    />
  )
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
      onClick={handleClick}
    >
      {video}
    </div>
  )
}

export default VideoItem
