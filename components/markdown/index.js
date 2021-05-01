import ReactMarkdown from 'react-markdown'
import styles from './styles.module.scss'
import remarkTypograph from '@mavrin/remark-typograf'
import cn from 'classnames'

// const renderers = {
//   link: (props) => {
//     console.log('HEY:', props)
//     return (
//       <a target="_blank" rel="noopener noreferrer">
//         link
//       </a>
//     )
//   },
// }

const Markdown = ({ children, className = '', locale, ...rest }) => (
  <ReactMarkdown
    className={cn(styles.markdown, className)}
    source={children}
    linkTarget="_blank"
    parserOptions={{ commonmark: true, footnotes: true }}
    plugins={[[remarkTypograph, { locale: [locale] }]]}
    {...rest}
  />
)

export default Markdown
