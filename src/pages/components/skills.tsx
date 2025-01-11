import React from 'react'
import { motion } from 'framer-motion'

const skills = [
  { name: 'React', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'MongoDB', level: 80 },
  { name: 'Express', level: 85 },
  { name: 'TypeScript', level: 75 },
  { name: 'Next.js', level: 70 },
  { name: 'GraphQL', level: 65 },
  { name: 'Docker', level: 60 },
]

const SkillBar: React.FC<{ name: string; level: number; index: number }> = ({ name, level, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1">
        <span className="text-base font-medium text-white">{name}</span>
        <span className="text-sm font-medium text-white">{level}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <motion.div
          className="bg-blue-600 h-2.5 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        ></motion.div>
      </div>
    </motion.div>
  )
}

const Skills: React.FC = () => {
  return (
    <section id="skills" className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <h2 className="text-3xl font-bold mb-8 text-center">My Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} index={index} />
        ))}
      </div>
    </section>
  )
}

export default Skills

