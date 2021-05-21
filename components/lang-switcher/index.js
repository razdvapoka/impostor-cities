import useTranslation from 'next-translate/useTranslation'
import { locales } from '@/i18n'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ROUTE_MAP } from '@/consts'

const LangSwitcher = ({ longName, className }) => {
  const { lang, t } = useTranslation('common')
  const { asPath } = useRouter()

  return (
    <>
      {locales.map((lng) =>
        lng === lang ? null : (
          <Link href={ROUTE_MAP[asPath]} locale={lng} key={lng}>
            <a className={className}>{longName ? t(lng) : lng}</a>
          </Link>
        )
      )}
    </>
  )
}

export default LangSwitcher
