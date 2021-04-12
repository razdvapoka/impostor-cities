import ReactMarkdown from 'react-markdown'
import styles from './styles.module.scss'
import remarkTypograph from '@mavrin/remark-typograf'
import cn from 'classnames'

const Markdown = ({ children, className = '', ...rest }) => (
  <ReactMarkdown
    className={cn(styles.markdown, className)}
    source={children}
    linkTarget="_blank"
    parserOptions={{ commonmark: true, footnotes: true }}
    plugins={[[remarkTypograph, { locale: ['en-US'] }]]}
    {...rest}
  />
)

export default Markdown
