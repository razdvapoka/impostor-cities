import { createStateContext } from 'react-use'

const [useUserInteraction, UserInteractionProvider] = createStateContext(false)

export { useUserInteraction, UserInteractionProvider }
