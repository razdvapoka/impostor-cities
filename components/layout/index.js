import { useEffect, useState, useCallback } from 'react'
import { useLocalStorage, useTimeoutFn } from 'react-use'
import { CookieBanner } from '@/components'
import { useUserInteraction } from '@/contexts/user-interaction'
import cn from 'classnames'

const Layout = ({ children, isProject }) => {
  const [userInteraction, setUserInteraction] = useUserInteraction()
  const [cookiesAccepted] = useLocalStorage('cookiesAccepted')
  const [cookieBannerVisible, setCookieBannerVisible] = useState(false)
  const checkCookies = () => {
    if (!cookiesAccepted) {
      setCookieBannerVisible(true)
    }
  }
  const closeCookieBanner = () => {
    setCookieBannerVisible(false)
  }
  useTimeoutFn(checkCookies, 2000)
  const handleClick = useCallback(() => {
    if (!userInteraction) {
      setUserInteraction(true)
    }
  }, [userInteraction, setUserInteraction])
  useEffect(() => {
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])
  return (
    <main
      className={cn(
        'flex-1 p-1 mobile:flex mobile:flex-col',
        isProject ? 'mobile:py-2 mobile:px-0' : 'mobile:p-2'
      )}
    >
      {children}
      {/* cookieBannerVisible && <CookieBanner close={closeCookieBanner} /> */}
    </main>
  )
}

export default Layout
