import { useState } from 'react'
import { VideoItem } from '@/components'
import { VIDEO_ITEM_TYPE } from '@/consts'

const VideoGrid = ({ videos, hasUserInteraction, pageHasFocus }) => {
  const [unmutedVideoIndex, setUnmutedVideoIndex] = useState(null)
  const singles = videos.filter((v) => v.__typename === VIDEO_ITEM_TYPE)
  return (
    <div className="my-grid py-20">
      {singles.slice(0, 9).map((video, videoIndex) => (
        <VideoItem
          key={video.sys.id}
          index={videoIndex}
          src={video.vimeoUrl}
          poster={video.vimeoPosterUrl}
          stopOnHover={video.stopOnHover}
          unmutedVideoIndex={unmutedVideoIndex}
          setUnmutedVideoIndex={setUnmutedVideoIndex}
          hasUserInteraction={hasUserInteraction}
          pageHasFocus={pageHasFocus}
        />
      ))}
    </div>
  )
}

export default VideoGrid
