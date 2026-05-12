import { useState } from "react"
import { useLocation, Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Mail,
  FolderOpen,
  Sun,
  Moon,
  LogIn,
  LogOut,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react"
import { useAuthContext } from "@/context/authContext"
import { useTheme } from "@/components/theme-provider"
// import { useAppDispatch } from "@/state/hook"




const AdvancedNavbar = () => {

  
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const { isAuthenticated, logout } = useAuthContext()
  const { theme, setTheme } = useTheme()
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollY } = useScroll()

  const isDarkMode = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  // Navigation items with icons and colors
  const navItems = [
    { name: "Home", href: "/", icon: Home, color: "#64ffda" },
    { name: "About", href: "/about", icon: User, color: "#f093fb" },
    { name: "Skills", href: "/skills", icon: Code, color: "#4facfe" },
    { name: "Projects", href: "/projects", icon: FolderOpen, color: "#43e97b" },
    { name: "Contact", href: "/contact", icon: Mail, color: "#fa709a" },
  ]

  const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/Yasg-uru", color: "#333" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/yash-choudhary-28766a259/", color: "#0077b5" },
    { name: "Twitter", icon: Twitter, href: "https://x.com/yashc442", color: "#1da1f2" },
  ]

  // Handle scroll effects
  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50)

    // Hide/show navbar on scroll
    if (latest > lastScrollY && latest > 100) {
      setIsVisible(false)
    } else {
      setIsVisible(true)
    }
    setLastScrollY(latest)
  })

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout()
    } else {
      navigate("/login")
    }
    setIsOpen(false)
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`glass-nav fixed top-0 w-full z-50 ${isScrolled ? "glass-nav-scrolled" : "glass-nav-rest"}`}
      >
        <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-2" 
              whileHover={{ scale: 1.03 }}
            >
              <span className="text-xl font-semibold text-foreground">
                Yash Choudhary
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => {
                // const Icon = item.icon
                const isActive = location.pathname === item.href

                return (
                  <motion.div
                    key={item.name}
                    className="relative"
                  >
                    <Link to={item.href}>
                      <motion.div
                        className={`px-3 py-2 text-sm ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {item.name}
                      </motion.div>
                    </Link>

                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        layoutId="activeIndicator"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <motion.button
                onClick={() => setTheme(isDarkMode ? "light" : "dark")}
                className="p-2 rounded-md border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </motion.button>

              {/* Social Links */}
              <div className="flex items-center space-x-2">
                {socialLinks.map((social) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-white"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Icon className="w-4 h-4" />
                    </motion.a>
                  )
                })}
              </div>

              {/* Resume Button */}
              <motion.a
                href="/resume.pdf"
                download
                className="px-4 py-2 text-sm border border-primary text-primary rounded-md"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Resume
              </motion.a>

              {/* Auth Button */}
              <motion.button
                onClick={handleAuthAction}
                className={`px-4 py-2 text-sm rounded-md flex items-center space-x-2 ${
                  isAuthenticated
                    ? "border border-red-500 text-red-500 hover:bg-red-500/10"
                    : "border border-primary text-primary hover:bg-primary/10"
                }`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {isAuthenticated ? (
                  <>
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </>
                )}
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="lg:hidden p-2 text-foreground/70 hover:text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden glass-nav-panel overflow-hidden"
            >
              <div className="px-4 py-3 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = location.pathname === item.href

                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link to={item.href} onClick={() => setIsOpen(false)}>
                        <div
                          className={`flex items-center space-x-3 px-3 py-2 rounded-md ${
                            isActive ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:bg-accent hover:text-accent-foreground"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                          <span className="text-sm">{item.name}</span>
                        </div>
                      </Link>
                    </motion.div>
                  )
                })}

                <div className="pt-3 border-t border-border space-y-2">
                  <motion.button
                    onClick={() => setTheme(isDarkMode ? "light" : "dark")}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-md border border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                    whileTap={{ scale: 0.97 }}
                  >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    <span>{isDarkMode ? "Light mode" : "Dark mode"}</span>
                  </motion.button>

                  <div className="flex justify-center space-x-3">
                    {socialLinks.map((social) => {
                      const Icon = social.icon
                      return (
                        <motion.a
                          key={social.name}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-400 hover:text-white"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Icon className="w-4 h-4" />
                        </motion.a>
                      )
                    })}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <motion.a
                      href="/resume.pdf"
                      download
                      className="block text-center px-4 py-2 text-sm border border-primary text-primary rounded-md"
                      whileTap={{ scale: 0.97 }}
                    >
                      Download Resume
                    </motion.a>

                    <motion.button
                      onClick={handleAuthAction}
                      className={`w-full px-4 py-2 text-sm rounded-md flex items-center justify-center space-x-2 ${
                        isAuthenticated
                          ? "border border-red-500 text-red-500 hover:bg-red-500/10"
                          : "border border-primary text-primary hover:bg-primary/10"
                      }`}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isAuthenticated ? (
                        <>
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </>
                      ) : (
                        <>
                          <LogIn className="w-4 h-4" />
                          <span>Login</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
        style={{ scaleX: scrollY }}
        initial={{ scaleX: 0 }}
      />
    </>
  )
}

export default AdvancedNavbar