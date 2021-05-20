import { useState, useRef, useCallback, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useUnmount, useMeasure, useAsync } from 'react-use'
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

const HeaderMain = ({
  isOpen,
  isCart,
  isShop,
  isThreeColumnHeader,
  openMenu,
  closeMenu,
}) => {
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
  const close = useCallback(
    (e) => {
      if (isOpen) {
        closeMenu()
      } else {
        openMenu()
      }
    },
    [isOpen, closeMenu, openMenu]
  )
  return (
    <div
      className={cn('pb-4 cursor-pointer my-grid text-ts1B', styles.headerMain)}
      onClick={close}
    >
      <div className={isThreeColumnHeader ? 'w-1/6' : 'w-2/8'}>
        <Link href="/">
          <a
            className={cn('block ml-1', styles.logo, {
              [styles.logoOpen]: isOpen || isCart || isShop,
              'pointer-events-none': isOpen || isCart || isShop,
            })}
            onClick={(e) => e.stopPropagation()}
          />
        </Link>
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

const NavItem = ({ item, route, isCart, isShop, isOpen, lang, closeMenu }) => {
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
            if (isOpen && !isShopItem) {
              closeMenu()
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

const Nav = ({ lang, isOpen, isCart, isShop, route, closeMenu }) => {
  const items = NAV_ITEMS[lang]
  return (
    <nav
      className={cn(styles.nav, {
        [styles.navOpen]: isOpen || isCart || isShop,
      })}
    >
      <ul>
        {items.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            isOpen={isOpen}
            isCart={isCart}
            isShop={isShop}
            route={route}
            lang={lang}
            closeMenu={closeMenu}
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
  isShop,
  route,
  isCart,
  isThreeColumnHeader,
  closeMenu,
}) => {
  const close = useCallback(() => {
    if (isOpen) {
      closeMenu()
    }
  }, [isOpen, closeMenu])
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
            isShop={isShop}
            closeMenu={closeMenu}
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
            isShop={isShop}
            closeMenu={closeMenu}
          />
        </div>
        <div
          className={cn(isThreeColumnHeader ? 'w-1/6' : 'w-2/8', 'text-ts1B')}
        >
          <SocialMediaLinks isOpen={isOpen || isCart || isShop} />
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

const HeaderInfo = ({ isOpen: isReallyOpen, isShop, isThreeColumnHeader }) => {
  const isOpen = isReallyOpen || isShop
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
            {isShop && <div className="mt-30 text-ts2">Coming soon</div>}
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
            {isShop && <div className="mt-30 text-ts2">À venir</div>}
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

const Header = ({ isOpenByDefault = false, isThreeColumnHeader, isShop }) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault)
  const openMenu = () => {
    setIsOpen(true)
  }
  const closeMenu = () => {
    setIsOpen(false)
  }
  const ref = useRef(null)
  const [navRef, { height: navHeight }] = useMeasure()
  const { route } = useRouter()
  const isCart = CART_ROUTES.indexOf(route) !== -1
  const menuHeight = isCart
    ? navHeight + BOTTOM_BORDER_WIDTH
    : isOpen || isShop
    ? 'calc(100vh - 54px)'
    : 0

  useEffect(() => {
    if (ref.current) {
      if (isOpen || isShop) {
        disableBodyScroll(ref.current)
      } else {
        enableBodyScroll(ref.current)
      }
    }
  }, [isOpen, isShop])

  useUnmount(clearAllBodyScrollLocks)

  return (
    <header
      ref={ref}
      className={cn(
        `
        fixed top-0 left-0
        w-screen
        pt-2
        px-1
        bg-black
        z-30
      `,
        { [styles.disableTransitions]: isShop }
      )}
    >
      <HeaderMain
        isOpen={isOpen}
        isCart={isCart}
        isShop={isShop}
        isThreeColumnHeader={isThreeColumnHeader}
        openMenu={openMenu}
        closeMenu={closeMenu}
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
            route={route}
            isOpen={isOpen}
            isCart={isCart}
            isShop={isShop}
            isThreeColumnHeader={isThreeColumnHeader}
            closeMenu={closeMenu}
          />
        </div>
        <HeaderInfo
          isOpen={isOpen}
          isShop={isShop}
          isThreeColumnHeader={isThreeColumnHeader}
        />
      </div>
    </header>
  )
}

export default Header
