export const ROUTE_MAP = {
  '/shop': '/boutique',
  '/shop/[handle]': '/boutique/[handle]',
  '/boutique': '/shop',
  '/boutique/[handle]': '/shop/[handle]',
  '/presse': '/press',
  '/press': '/presse',
  '/cart': '/panier',
  '/panier': '/cart',
  '/project': '/projet',
  '/projet': '/project',
  '/': '/',
}

export const NAV_ITEMS = {
  en: [
    {
      href: '/project',
      route: '/project',
      title: 'Project',
    },
    {
      href: '/shop',
      route: '/shop',
      title: 'Shop',
    },
    {
      href: '/press',
      route: '/press',
      title: 'Press',
    },
  ],
  fr: [
    {
      href: '/fr/projet',
      route: '/projet',
      title: 'Projet',
    },
    {
      href: '/fr/boutique',
      route: '/boutique',
      title: 'Boutique',
    },
    {
      href: '/fr/presse',
      route: '/presse',
      title: 'Médias',
    },
  ],
}

export const REVEAL_DURATION_MS = 300
export const REVEAL_EASING = 'cubic-bezier(0.65, 0, 0.35, 1)'
export const REVEAL_DELAY_MS = 500
export const BOTTOM_BORDER_WIDTH = 2
export const CART_ROUTES = ['/cart', '/panier']
export const SHOP_ROUTES = ['/shop', '/boutique']
export const PROJECT_ROUTES = ['/project', '/projet']
export const THREE_COLUMN_ROUTES = ['/']

export const VIDEO_ITEM_TYPE = 'VideoItem'
export const VIDEO_BLOCK_TYPE = 'VideoBlock'

export const MOBILE_BP = 750
