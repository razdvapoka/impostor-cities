import { useRef, useCallback, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import {
  useUnmount,
  useToggle,
  useMeasure,
  useClickAway,
  useAsync,
} from 'react-use'
import { useCart } from '@/contexts/cart'
import styles from './styles.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { TextReveal, LineReveal } from '@/components'
import getT from 'next-translate/getT'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import {
  NAV_ITEMS,
  BOTTOM_BORDER_WIDTH,
  CART_ROUTES,
  ROUTE_MAP,
  SHOP_ROUTES,
} from '@/consts'

const HeaderMain = ({ isOpen, isCart, isThreeColumnHeader, toggleOpen }) => {
  const { t } = useTranslation('common')
  const [cart] = useCart()
  const cartItemCount = Object.values(cart).reduce(
    (cartCount, itemVariants) =>
      cartCount +
      itemVariants.reduce(
        (itemCount, itemVariant) => itemCount + itemVariant.count,
        0
      ),
    0
  )
  const closeMenu = useCallback(
    (e) => {
      e.stopPropagation()
      if (isOpen) {
        toggleOpen()
      }
    },
    [isOpen, toggleOpen]
  )
  return (
    <div
      className={cn('pb-4 cursor-pointer my-grid text-ts1B', styles.headerMain)}
      onClick={isCart ? null : toggleOpen}
    >
      <div className={isThreeColumnHeader ? 'w-1/6' : 'w-2/8'}>
        <div
          className={cn('block ml-1', styles.logo, {
            [styles.logoOpen]: isOpen,
          })}
          onClick={isCart ? null : closeMenu}
        />
      </div>
      <div className={isThreeColumnHeader ? 'w-1/6' : 'w-2/8'}>
        Impostor
        <br />
        Cities
      </div>
      <div className={isThreeColumnHeader ? 'w-1/6' : 'w-2/8'}>
        Édifices
        <br />
        et artifice
      </div>
      <div className={isThreeColumnHeader ? 'w-1/6' : 'w-1/8'}>
        Inganni
        <br />
        Urbani
      </div>
      <div className={cn(isThreeColumnHeader ? 'w-2/6' : 'w-1/8')}>
        <Link href={cartItemCount > 0 ? `/${t('cart')}` : `/${t('shop')}`}>
          <a
            className={cn(
              'flex justify-end text-green hover:text-white transition-colors h-full',
              styles.cartBox
            )}
          >
            {cartItemCount > 0 && (
              <span className="text-ts1B">{`| ${cartItemCount} |`}</span>
            )}
            <span
              className={cn(
                'block ml-2 mr-1 rounded-full bg-green transition-colors',
                styles.cartButton
              )}
              onClick={closeMenu}
            />
          </a>
        </Link>
      </div>
    </div>
  )
}

const NavItem = ({ item, route, isCart, isOpen, lang, toggleOpen }) => {
  const { value: t } = useAsync(async () => {
    const tr = await getT(lang, 'common')
    return tr
  }, [])
  const isShopItem = SHOP_ROUTES.indexOf(item.route) !== -1
  const isActive =
    item.route === route ||
    ROUTE_MAP[item.route] === route ||
    (isShopItem && isCart)
  return (
    <li>
      <Link href={item.href} locale={lang}>
        <a
          className={cn('transition-colors hover:text-grey', {
            'text-grey': isActive,
            'pointer-events-none': isActive && !(isShopItem && isCart),
          })}
          onClick={() => {
            if (isOpen && !isCart) {
              toggleOpen()
            }
          }}
        >
          {item.title}
        </a>
      </Link>
      {isCart && isShopItem && t && (
        <span className="text-grey">{` | ${t('cartUC')}`}</span>
      )}
    </li>
  )
}

const Nav = ({ lang, isOpen, isCart, route, toggleOpen }) => {
  const items = NAV_ITEMS[lang]
  return (
    <nav className={cn(styles.nav, { [styles.navOpen]: isOpen })}>
      <ul>
        {items.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            isOpen={isOpen}
            isCart={isCart}
            route={route}
            lang={lang}
            toggleOpen={toggleOpen}
          />
        ))}
      </ul>
    </nav>
  )
}

