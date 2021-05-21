import Head from 'next/head'
import { useRouter } from 'next/router'
import { Header } from '@/components'
import { THREE_COLUMN_ROUTES, SHOP_ROUTES } from '@/consts'

import '../assets/css/tailwind.css'
import '../assets/scss/global.scss'
import { CartProvider } from '@/contexts/cart'
import { UserInteractionProvider } from '@/contexts/user-interaction'

const touchEventsDetector = `
  if ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
    document.documentElement.className += ' touchevents';
    window.hasTouchEvents = true;
  } else {
    document.documentElement.className += ' no-touchevents';
  }
`

const correctVH = `
  function setCorrectVh() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", vh + 'px');
  };

  window.addEventListener("resize", setCorrectVh);

  setCorrectVh();
`

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const isThreeColumnHeader = !!THREE_COLUMN_ROUTES.find(
    (route) => route === router.route
  )
  const isShop = !!SHOP_ROUTES.find((route) => route === router.route)
  return (
    <div>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: touchEventsDetector }} />
        <script dangerouslySetInnerHTML={{ __html: correctVH }} />
        <meta
          property="og:title"
          content="The world we live in together is the global generic city we experience together onscreen."
        />
        <meta
          property="og:description"
          content="The Impostor Cities exhibition exists onsite at the Canada Pavilion in Venice and online."
        />
        <meta
          property="og:image"
          content="https://impostor-cities.vercel.app/preview.png"
        />
      </Head>
      <CartProvider>
        <UserInteractionProvider>
          <div className="flex flex-col min-h-screen">
            <Header isThreeColumnHeader={isThreeColumnHeader} isShop={isShop} />
            <Component {...pageProps} />
          </div>
        </UserInteractionProvider>
      </CartProvider>
    </div>
  )
}

export default MyApp
