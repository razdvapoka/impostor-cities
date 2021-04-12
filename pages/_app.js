import Head from 'next/head'

import '../assets/css/tailwind.css'
import '../assets/scss/global.scss'

const touchEventsDetector = `
    if ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
      document.documentElement.className += ' touchevents';
      window.hasTouchEvents = true;
    } else {
      document.documentElement.className += ' no-touchevents';
    }
`

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <script dangerouslySetInnerHTML={{ __html: touchEventsDetector }} />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
