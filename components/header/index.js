import { useRef, useEffect, useMemo, useState, useCallback } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { useScrollbarWidth, useMeasure, useAsync } from 'react-use'
import useMeasureDirty from 'react-use/lib/useMeasureDirty'
import { useCart } from '@/contexts/cart'
import styles from './styles.module.scss'
import cn from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { TextReveal, LineReveal, LangSwitcher } from '@/components'
import getT from 'next-translate/getT'
import { enOnly, frOnly } from '@/lib/utils'
import { useBreakpoint } from '@/lib/hooks'
import Arrow from '../../assets/icons/slider-arrow.svg'
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
  PROJECT_ROUTES,
  MOBILE_BP,
} from '@/consts'

const INFO_TRANSITION_DELAY = 300

const CartButton = ({ t, cartItemCount, isCart, closeMenu }) => {
  return (
    <Link href={cartItemCount > 0 ? `/${t('cart')}` : `/${t('shop')}`}>
      <a
        className={cn('flex text-green transition-colors', styles.cartBox, {
          'pointer-events-none cursor-default': isCart,
        })}
        onClick={(e) => {
          e.stopPropagation()
          if (!(cartItemCount > 0)) {
            closeMenu()
          }
        }}
      >
        {cartItemCount > 0 && (
          <span className="text-ts1B">{`| ${cartItemCount} |`}</span>
        )}
        <span
          className={cn(
            'block ml-2 mr-1 mobile:mr-0 rounded-full transition-colors',
            styles.cartButton,
            isCart ? 'bg-black border-2 border-solid border-green' : 'bg-green'
          )}
        />
      </a>
    </Link>
  )
}

const getCartItemCount = (cart) => {
  return Object.values(cart).reduce(
    (cartCount, itemVariants) =>
      cartCount +
      itemVariants.reduce(
        (itemCount, itemVariant) => itemCount + itemVariant.count,
        0
      ),
    0
  )
}

