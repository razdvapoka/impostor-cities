import { Header } from '@/components'

const Layout = ({ children, headerTitle = 'ht', headerText = 'ht' }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header text={headerText} title={headerTitle} />
      <main className="flex-1 p-1">{children}</main>
    </div>
  )
}

export default Layout