const SocialMediaLinks = ({ isOpen }) => {
  return (
    <ul>
      <li>
        <TextReveal isRevealed={isOpen}>
          <a
            href="https://www.instagram.com/impostorcities"
            target="_blank"
            rel="noopener noreferrer"
            className={cn('transition-colors hover:text-grey')}
          >
            Instagram
          </a>
          <br />
          <a
            href="https://www.facebook.com/impostorcities"
            target="_blank"
            rel="noopener noreferrer"
            className={cn('transition-colors hover:text-grey')}
          >
            Facebook
          </a>
        </TextReveal>
      </li>
    </ul>
  )
}

const HeaderNav = ({
  isOpen,
  route,
  isCart,
  isThreeColumnHeader,
  toggleOpen,
}) => {
  const close = useCallback(() => {
    if (isOpen && !isCart) {
      toggleOpen()
    }
  }, [isOpen, isCart, toggleOpen])
  return (
    <div>
      <div className="pb-6 my-grid">
        <div className={isThreeColumnHeader ? 'w-1/6' : 'w-2/8'}>
          <div className="flex items-end h-full pl-1">
            <Link href="/">
              <a className={cn(styles.homeButton, 'block')} onClick={close} />
            </Link>
          </div>
        </div>
        <div
          className={cn(isThreeColumnHeader ? 'w-1/6' : 'w-2/8', 'text-ts2')}
        >
          <Nav
            lang="en"
            isOpen={isOpen}
            route={route}
            isCart={isCart}
            toggleOpen={toggleOpen}
          />
        </div>
        <div
          className={cn(isThreeColumnHeader ? 'w-1/6' : 'w-2/8', 'text-ts2')}
        >
          <Nav
            lang="fr"
            isOpen={isOpen}
            route={route}
            isCart={isCart}
            toggleOpen={toggleOpen}
          />
        </div>
        <div
          className={cn(isThreeColumnHeader ? 'w-1/6' : 'w-2/8', 'text-ts1B')}
        >
          <SocialMediaLinks isOpen={isOpen} />
        </div>
      </div>
    </div>
  )
}

const INFO_TRANSITION_DELAY = 1000

const HeaderInfoColumn = ({ isOpen, isThreeColumnHeader, children }) => {
  const delay = isOpen ? INFO_TRANSITION_DELAY : 0
  return (
    <div
      className={cn(isThreeColumnHeader ? 'w-1/6' : 'w-2/8', 'flex flex-col')}
    >
      <LineReveal isRevealed={isOpen} transitionDelayMs={delay} />
      <div className="flex flex-col flex-1 mt-1">{children}</div>
    </div>
  )
}

const Lift = ({ isUp, children }) => {
  return (
    <div className={cn(styles.lift, { [styles.liftUp]: isUp })}>{children}</div>
  )
}

