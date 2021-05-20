import { useEffect, useState, useCallback } from 'react'
import { useLocalStorage, useTimeoutFn } from 'react-use'
import { CookieBanner } from '@/components'
import { useUserInteraction } from '@/contexts/user-interaction'

const Layout = ({ children }) => {
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
    <main className="flex-1 p-1">
      {children}
      {/* cookieBannerVisible && <CookieBanner close={closeCookieBanner} /> */}
    </main>
  )
}

export default Layout
