import styles from './styles.module.scss'
import useTranslation from 'next-translate/useTranslation'
import { enOnly, frOnly } from '@/lib/utils'
import cn from 'classnames'
import { Markdown } from '@/components'

export const HeadphonesAlert = () => {
  const { lang } = useTranslation('common')
  return (
    <div
      className={cn(
        'fixed top-0 left-0 flex items-center w-screen px-1 mobile:px-3 cursor-pointer z-40',
        'mobile:items-stretch',
        styles.headphonesAlert
      )}
    >
      <div className={cn('my-grid flex-1', styles.headphonesAlertGrid)}>
        <div className="w-1/6 mobile:hidden" />
        <div className="w-4/6 mobile:flex-1">
          <div
            className={cn(
              'flex items-stretch h-full px-1 pt-2 -mx-1 text-ts2 mobile:pt-18',
              styles.headphonesAlertContent
            )}
          >
            <div
              className={cn(
                'flex flex-col justify-between flex-1 mobile:pb-2',
                enOnly(lang)
              )}
            >
              <Markdown
                className="text-ts2 mobile:hidden"
                locale="en-US"
                override
              >
                {`This site is best viewed on a computer.\\
                Use headphones for the\\
                best experience.`}
              </Markdown>
              <Markdown
                className="hidden text-ts2 mobile:block"
                locale="en-US"
                disableTypograph
                override
              >
                {`This site is best viewed on a computer.\\
                Use headphones for the best experience.`}
              </Markdown>
              <div>Close</div>
            </div>
            <div
              className={cn(
                'flex flex-col justify-between flex-1 ml-1 mobile:ml-0 mobile:pb-2',
                frOnly(lang)
              )}
            >
              <Markdown className="text-ts2 mobile:hidden" locale="fr" override>
                {`Ce site est optimisé sur un ordinateur.\\
                Utiliser les écouteurs
                pour la meilleure expérience.`}
              </Markdown>
              <Markdown
                className="hidden text-ts2 mobile:block"
                locale="fr"
                disableTypograph
                override
              >
                {`Ce site est optimisé sur un ordinateur.\\
                Utiliser les écouteurs pour la meilleure expérience.`}
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
