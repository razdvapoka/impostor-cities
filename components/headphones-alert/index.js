import styles from './styles.module.scss'
import cn from 'classnames'
import { Markdown } from '@/components'

export const HeadphonesAlert = () => {
  return (
    <div
      className={cn(
        'fixed top-0 left-0 flex items-center w-screen h-screen px-1 cursor-pointer z-40',
        styles.headphonesAlert
      )}
    >
      <div className={cn('my-grid w-full', styles.headphonesAlertGrid)}>
        <div className="w-1/6" />
        <div className="w-4/6">
          <div
            className={cn(
              'flex items-stretch h-full px-1 pt-2 -mx-1 text-ts2',
              styles.headphonesAlertContent
            )}
          >
            <div className="flex flex-col justify-between flex-1">
              <Markdown className="text-ts2" locale="en-US">
                {`This site is best viewed on a computer.\\
                Use headphones for the
                best experience.`}
              </Markdown>
              <div>Close</div>
            </div>
            <div className="flex flex-col justify-between flex-1 ml-1">
              <Markdown className="text-ts2" locale="fr">
                {`Ce site est optimisé sur un ordinateur.\\
                Utiliser les écouteurs
                pour la meilleure expérience.`}
              </Markdown>
              <div>Fermer</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeadphonesAlert
