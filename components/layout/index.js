import { useEffect, useState, useCallback } from 'react'
import { useWindowSize, useLocalStorage, useTimeoutFn } from 'react-use'
import { CookieBanner, Dummy } from '@/components'
import { useUserInteraction } from '@/contexts/user-interaction'

const Layout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false)
  const { width } = useWindowSize()
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
  useEffect(() => {
    setIsMobile(width < 750)
  }, [width])
  return (
    <main className="flex-1 p-1 mobile:p-2 mobile:flex mobile:flex-col">
      {isMobile ? <Dummy /> : children}
      {/* cookieBannerVisible && <CookieBanner close={closeCookieBanner} /> */}
    </main>
  )
}

export default Layout
