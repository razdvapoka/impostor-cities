import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import cn from 'classnames'
import { LangSwitcher } from '@/components'

const Dummy = () => {
  const { lang } = useTranslation('common')
  return (
    <div className="mt-13 flex flex-col flex-1">
      <div className="flex justify-end">
        <div className={cn(styles.logo, '')} />
      </div>
      <div className="flex flex-col justify-between flex-1 -mt-3 text-ts1B">
        {lang === 'en' ? (
          <div>
            Canada’s Official
            <br />
            Representation
            <br />
            <br />
            17th International
            <br />
            Architecture Exhibition
            <br />
            of La Biennale di Venezia
            <br />
            <br />
            22.05-21.11 2021
            <br />
            Online and onsite at the
            <br />
            Canada Pavilion
            <br />
            <br />
            Press
            <br />
            <a href="mailto:press@impostorcities.com">
              press@impostorcities.com
            </a>
          </div>
        ) : (
          <div>
            Représentation
            <br />
            officielle du Canada
            <br />
            <br />
            17e exposition
            <br />
            internationale d’architecture
            <br />
            de La Biennale di Venezia
            <br />
            <br />
            22.05-21.11 2021
            <br />
            En ligne et sur place au <br />
            pavillon du Canada
            <br />
            <br />
            Médias
            <br />
            <a href="mailto:presse@impostorcities.com">
              presse@impostorcities.com
            </a>
          </div>
        )}
        <div>
          {lang === 'en' ? (
            <div>
              <br />
              This site is currently only available on desktop.
              <br />
              Stay tuned for the official opening on 22 May.
            </div>
          ) : (
            <div>
              <br />
              Ce site n'est actuellement disponible que sur
              <br />
              ordinateur. Restez à l’écoute pour l’ouverture
              <br />
              officielle le 22 mai.
            </div>
          )}
          <div className="mt-6 text-grey">
            <LangSwitcher longName />
          </div>
          <div className={cn(styles.councilLogo, 'mt-6')} />
        </div>
      </div>
    </div>
  )
}

export default Dummy