const HeaderMain = ({
  isOpen,
  isCart,
  isThreeColumnHeader,
  openMenu,
  closeMenu,
}) => {
  const [isHovering, setIsHovering] = useState(false)
  const { t } = useTranslation('common')
  const [cart] = useCart()
  const cartItemCount = useMemo(() => getCartItemCount(cart), [cart])
  const toggle = useCallback(() => {
    if (isOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }, [isOpen, closeMenu, openMenu])
  return (
    <div
      className={cn(
        { [styles.headerMainJumping]: isHovering && !isCart },
        `
        my-grid
        pb-4 mobile:pb-5
        text-ts1B
        mobile:pt-2 mobile:-mt-2
        mobile:bg-black
        mobile:relative mobile:z-10
        cursor-pointer
      `
      )}
      onClick={toggle}
    >
      <div
        className={cn(
          styles.headerColumn,
          isThreeColumnHeader ? 'w-1/6' : 'w-2/8',
          'mobile:w-2/8'
        )}
      >
        <Link href="/">
          <a
            className={cn('inline-block', styles.logoBox)}
            onClick={(e) => {
              e.stopPropagation()
              closeMenu()
            }}
          >
            <span
              className={cn('block ml-1', styles.logo, {
                [styles.logoOpen]: isOpen || isCart,
                'pointer-events-none': isOpen || isCart,
              })}
            />
          </a>
        </Link>
      </div>
      <div
        className={cn(
          styles.jumpOnHover,
          styles.headerColumn,
          isThreeColumnHeader ? 'w-1/6' : 'w-2/8',
          'mobile:w-2/8'
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={cn(styles.headerColumnContent)}>
          Impostor
          <br />
          Cities
        </div>
      </div>
      <div
        className={cn(
          '-mt-1 mobile:mt-0',
          styles.jumpOnHover,
          styles.headerColumn,
          isThreeColumnHeader ? 'w-1/6' : 'w-2/8',
          'mobile:w-2/8'
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={cn(styles.headerColumnContent, 'pt-1 mobile:pt-0')}>
          Édifices
          <br />
          et artifice
        </div>
      </div>
      <div
        className={cn(
          styles.jumpOnHover,
          styles.headerColumn,
          isThreeColumnHeader ? 'w-1/6' : 'w-1/8',
          'mobile:hidden'
        )}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className={cn(styles.headerColumnContent)}>
          Inganni
          <br />
          Urbani
        </div>
      </div>
      <div
        className={cn(
          styles.headerColumn,
          isThreeColumnHeader ? 'w-2/6' : 'w-1/8',
          'mobile:w-2/8'
        )}
      >
        <div className="flex justify-end h-full">
          <CartButton
            t={t}
            cartItemCount={cartItemCount}
            closeMenu={closeMenu}
            isCart={isCart}
          />
        </div>
      </div>
    </div>
  )
}

const PROJECT_ITEM_SECTIONS = [
  'about',
  'visitor',
  'team',
  'sponsors',
  'contact',
]

const ProjectItem = ({ closeMenu }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const { t, lang } = useTranslation('common')
  const [ref, { height }] = useMeasure()
  return (
    <div className="hidden mobile:block">
      <button onClick={toggle} className="text-ts2">
        {t('project')}
      </button>
      <div
        className={cn('overflow-hidden', styles.projectItemExpand, {
          [styles.projectItemExpandOpen]: isOpen,
        })}
        style={{
          height: isOpen ? height : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div ref={ref}>
          <ul className="pt-2 text-altGrey">
            {PROJECT_ITEM_SECTIONS.map((section) => (
              <li key={section} className="">
                <Link
                  href={`${lang === 'en' ? '/project' : '/projet'}#${section}`}
                  locale={lang}
                >
                  <a onClick={closeMenu}>{t(section)}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

const NavItem = ({ item, route, isCart, lang, closeMenu }) => {
  const { value: t } = useAsync(async () => {
    const tr = await getT(lang, 'common')
    return tr
  }, [])
  const isShopItem = SHOP_ROUTES.indexOf(item.route) !== -1
  const isProjectItem = PROJECT_ROUTES.indexOf(item.route) !== -1
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
            'mobile:hidden': isProjectItem,
          })}
          onClick={closeMenu}
        >
          {item.title}
        </a>
      </Link>
      {isCart && isShopItem && t && (
        <span className="text-grey">{` | ${t('cartUC')}`}</span>
      )}
      {isProjectItem && <ProjectItem closeMenu={closeMenu} />}
    </li>
  )
}

const Nav = ({ lang, isOpen, isCart, route, closeMenu }) => {
  const items = NAV_ITEMS[lang]
  return (
    <nav
      className={cn(styles.nav, {
        [styles.navOpen]: isOpen || isCart,
      })}
    >
      <ul className="mobile:space-y-7">
        {items.map((item) => (
          <NavItem
            key={item.href}
            item={item}
            isCart={isCart}
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

const NavBottom = ({ closeMenu }) => {
  return (
    <div
      className={cn(styles.navBottom, 'pb-10 hidden mobile:block mobile:mt-7')}
    >
      <div className="mb-7 text-altGrey">
        <a
          href="https://www.instagram.com/impostorcities"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <br />
        <a
          href="https://www.facebook.com/impostorcities"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>
      <LangSwitcher longName className="text-altGrey" onClick={closeMenu} />
    </div>
  )
}

const HeaderNavTop = ({ closeMenu, isOpen }) => {
  return (
    <div className="hidden mobile:block">
      <div className={cn('my-grid mobile:pb-2', styles.navContent)}>
        <div className="w-4/8">
          <Link href="/">
            <a
              className={cn(styles.homeButton, 'mt-1 mb-9')}
              onClick={closeMenu}
            />
          </Link>
        </div>
        <div className="flex justify-end pointer-events-none w-4/8">
          <div
            className={cn(styles.biennaleLogo, {
              [styles.biennaleLogoOpen]: isOpen,
            })}
          />
        </div>
      </div>
    </div>
  )
}

const HeaderNavColumn = ({
  lang,
  className,
  isOpen,
  isCart,
  closeMenu,
  route,
  isThreeColumnHeader,
}) => {
  return (
    <div
      className={cn(
        isThreeColumnHeader ? 'w-1/6' : 'w-2/8',
        'text-ts2 mobile:w-full mobile:flex mobile:flex-col mobile:justify-between',
        className
      )}
    >
      <Nav
        lang={lang}
        isOpen={isOpen}
        route={route}
        isCart={isCart}
        closeMenu={closeMenu}
      />
      <NavBottom closeMenu={closeMenu} />
    </div>
  )
}

const HeaderNavHomeColumn = ({ closeMenu, isThreeColumnHeader }) => {
  return (
    <div
      className={cn(isThreeColumnHeader ? 'w-1/6' : 'w-2/8', 'mobile:hidden')}
    >
      <div className="flex items-end h-full pl-1">
        <Link href="/">
          <a
            className={cn(
              styles.homeArrow,
              'hover:text-grey transition-colors'
            )}
            onClick={closeMenu}
          >
            <Arrow />
          </a>
        </Link>
      </div>
    </div>
  )
}

const HeaderNav = ({
  isOpen,
  route,
  isCart,
  isThreeColumnHeader,
  closeMenu,
}) => {
  const { lang } = useTranslation('common')
  return (
    <div className="mobile:flex-1 mobile:flex mobile:flex-col">
      <HeaderNavTop isOpen={isOpen} closeMenu={closeMenu} />
      <div
        className={cn(
          'pb-6 my-grid mobile:flex-1 mobile:pb-2 mobile:-mt-8',
          styles.navContent
        )}
      >
        <HeaderNavHomeColumn
          closeMenu={closeMenu}
          isThreeColumnHeader={isThreeColumnHeader}
        />
        <HeaderNavColumn
          lang="en"
          className={enOnly(lang)}
          isOpen={isOpen}
          isCart={isCart}
          route={route}
          isThreeColumnHeader={isThreeColumnHeader}
          closeMenu={closeMenu}
        />
        <HeaderNavColumn
          lang="fr"
          className={frOnly(lang)}
          isOpen={isOpen}
          isCart={isCart}
          route={route}
          isThreeColumnHeader={isThreeColumnHeader}
          closeMenu={closeMenu}
        />
        <div
          className={cn(
            isThreeColumnHeader ? 'w-1/6' : 'w-2/8',
            'text-ts1B',
            'mobile:hidden'
          )}
        >
          <SocialMediaLinks isOpen={isOpen || isCart} />
        </div>
      </div>
    </div>
  )
}

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
        <div className="mt-auto text-ts1">
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
              />
            </div>
          </HeaderInfoColumn>
        </>
      )}
    </div>
  )
}

const Header = ({ isOpen, setIsOpen, isThreeColumnHeader }) => {
  const [scrollBarWidth, setScrollBarWidth] = useState(0)
  const [pageHasScroll, setPageHasScroll] = useState(false)

  const sbw = useScrollbarWidth()
  useEffect(() => {
    setScrollBarWidth(sbw)
  }, [sbw])

  const openMenu = useCallback(() => {
    setIsOpen(true)
  }, [setIsOpen])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [setIsOpen])

  const navRef = useRef(null)
  const { height: navHeight } = useMeasureDirty(navRef)

  useEffect(() => {
    if (navRef.current && window?.innerWidth < MOBILE_BP) {
      if (isOpen) {
        disableBodyScroll(navRef.current)
      } else {
        enableBodyScroll(navRef.current)
      }
    }
    return () => {
      clearAllBodyScrollLocks()
    }
  }, [navRef, isOpen])

  const { route } = useRouter()
  const isCart = CART_ROUTES.indexOf(route) !== -1
  const menuHeight = isCart
    ? navHeight + BOTTOM_BORDER_WIDTH
    : isOpen
    ? 'calc(100vh - 54px)'
    : 0

  const handleResize = useCallback(() => {
    window.requestAnimationFrame(() => {
      const hasScroll = document.body.scrollHeight > document.body.clientHeight
      setPageHasScroll(hasScroll)
    })
  }, [setPageHasScroll])

  const breakpoint = useBreakpoint()
  const isMobile = breakpoint === 'MOBILE'

  const handleScroll = useCallback(() => {
    if (window?.innerWidth > MOBILE_BP) {
      setIsOpen((wasOpen) => {
        if (wasOpen) {
          return false
        }
      })
    }
  }, [])

  useEffect(() => {
    handleResize()
    window.addEventListener('wheel', handleScroll)
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <header
      className={cn(
        `
        fixed top-0 left-0
        w-screen
        pt-2
        px-1 mobile:px-2
        bg-black
        z-30
      `,
        styles.header
      )}
      style={{
        paddingRight:
          (isMobile ? 8 : 4) + (pageHasScroll ? scrollBarWidth || 0 : 0),
      }}
    >
      <HeaderMain
        isOpen={isOpen}
        isCart={isCart}
        isThreeColumnHeader={isThreeColumnHeader}
        openMenu={openMenu}
        closeMenu={closeMenu}
      />
      <div
        className={cn(
          `h-0 overflow-hidden flex flex-col
          mobile:bg-black mobile:w-screen mobile:-ml-2 mobile:px-2`,
          styles.expand,
          {
            [styles.expandOpened]: isOpen,
          }
        )}
        style={{ height: menuHeight }}
      >
        <div
          ref={navRef}
          className={cn(
            { 'border-b-2 border-solid border-white': isCart },
            'mobile:overflow-auto mobile:border-0 mobile:flex mobile:flex-col mobile:flex-1'
          )}
        >
          <HeaderNav
            route={route}
            isOpen={isOpen}
            isCart={isCart}
            isThreeColumnHeader={isThreeColumnHeader}
            closeMenu={closeMenu}
          />
        </div>
        <div className="flex flex-col flex-1 mobile:hidden">
          <HeaderInfo
            isOpen={isOpen}
            isThreeColumnHeader={isThreeColumnHeader}
          />
        </div>
      </div>
    </header>
  )
}

export default Header
