import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-gray-900 bg-opacity-80 backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold text-white">
          Yash Choudhary
        </Link>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-gray-300 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/projects" className="text-gray-300 hover:text-white">
              Projects
            </Link>
          </li>
          <li>
            <Link to="/skills" className="text-gray-300 hover:text-white">
              Skills
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-gray-300 hover:text-white">
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

