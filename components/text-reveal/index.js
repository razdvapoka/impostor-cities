import styles from './styles.module.scss'
import cn from 'classnames'
import { REVEAL_EASING, REVEAL_DURATION_MS } from '@/consts'

const TextReveal = ({
  children,
  isRevealed,
  transitionDurationMs = REVEAL_DURATION_MS,
  transitionEasing = REVEAL_EASING,
  transitionDelayMs = 0,
}) => {
  return (
    <div className="relative">
      <div>
        <span>{children}</span>
      </div>
      <div
        className={cn('absolute left-0 top-0 w-full', styles.textOverlayBox)}
      >
        <span
          className={cn('', styles.textOverlay, {
            [styles.textOverlayHidden]: isRevealed,
          })}
          style={{
            transition: `background-position ${transitionDurationMs}ms ${transitionEasing} ${transitionDelayMs}ms`,
          }}
        >
          {children}
        </span>
      </div>
    </div>
  )
}

export default TextReveal
