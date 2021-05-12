import { useRef } from 'react'
import { useToggle, useMeasure, useClickAway, useAsync } from 'react-use'
import styles from './styles.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { TextReveal, LineReveal } from '@/components'
import getT from 'next-translate/getT'
import {
  NAV_ITEMS,
  BOTTOM_BORDER_WIDTH,
  CART_ROUTES,
  ROUTE_MAP,
  SHOP_ROUTES,
} from '@/consts'

const HeaderMain = ({ open }) => {
  return (
    <div className="pb-4 cursor-pointer my-grid text-ts3B" onClick={open}>
      <div className="w-2/8">
        <div className={cn('bg-white ml-1', styles.logo)} />
      </div>
      <div className="w-2/8">
        Impostor
        <br />
        Cities
      </div>
      <div className="w-2/8">
        Édifices
        <br />
        et artifice
      </div>
      <div className="w-1/8">
        Inganni
        <br />
        Urbani
      </div>
      <div className="flex justify-end w-1/8">
        <div className="flex mr-2">
          <div className={cn('mr-1 text-tsC', styles.dot)}>•</div>
          <div className="mr-6">
            <div>Cart</div>
            <div>| 0 |</div>
          </div>
          <div>Panier</div>
        </div>
      </div>
    </div>
  )
}

const NavItem = ({ item, route, isCart, lang }) => {
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
            'text-grey pointer-events-none': isActive,
          })}
        >
          {item.title}
          {t && isCart && isShopItem ? ` | ${t('cartUC')}` : ''}
        </a>
      </Link>
    </li>
  )
}

const Nav = ({ lang, isOpen, isCart, route }) => {
  const items = NAV_ITEMS[lang]
  return (
    <nav className={cn(styles.nav, { [styles.navOpen]: isOpen })}>
      <ul>
        {items.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            isCart={isCart}
            route={route}
            lang={lang}
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
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-grey"
          >
            Instagram
          </a>
          <br />
          <a
            href="https://example.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-grey"
          >
            Facebook
          </a>
        </TextReveal>
      </li>
    </ul>
  )
}

const HeaderNav = ({ isOpen, route, isCart }) => {
  return (
    <div>
      <div className="pb-6 my-grid">
        <div className="w-2/8" />
        <div className="w-2/8 text-ts2">
          <Nav lang="en" isOpen={isOpen} route={route} isCart={isCart} />
        </div>
        <div className="w-2/8 text-ts2">
          <Nav lang="fr" isOpen={isOpen} route={route} isCart={isCart} />
        </div>
        <div className="w-2/8 text-ts3B">
          <SocialMediaLinks isOpen={isOpen} />
        </div>
      </div>
    </div>
  )
}

const INFO_TRANSITION_DELAY = 1000

const HeaderInfoColumn = ({ isOpen, children }) => {
  const delay = isOpen ? INFO_TRANSITION_DELAY : 0
  return (
    <div className="w-2/8">
      <LineReveal isRevealed={isOpen} transitionDelayMs={delay} />
      <div className="mt-1">{children}</div>
    </div>
  )
}

const Lift = ({ isUp, children }) => {
  return (
    <div className={cn(styles.lift, { [styles.liftUp]: isUp })}>{children}</div>
  )
}

const HeaderInfo = ({ isOpen }) => {
  const delay = isOpen ? INFO_TRANSITION_DELAY : 0
  return (
    <div className={styles.headerInfo}>
      <div
        className={cn(
          'pb-1 border-b-2 border-solid my-grid',
          styles.headerInfoContent,
          { [styles.headerInfoContentOpened]: isOpen }
        )}
      >
        <HeaderInfoColumn isOpen={isOpen}>
          <Lift isUp={isOpen}>
            <div className="text-ts2">
              <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
                22.05-21.11 2021
              </TextReveal>
            </div>
          </Lift>
        </HeaderInfoColumn>
        <HeaderInfoColumn isOpen={isOpen}>
          <Lift isUp={isOpen}>
            <div className="text-ts3B">
              <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
                17th International
                <br />
                Architecture Exhibition
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
          <div className="mt-20">
            <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
              ©2021 Impostor Cities
              <br />
              All rights reserved
            </TextReveal>
          </div>
        </HeaderInfoColumn>
        <HeaderInfoColumn isOpen={isOpen}>
          <Lift isUp={isOpen}>
            <div className="text-ts3B">
              <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
                17e exposition internationale
                <br />
                d’architecture
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
          <div className="mt-20">
            <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
              ©2021 Impostor Cities
              <br />
              All rights reserved
            </TextReveal>
          </div>
        </HeaderInfoColumn>
        <HeaderInfoColumn isOpen={isOpen}>
          <div className="flex justify-between">
            <Lift isUp={isOpen}>
              <div className="text-ts3B">
                <TextReveal isRevealed={isOpen} transitionDelayMs={delay}>
                  Padiglione Canada
                  <br />
                  Giardini di Castello
                  <br />
                  Venezia
                </TextReveal>
              </div>
            </Lift>
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
      </div>
    </div>
  )
}

const Header = ({ isOpenByDefault = false }) => {
  const [isOpen, toggleOpen] = useToggle(isOpenByDefault)
  const ref = useRef(null)
  useClickAway(ref, () => {
    if (isOpen) {
      toggleOpen()
    }
  })
  const [expandRef, { height }] = useMeasure()
  const [navRef, { height: navHeight }] = useMeasure()
  const { route } = useRouter()
  const isCart = CART_ROUTES.indexOf(route) !== -1
  const menuHeight = isCart
    ? navHeight + BOTTOM_BORDER_WIDTH
    : isOpen
    ? height
    : 0

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
      <HeaderMain open={toggleOpen} />
      <div
        className={cn('h-0 overflow-hidden', styles.expand)}
        style={{ height: menuHeight }}
      >
        <div ref={expandRef}>
          <div
            ref={navRef}
            className={cn({ 'border-b-2 border-solid border-white': isCart })}
          >
            <HeaderNav
              isOpen={isOpen || isCart}
              route={route}
              isCart={isCart}
            />
          </div>
          <HeaderInfo isOpen={isOpen} />
        </div>
      </div>
    </header>
  )
}

export default Header
