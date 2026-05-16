import React from 'react'
import HomeHero from '../features/home'
import Projects from './projects/main'
import Layout from './components/layout'
import Skills from './projects/skills'
import GitHubStatsComponent from './components/github-stats'
import ContactSection from './components/contact-section'


 const MainPage: React.FC = () => {
  return (
    <Layout>
      <HomeHero />
      <GitHubStatsComponent />
      <Projects />
      <Skills />
      <ContactSection />
    </Layout>
  )
}
export default MainPage


