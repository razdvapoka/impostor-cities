import { createStateContext } from 'react-use'

const [useCart, CartProvider] = createStateContext({
  products: [],
  selected: {},
})

export { useCart, CartProvider }
