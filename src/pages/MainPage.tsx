import React, { useState } from 'react'
import Hero from './components/profile'


import Projects from './projects/main'
import Layout from './components/layout'
import  Skills  from './projects/skills'
import GitHubStatsComponent from './components/github-stats'
import ContactSection from './components/contact-section'


 const MainPage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <GitHubStatsComponent/>
      <Projects />
      <Skills />
      <ContactSection />
    </Layout>
  )
}
export default MainPage


