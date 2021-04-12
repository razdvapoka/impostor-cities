import tp from '@/typograph'

const Typograph = ({ as: Component = 'div', children, ...rest }) => (
  <Component
    {...rest}
    dangerouslySetInnerHTML={{ __html: tp.execute(children) }}
  />
)

export default Typograph
