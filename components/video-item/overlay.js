import { format, utcToZonedTime } from 'date-fns-tz'
import cn from 'classnames'
import VolumeIcon from '../../assets/icons/volume.svg'
import CamIcon from '../../assets/icons/cam.svg'
import ForwardIcon from '../../assets/icons/forward.svg'
import PlayIcon from '../../assets/icons/play.svg'
import styles from './styles.module.scss'

const TZ = 'Europe/Rome'

const formatVideoTime = (s) => {
  const hours = Math.floor(s / 3600)
  const hoursStr = hours > 9 ? hours : `0${hours}`
  const minutes = Math.floor((s - hours * 3600) / 60)
  const minutesStr = minutes > 9 ? minutes : `0${minutes}`
  const seconds = Math.floor(s - hours * 3600 - minutes * 60)
  const secondsStr = seconds > 9 ? seconds : `0${seconds}`
  // const ms = Math.round((s % 1) * 10)
  // const msStr = ms > 9 ? ms : `0${ms}`
  return `00:${hoursStr}:${minutesStr}:${secondsStr}`
}

const Volume = ({ isTopVideo, isBottomVideo, isMobile, isPlaying }) => {
  return (
    <div
      className={cn('absolute', styles.volumeIcon, {
        [styles.volumeIconTop]: isTopVideo,
        [styles.volumeIconBottom]: isBottomVideo,
        [styles.volumeIconBlink]: isMobile && isPlaying,
      })}
    >
      <VolumeIcon />
    </div>
  )
}

const Camera = ({ number, isTopVideo, isBottomVideo }) => {
  return (
    <div
      className={cn('relative', {
        [styles.cameraIconTop]: isTopVideo,
        [styles.cameraIconBottom]: isBottomVideo,
      })}
    >
      <div className={styles.cameraIcon}>
        <CamIcon />
      </div>
      <div className={cn('absolute text-tsMono', styles.cameraIconText)}>
        {number}
      </div>
    </div>
  )
}

const ForwardButton = ({ isTopVideo, isBottomVideo, switchToNext }) => {
  return (
    <button
      className={cn(
        'absolute w-1/2 mobile:w-2/8 flex justify-end items-center pr-2',
        styles.forwardButton,
        {
          [styles.forwardButtonTop]: isTopVideo,
          [styles.forwardButtonBottom]: isBottomVideo,
        }
      )}
      onClick={(e) => {
        e.stopPropagation()
        switchToNext(true)
      }}
    >
      <div className={cn(styles.forwardIcon)}>
        <ForwardIcon />
      </div>
    </button>
  )
}

const TopLine = ({
  isLocation,
  videoTime,
  isTakeover,
  person,
  isTopVideo,
  indexInBlock,
  captionType,
}) => {
  const localTimeString = format(
    utcToZonedTime(Date.now(), TZ),
    `K:mm:ssaaa HH'h'mm:ss`,
    {
      timeZone: TZ,
    }
  )
  const firstInTakeover = isTakeover && indexInBlock === 0
  return (
    <div className="flex justify-between">
      <div>
        {captionType === 'counter' ? (
          <div className="text-tsMono">{formatVideoTime(videoTime)}</div>
        ) : captionType === 'time' ? (
          <div className="text-tsMono">{localTimeString}</div>
        ) : isLocation || firstInTakeover ? (
          <div className="text-tsMono">{formatVideoTime(videoTime)}</div>
        ) : isTakeover ? (
          <div />
        ) : person ? (
          <div className="text-ts1B">{person}</div>
        ) : (
          <div className="text-tsMono">{localTimeString}</div>
        )}
      </div>
      {isTopVideo && <Camera number={indexInBlock + 1} isTopVideo />}
    </div>
  )
}

const BottomLine = ({
  isBottomVideo,
  isLocation,
  isTakeover,
  indexInBlock,
  blockCount,
  captionEn,
  captionFr,
  isInBlock,
  isMobile,
}) => {
  return (
    <div
      className={cn('flex justify-between', {
        'items-end': isBottomVideo,
      })}
    >
      <div>
        {isLocation || (isTakeover && indexInBlock === (isMobile ? 3 : 2)) ? (
          <div className="flex text-ts1B">
            <div className="mr-5">
              {captionEn || `${blockCount}-Ch. Sequence`}
            </div>
            <div>{captionFr || `S??quence ${blockCount}-Ca.`}</div>
          </div>
        ) : isInBlock ? (
          <div />
        ) : (
          <div className="flex text-ts1B">
            <div className="mr-5">{captionEn}</div>
            <div>{captionFr}</div>
          </div>
        )}
      </div>
      {isBottomVideo && <Camera number={indexInBlock + 1} isBottomVideo />}
    </div>
  )
}

const Overlay = ({
  stopOnHover,
  person,
  captionEn,
  captionFr,
  switchToNext,
  isTakeover,
  indexInBlock,
  videoTime,
  blockCount,
  isMobile,
  isPlaying,
  isLoading,
  captionType,
}) => {
  const isInBlock = indexInBlock != null
  const isLocation = isInBlock && !isTakeover
  const isTopVideo = isTakeover && indexInBlock < 2
  const isBottomVideo = isLocation || (isTakeover && indexInBlock >= 2)
  return (
    <>
      <div
        className={cn(
          'overlay flex flex-col justify-between',
          styles.videoOverlay,
          {
            [styles.videoOverlayHidden]: !isTakeover && !isMobile,
            'opacity-0': isMobile && !isPlaying,
            'opacity-1': isMobile && isPlaying,
          }
        )}
      >
        {!stopOnHover && (
          <>
            <TopLine
              isLocation={isLocation}
              videoTime={videoTime}
              isTakeover={isTakeover}
              person={person}
              isTopVideo={isTopVideo}
              indexInBlock={indexInBlock}
              captionType={captionType}
            />
            <BottomLine
              isBottomVideo={isBottomVideo}
              isLocation={isLocation}
              isTakeover={isTakeover}
              indexInBlock={indexInBlock}
              blockCount={blockCount}
              captionEn={captionEn}
              captionFr={captionFr}
              isInBlock={isInBlock}
              isMobile={isMobile}
            />
            <Volume
              isTopVideo={isTopVideo}
              isBottomVideo={isBottomVideo}
              isMobile={isMobile}
              isPlaying={isPlaying}
            />
          </>
        )}
        {(!isTakeover || isMobile) && (
          <ForwardButton
            isTopVideo={isTopVideo}
            isBottomVideo={isBottomVideo}
            switchToNext={switchToNext}
          />
        )}
      </div>
      {isMobile && !isPlaying && !isLoading && (
        <div className={cn('overlay', styles.videoOverlay)}>
          <button
            className={cn(
              'absolute w-2/8 h-full flex items-center justify-end pr-2',
              styles.playButton,
              {
                [styles.playButtonTop]: isTopVideo,
                [styles.playButtonBottom]: isBottomVideo,
              }
            )}
          >
            <div className={styles.playIcon}>
              <PlayIcon />
            </div>
          </button>
        </div>
      )}
    </>
  )
}

export default Overlay
