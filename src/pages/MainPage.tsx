import React from 'react'
import Hero from './components/profile'


import Contact from './components/contact'
import Projects from './projects/main'
import Layout from './components/layout'
import  Skills  from './projects/skills'
import GitHubStatsComponent from './components/github-stats'


 const MainPage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <GitHubStatsComponent/>
      <Projects />
      <Skills />
      <Contact />
    </Layout>
  )
}
export default MainPage


