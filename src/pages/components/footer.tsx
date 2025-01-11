import React from 'react'
import { Github, Linkedin, Twitter } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-gray-400 text-sm mb-4 md:mb-0">
          &copy; 2024 Yash Choudhary. All rights reserved.
        </p>
        <div className="flex space-x-6">
          <a href="https://github.com/yashchoudhary" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <Github size={20} />
          </a>
          <a href="https://linkedin.com/in/yashchoudhary" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <Linkedin size={20} />
          </a>
          <a href="https://twitter.com/yashchoudhary" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

