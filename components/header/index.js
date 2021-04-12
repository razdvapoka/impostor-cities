import { LangSwitcher } from '@/components'

const Header = ({ text, title }) => {
  return (
    <header
      className={`
      fixed top-0 left-0
      w-screen
      p-2
      flex items-center justify-between
      border border-1
      bg-black
      z-30`}
    >
      <LangSwitcher />
      <div className="">{title}</div>
    </header>
  )
}

export default Header
