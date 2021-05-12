import { createStateContext } from 'react-use'

const [useCart, CartProvider] = createStateContext({})

export { useCart, CartProvider }
