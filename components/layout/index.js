import { Header, Footer } from '@/components'

const Layout = ({
  children,
  headerTitle = 'ht',
  footerTitle = 'ft',
  headerText = 'ht',
  footerText = 'ft',
}) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header text={headerText} title={headerTitle} />
      <main className="flex-1 py-20">{children}</main>
      <Footer text={footerText} title={footerTitle} />
    </div>
  )
}

export default Layout
