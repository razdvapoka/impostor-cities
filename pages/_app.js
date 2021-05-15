import Head from 'next/head'
import { useRouter } from 'next/router'
import { Header } from '@/components'
import { THREE_COLUMN_ROUTES } from '@/consts'

import '../assets/css/tailwind.css'
import '../assets/scss/global.scss'
import { CartProvider } from '@/contexts/cart'

const touchEventsDetector = `
    if ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
      document.documentElement.className += ' touchevents';
      window.hasTouchEvents = true;
    } else {
      document.documentElement.className += ' no-touchevents';
    }
`

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const isThreeColumnHeader = !!THREE_COLUMN_ROUTES.find(
    (route) => route === router.route
  )
  return (
    <div>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: touchEventsDetector }} />
        <script text="javascript" src="/mediasync/timingsrc-v2-min.js" />
        <script text="javascript" src="/mediasync/mediasync-min.js" />
      </Head>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <Header isThreeColumnHeader={isThreeColumnHeader} />
          <Component {...pageProps} />
        </div>
      </CartProvider>
    </div>
  )
}

export default MyApp
