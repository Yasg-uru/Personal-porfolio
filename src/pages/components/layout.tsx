import React from 'react'
import Footer from './footer'
// import Header from './header'



interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground transition-colors duration-300">
     
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

