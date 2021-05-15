import { useLocalStorage } from 'react-use'
import cn from 'classnames'

const CookieBanner = ({ close }) => {
  const [, setValue] = useLocalStorage('cookiesAccepted')
  const handleClick = () => {
    setValue(true)
    close()
  }
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 w-screen bg-darkGrey px-1 py-3 text-ts1B z-50'
      )}
    >
      <div className="my-grid">
        <div className="w-2/6">
          We use cookies to ensure that we give you the best experience on our
          website. Read our Cookie Policy.{' '}
          <button
            className="hover:text-lightGrey transition-colors text-ts1B"
            onClick={handleClick}
          >
            Accept
          </button>
        </div>
        <div className="w-4/6">
          Ce site utilise des cookies pour vous assurer la meilleure expérience
          utilisateur
          <br />
          possible. Veuillez lire notre politique en matière de cookies.{' '}
          <button
            className="hover:text-lightGrey transition-colors text-ts1B"
            onClick={handleClick}
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieBanner
