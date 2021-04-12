import styles from './styles.module.scss'
console.log(styles)

const Footer = ({ text, title }) => {
  return (
    <footer className="bg-black text-white p-2 flex items-center justify-between border border-1">
      <div className={styles.test}>{title}</div>
    </footer>
  )
}

export default Footer
