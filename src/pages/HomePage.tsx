import React from 'react'
import Hero from './components/profile'

import Skills from './components/skills'
import Contact from './components/contact'
import Projects from './projects/main'
import Layout from './components/layout'


const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Projects />
      <Skills />
      <Contact />
    </Layout>
  )
}

export default HomePage

