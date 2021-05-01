import styles from './styles.module.scss'
import cn from 'classnames'
import { REVEAL_EASING, REVEAL_DURATION_MS } from '@/consts'

const LineReveal = ({
  isRevealed,
  transitionDurationMs = REVEAL_DURATION_MS,
  transitionEasing = REVEAL_EASING,
  transitionDelayMs = 0,
}) => {
  return (
    <div
      className={cn(styles.line, { [styles.lineRevealed]: isRevealed })}
      style={{
        transition: `transform ${transitionDurationMs}ms ${transitionEasing} ${transitionDelayMs}ms`,
      }}
    />
  )
}

export default LineReveal
