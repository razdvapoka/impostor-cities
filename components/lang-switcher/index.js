import useTranslation from 'next-translate/useTranslation'
import { locales } from '@/i18n'
import Link from 'next/link'
import { useRouter } from 'next/router'

const LangSwitcher = ({ longName }) => {
  const { lang, t } = useTranslation('common')
  const { asPath } = useRouter()

  return (
    <>
      {locales.map((lng) =>
        lng === lang ? null : (
          <Link href={asPath} locale={lng} key={lng}>
            {longName ? t(lng) : lng}
          </Link>
        )
      )}
    </>
  )
}

export default LangSwitcher