const HeaderInfo = ({ isOpen, isThreeColumnHeader }) => {
  const delay = isOpen ? INFO_TRANSITION_DELAY : 0
  return (
    <div className={cn('pb-1 my-grid flex-1', styles.headerInfoContent)}>
      <HeaderInfoColumn
        isOpen={isOpen}
        isThreeColumnHeader={isThreeColumnHeader}
      >
        {!isThreeColumnHeader && (
          <Lift isUp={isOpen}>
            <div className="text-ts2">
              <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
                22.05-21.11 2021
              </TextReveal>
            </div>
          </Lift>
        )}
      </HeaderInfoColumn>
      <HeaderInfoColumn
        isOpen={isOpen}
        isThreeColumnHeader={isThreeColumnHeader}
      >
        <Lift isUp={isOpen}>
          <div className="text-ts1B">
            <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
              17th International
              <br />
              Architecture Exhibition of
              <br />
              La Biennale di Venezia
            </TextReveal>
            <br />
            <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
              Canada’s Official <br />
              Representation
            </TextReveal>
          </div>
        </Lift>
        <div className="mt-auto text-ts3">
          <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
            ©2021 Impostor Cities
            <br />
            All rights reserved
          </TextReveal>
        </div>
      </HeaderInfoColumn>
      <HeaderInfoColumn
        isOpen={isOpen}
        isThreeColumnHeader={isThreeColumnHeader}
      >
        <Lift isUp={isOpen}>
          <div className="text-ts1B">
            <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
              17e exposition internationale
              <br />
              d’architecture de
              <br />
              La Biennale di Venezia
            </TextReveal>
            <br />
            <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
              Représentation <br />
              officielle du Canada
            </TextReveal>
          </div>
        </Lift>
        <div className="mt-auto text-ts1">
          <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
            ©2021 Édifices et artifice
            <br />
            Tous droits réservés
          </TextReveal>
        </div>
      </HeaderInfoColumn>
      <HeaderInfoColumn
        isOpen={isOpen}
        isThreeColumnHeader={isThreeColumnHeader}
      >
        <div className="flex justify-between">
          <Lift isUp={isOpen}>
            <div className="text-ts1B">
              <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
                Padiglione Canada
                <br />
                Giardini della Biennale
                <br />
                Venezia
              </TextReveal>
            </div>
          </Lift>
          <div
            className={cn('mt-2 mr-3', styles.headerInfoLogo, {
              [styles.headerInfoLogoOpened]: isOpen,
              hidden: isThreeColumnHeader,
            })}
            style={{
              backgroundImage: 'url(/images/biennale-logo.svg)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
            }}
          />
        </div>
      </HeaderInfoColumn>
      {isThreeColumnHeader && (
        <>
          <HeaderInfoColumn
            isOpen={isOpen}
            isThreeColumnHeader={isThreeColumnHeader}
          >
            <div className="text-ts1B">
              <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
                22.05-21.11 2021
              </TextReveal>
            </div>
          </HeaderInfoColumn>
          <HeaderInfoColumn
            isOpen={isOpen}
            isThreeColumnHeader={isThreeColumnHeader}
          >
            <div className="flex justify-end">
              <div
                className={cn('mt-2 mr-3', styles.headerInfoLogo, {
                  [styles.headerInfoLogoOpened]: isOpen,
                })}
                style={{
                  backgroundImage: 'url(/images/biennale-logo.svg)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                }}
              />
            </div>
          </HeaderInfoColumn>
        </>
      )}
    </div>
  )
}

const Header = ({ isOpenByDefault = false, isThreeColumnHeader }) => {
  const [isOpen, toggleOpen] = useToggle(isOpenByDefault)
  const ref = useRef(null)
  useClickAway(ref, () => {
    if (isOpen) {
      toggleOpen()
    }
  })
  const [navRef, { height: navHeight }] = useMeasure()
  const { route } = useRouter()
  const isCart = CART_ROUTES.indexOf(route) !== -1
  const menuHeight = isCart
    ? navHeight + BOTTOM_BORDER_WIDTH
    : isOpen
    ? 'calc(100vh - 54px)'
    : 0

  useEffect(() => {
    if (ref.current) {
      if (isOpen) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
  }, [isOpen])

  useUnmount(clearAllBodyScrollLocks)

  return (
    <header
      ref={ref}
      className={`
        fixed top-0 left-0
        w-screen
        pt-2
        px-1
        bg-black
        z-30
      `}
    >
      <HeaderMain
        isOpen={isOpen}
        isCart={isCart}
        isThreeColumnHeader={isThreeColumnHeader}
        toggleOpen={toggleOpen}
      />
      <div
        className={cn('h-0 overflow-hidden flex flex-col', styles.expand, {
          [styles.expandOpened]: isOpen,
        })}
        style={{ height: menuHeight }}
      >
        <div
          ref={navRef}
          className={cn({ 'border-b-2 border-solid border-white': isCart })}
        >
          <HeaderNav
            isOpen={isOpen || isCart}
            route={route}
            isCart={isCart}
            isThreeColumnHeader={isThreeColumnHeader}
            toggleOpen={toggleOpen}
          />
        </div>
        <HeaderInfo isOpen={isOpen} isThreeColumnHeader={isThreeColumnHeader} />
      </div>
    </header>
  )
}

export default Header
