import { useCallback } from 'react'
import { useVideo } from 'react-use'

const VideoItem = ({
  src,
  poster,
  unmutedVideoIndex,
  setUnmutedVideoIndex,
  index,
  hasUserInteraction,
  stopOnHover,
  pageHasFocus,
}) => {
  const isMuted =
    !pageHasFocus ||
    !hasUserInteraction ||
    (unmutedVideoIndex !== null && index !== unmutedVideoIndex)
  const [video, state, controls] = useVideo(
    <video
      className="object-contain object-center"
      src={src}
      poster={poster}
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
    <div className="w-2/6 mb-1">
      <div
        className="aspect-w-16 aspect-h-9"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {video}
      </div>
    </div>
  )
}

export default VideoItem
