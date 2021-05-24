import ReactMarkdown from 'react-markdown'
import styles from './styles.module.scss'
import remarkTypograph from '@mavrin/remark-typograf'
import cn from 'classnames'

const Markdown = ({
  children,
  className = '',
  locale,
  override,
  disableTypograph,
  ...rest
}) => (
  <ReactMarkdown
    className={override ? className : cn(styles.markdown, className)}
    source={children}
    linkTarget="_blank"
    parserOptions={{ commonmark: true, footnotes: true }}
    plugins={disableTypograph ? [] : [[remarkTypograph, { locale: [locale] }]]}
    {...rest}
  />
)

export default Markdown
