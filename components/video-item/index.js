import { useCallback } from 'react'
const VideoItem = ({
  src,
  poster,
  unmutedVideoIndex,
  setUnmutedVideoIndex,
  index,
}) => {
  const handleMouseEnter = useCallback(() => {
    if (index !== unmutedVideoIndex) {
      setUnmutedVideoIndex(index)
    }
  }, [index, unmutedVideoIndex, setUnmutedVideoIndex])
  const handleMouseLeave = useCallback(() => {
    if (index === unmutedVideoIndex) {
      setUnmutedVideoIndex(null)
    }
  }, [index, unmutedVideoIndex, setUnmutedVideoIndex])
  const isMuted = unmutedVideoIndex !== null && index !== unmutedVideoIndex
  return (
    <div className="w-2/6 mb-1">
      <div className="aspect-w-16 aspect-h-9">
        <video
          className="object-contain object-center"
          src={src}
          poster={poster}
          autoPlay
          playsInline
          loop
          muted={isMuted}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
    </div>
  )
}

export default VideoItem
