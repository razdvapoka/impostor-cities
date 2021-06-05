import { Markdown, Layout } from '@/components'
import { enOnly, frOnly } from '@/lib/utils'
import cn from 'classnames'
import useTranslation from 'next-translate/useTranslation'
import styles from './styles.module.scss'
import Arrow from '../../../assets/icons/slider-arrow.svg'

const renderers = {
  link: ({ children, ...rest }) => {
    return (
      <a {...rest}>
        {children}
        <span className={cn('inline-block', styles.arrow)}>
          <Arrow />
        </span>
      </a>
    )
  },
}

const PressColumn = ({ locale, assets, inquiries }) => {
  return (
    <div>
      <Markdown
        className={cn(
          'text-ts2 mobile:border-t-1 mobile:border-white mobile:border-solid mobile:pt-2 mb-10',
          styles.markdown
        )}
        locale={locale}
        renderers={renderers}
        override
      >
        {assets}
      </Markdown>
      <Markdown
        className={cn(
          'text-ts2 mobile:pt-2',
          styles.markdown,
          styles.markdownMedia
        )}
        locale={locale}
        override
      >
        {inquiries}
      </Markdown>
    </div>
  )
}

const Press = ({ commonData, data: { en, fr } }) => {
  const { lang } = useTranslation('common')
  return (
    <Layout {...commonData}>
      <div className="mt-22 my-grid mobile:mt-13">
        <div className="w-2/8 mobile:hidden" />
        <div className={cn('w-2/8 mobile:w-full', enOnly(lang))}>
          <PressColumn locale="en-US" {...en} />
        </div>
        <div className={cn('w-2/8 mobile:w-full', frOnly(lang))}>
          <PressColumn locale="fr" {...fr} />
        </div>
      </div>
    </Layout>
  )
}

export default Press
