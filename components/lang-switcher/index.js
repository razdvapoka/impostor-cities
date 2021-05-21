import { useState } from 'react'
import { useMount } from 'react-use'
import useTranslation from 'next-translate/useTranslation'
import { locales } from '@/i18n'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ROUTE_MAP } from '@/consts'

const LangSwitcher = ({ longName, className }) => {
  const [isMounted, setIsMounted] = useState(false)
  useMount(() => {
    setIsMounted(true)
  })
  const { lang, t } = useTranslation('common')
  const { pathname, query } = useRouter()

  return (
    <>
      {isMounted
        ? locales.map((lng) =>
            lng === lang ? null : (
              <Link
                href={{
                  pathname: ROUTE_MAP[pathname],
                  query,
                }}
                locale={lng}
                key={lng}
              >
                <a className={className}>{longName ? t(lng) : lng}</a>
              </Link>
            )
          )
        : null}
    </>
  )
}

export default LangSwitcher
