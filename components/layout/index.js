import { useState } from 'react'
import { useLocalStorage, useTimeoutFn } from 'react-use'
import { CookieBanner } from '@/components'

const Layout = ({ children }) => {
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
  return (
    <main className="flex-1 p-1">
      {children}
      {cookieBannerVisible && <CookieBanner close={closeCookieBanner} />}
    </main>
  )
}

export default Layout
