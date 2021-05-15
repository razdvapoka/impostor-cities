import { format, utcToZonedTime } from 'date-fns-tz'
import cn from 'classnames'
import VolumeIcon from '../../assets/icons/volume.svg'
import CamIcon from '../../assets/icons/cam.svg'
import ForwardIcon from '../../assets/icons/forward.svg'
import styles from './styles.module.scss'

const TZ = 'Europe/Rome'

const formatVideoTime = (s) => {
  const minutes = Math.floor(s / 60)
  const seconds = Math.floor(s - minutes * 60)
  const secondsStr = seconds > 9 ? seconds : `0${seconds}`
  return `00 : 00 : 0${minutes} : ${secondsStr}`
}

const Volume = ({ isTopVideo, isBottomVideo }) => {
  return (
    <div
      className={cn('absolute', styles.volumeIcon, {
        [styles.volumeIconTop]: isTopVideo,
        [styles.volumeIconBottom]: isBottomVideo,
      })}
    >
      <VolumeIcon />
    </div>
  )
}

const Camera = ({ number }) => {
  return (
    <div className="relative">
      <div className={styles.cameraIcon}>
        <CamIcon />
      </div>
      <div className={cn('absolute', styles.cameraIconText)}>{number}</div>
    </div>
  )
}

const ForwardButton = ({ isTopVideo, isBottomVideo, switchToNext }) => {
  return (
    <button
      className={cn(
        'absolute w-1/2 flex justify-end items-center pr-2',
        styles.forwardButton,
        {
          [styles.forwardButtonTop]: isTopVideo,
          [styles.forwardButtonBottom]: isBottomVideo,
        }
      )}
      onClick={switchToNext}
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
}) => {
  const localTimeString = format(
    utcToZonedTime(Date.now(), TZ),
    `K:mm:ssaaa HH'h'mm:ss O`,
    {
      timeZone: TZ,
    }
  )
  const firstInTakeover = isTakeover && indexInBlock === 0
  return (
    <div className="flex justify-between">
      <div>
        {isLocation || firstInTakeover ? (
          <div className="text-tsMono">{formatVideoTime(videoTime)}</div>
        ) : isTakeover ? (
          <div />
        ) : person ? (
          <div className="text-ts1B">{person}</div>
        ) : (
          <div className="text-tsMono">{localTimeString}</div>
        )}
      </div>
      {isTopVideo && <Camera number={indexInBlock + 1} />}
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
}) => {
  return (
    <div
      className={cn('flex justify-between', {
        'items-end': isBottomVideo,
      })}
    >
      <div>
        {isLocation || (isTakeover && indexInBlock === 2) ? (
          <div className="flex text-ts1B">
            <div className="mr-5">{blockCount}-Ch. Sequence</div>
            <div>Séquence {blockCount}-Ca.</div>
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
      {isBottomVideo && <Camera number={indexInBlock + 1} />}
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
}) => {
  const isInBlock = indexInBlock != null
  const isLocation = isInBlock && !isTakeover
  const isTopVideo = isTakeover && indexInBlock < 2
  const isBottomVideo = isLocation || (isTakeover && indexInBlock >= 2)
  return (
    <div
      className={cn(
        'overlay py-1 px-2 flex flex-col justify-between',
        styles.videoOverlay
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
          />
          <Volume isTopVideo={isTopVideo} isBottomVideo={isBottomVideo} />
        </>
      )}
      {!isTakeover && (
        <ForwardButton
          isTopVideo={isTopVideo}
          isBottomVideo={isBottomVideo}
          switchToNext={switchToNext}
        />
      )}
    </div>
  )
}

export default Overlay
