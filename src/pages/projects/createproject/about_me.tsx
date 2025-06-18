
import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion,  useInView, useMotionValue } from "framer-motion"
import {
  BookOpen,
  Code,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Sparkles,
  Trophy,
  Calendar,
  Award,
  Zap,
  Heart,
  Rocket,
  Database,
  Server,
  Monitor,
  Terminal,
} from "lucide-react"
import YashChoudhary from "../../../assets/my_images/yash-choudhary-image .jpg"
import Contact from "../contact"
// Floating particle component
const FloatingParticle = ({ delay, duration, x, y }: { delay: number; duration: number; x: string; y: string }) => (
  <motion.div
    className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-30"
    style={{ left: x, top: y }}
    animate={{
      y: [0, -20, 0],
      opacity: [0.3, 0.8, 0.3],
      scale: [1, 1.5, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    }}
  />
)

// Skill card component with advanced animations
const SkillCard = ({
  icon: Icon,
  title,
  skills,
  color,
  delay,
}: {
  icon: any
  title: string
  skills: string[]
  color: string
  delay: number
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative group"
    >
      <motion.div
        whileHover={{ scale: 1.05, rotateY: 5 }}
        className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 h-full relative overflow-hidden"
        style={{
          boxShadow: isHovered ? `0 20px 40px ${color}20` : "0 10px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: isHovered ? `linear-gradient(45deg, ${color}20, transparent, ${color}10)` : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative z-10">
          <motion.div animate={{ rotate: isHovered ? 360 : 0 }} transition={{ duration: 0.8 }} className="mb-4">
            <Icon className="h-8 w-8" style={{ color }} />
          </motion.div>

          <h3 className="text-xl font-bold text-white mb-4">{title}</h3>

          <div className="space-y-2">
            {skills.map((skill, index) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: delay + index * 0.1 }}
                className="flex items-center gap-2"
              >
                <motion.div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={{ scale: isHovered ? [1, 1.5, 1] : 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                />
                <span className="text-gray-300 text-sm">{skill}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// Experience timeline item
const TimelineItem = ({
  title,
  company,
  period,
  description,
  current,
  delay,
}: {
  title: string
  company: string
  period: string
  description: string[]
  current?: boolean
  delay: number
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className="relative pl-8 pb-8"
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400 to-transparent" />

      {/* Timeline dot */}
      <motion.div
        className={`absolute left-0 top-2 w-3 h-3 rounded-full transform -translate-x-1/2 ${
          current ? "bg-cyan-400" : "bg-gray-600"
        }`}
        animate={current ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] } : {}}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-cyan-400/50 transition-all duration-300">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-cyan-400 font-medium">{company}</p>
          </div>
          {current && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium"
            >
              Current
            </motion.div>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-3">{period}</p>
        <ul className="space-y-1">
          {description.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: delay + index * 0.1 }}
              className="text-gray-300 text-sm flex items-start gap-2"
            >
              <Zap className="h-3 w-3 text-cyan-400 mt-1 flex-shrink-0" />
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

// Stats card component
const StatCard = ({ icon: Icon, value, label, color, delay }: any) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      const target = Number.parseInt(value.replace(/\D/g, ""))
      const duration = 2000
      const increment = target / (duration / 16)
      let current = 0

      const timer = setInterval(() => {
        current += increment
        if (current >= target) {
          setCount(target)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6 text-center group hover:border-cyan-400/50 transition-all duration-300"
    >
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="mb-4 flex justify-center"
      >
        <Icon className="h-8 w-8" style={{ color }} />
      </motion.div>
      <motion.div className="text-3xl font-bold text-white mb-2" style={{ color }}>
        {typeof count === "number" ? count : value}
        {value.includes("+") && "+"}
      </motion.div>
      <div className="text-gray-400 text-sm">{label}</div>
    </motion.div>
  )
}

export default function AdvancedAboutMe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isContactOpen, setIsContactOpen]= useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  

  // Mouse tracking
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setMousePosition({ x, y })
    mouseX.set(x)
    mouseY.set(y)
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-black text-white relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0">
        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.2}
            duration={3 + Math.random() * 2}
            x={`${Math.random() * 100}%`}
            y={`${Math.random() * 100}%`}
          />
        ))}

        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-90" />

        {/* Mouse follower gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(6, 182, 212, 0.1), transparent 40%)`,
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            style={{ backgroundSize: "200% 200%" }}
          >
            About Me
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Passionate developer crafting digital experiences with code, creativity, and endless curiosity
          </motion.p>
        </motion.div>

        {/* Profile Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative">
              {/* Animated rings */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 w-80 h-80 border-2 border-cyan-400/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-4 w-72 h-72 border border-purple-500/20 rounded-full"
              />

              {/* Profile image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-cyan-400 mx-auto"
                style={{
                  boxShadow: "0 0 50px rgba(6, 182, 212, 0.3)",
                }}
              >
                <img
                  src= {YashChoudhary}
                  alt="Yash Choudhary"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-cyan-400/20 to-transparent"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-4 bg-cyan-400 text-black px-4 py-2 rounded-full font-bold text-sm"
              >
                <Code className="inline mr-1 h-4 w-4" />
                Developer
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-purple-500 text-white px-4 py-2 rounded-full font-bold text-sm"
              >
                <Sparkles className="inline mr-1 h-4 w-4" />
                Creative
              </motion.div>
            </div>
          </motion.div>

          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                className="text-4xl font-bold text-white mb-2"
                animate={{ color: ["#ffffff", "#06b6d4", "#ffffff"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Yash Choudhary
              </motion.h2>
              <motion.p
                className="text-2xl text-cyan-400 mb-4"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              >
                Full Stack Developer & Founder
              </motion.p>
              <div className="flex items-center gap-2 text-gray-400 mb-6">
                <MapPin className="h-5 w-5" />
                <span>Madhya Pradesh, India</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-gray-300 leading-relaxed mb-4">
                Hey there! I'm a passionate Full Stack Developer with expertise in Node.js, Express, TypeScript, React,
                and Microservices Architecture. I thrive on building scalable, high-performance applications and solving
                complex problems.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                Currently, I'm the Founder & Full Stack Developer at CrushSphere, where I'm developing a social platform
                with real-time messaging, location-based features, and interactive engagement scoring.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Beyond coding, I love contributing to open-source projects, mentoring fellow developers, and
                participating in coding competitions. Let's connect and build something amazing together! 🚀
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Github, href: "https://github.com/Yasg-uru", color: "#ffffff" },
                { icon: Linkedin, href: "https://www.linkedin.com/in/yash-choudhary-28766a259/", color: "#0077b5" },
                { icon: Mail, href: "mailto:yashpawar12122004@gmail.com", color: "#ea4335" },
              ].map(({ icon: Icon, href, color }, index) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-3 bg-gray-900 rounded-full border border-gray-700 hover:border-cyan-400 transition-all duration-300"
                  style={{
                    boxShadow: `0 0 20px ${color}20`,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <Icon className="h-6 w-6" style={{ color }} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32"
        >
          <StatCard icon={Trophy} value="1000+" label="Problems Solved" color="#fbbf24" delay={0} />
          <StatCard icon={Rocket} value="20+" label="Projects Built" color="#06b6d4" delay={0.1} />
          <StatCard icon={Calendar} value="1+" label="Years Experience" color="#8b5cf6" delay={0.2} />
          <StatCard icon={Heart} value="100%" label="Passion Level" color="#ef4444" delay={0.3} />
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Technical Arsenal
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <SkillCard
              icon={Monitor}
              title="Frontend"
              skills={["React", "TypeScript", "Next.js", "Tailwind CSS", "Redux"]}
              color="#06b6d4"
              delay={0}
            />
            <SkillCard
              icon={Server}
              title="Backend"
              skills={["Node.js", "Express", "MongoDB", "REST APIs", "Microservices"]}
              color="#10b981"
              delay={0.1}
            />
            <SkillCard
              icon={Database}
              title="Database"
              skills={["MongoDB", "PostgreSQL", "Redis", "Firebase", "Prisma"]}
              color="#8b5cf6"
              delay={0.2}
            />
            <SkillCard
              icon={Terminal}
              title="DevOps & Tools"
              skills={["Git", "Docker", "AWS", "CI/CD", "Linux"]}
              color="#f59e0b"
              delay={0.3}
            />
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Professional Journey
          </motion.h2>

          <div className="max-w-4xl mx-auto">
            <TimelineItem
              title="Founder & Full Stack Developer"
              company="CrushSphere"
              period="2023 - Present"
              description={[
                "Developing a social platform with real-time messaging",
                "Implementing location-based features and interactive engagement scoring",
                "Building scalable architecture using microservices",
                "Leading product development and technical decisions",
              ]}
              current
              delay={0}
            />
            <TimelineItem
              title="Backend Developer Team Lead Intern"
              company="Rablo.in"
              period="2022 - 2023"
              description={[
                "Led a backend development team of 5 developers",
                "Optimized RESTful APIs for improved performance",
                "Implemented microservices architecture",
                "Mentored junior developers and conducted code reviews",
              ]}
              delay={0.2}
            />
          </div>
        </motion.div>

        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-green-400 to-blue-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Educational Background
          </motion.h2>

          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <BookOpen className="h-8 w-8 text-cyan-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white">B.Tech in Information Technology</h3>
                  <p className="text-cyan-400">Samrat Ashok Technological Institute, Vidisha</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">CGPA</span>
                  <span className="text-white font-semibold">7.97/10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-green-400 font-semibold">Current</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-purple-400/50 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <motion.div
                  animate={{ rotate: [0, -360] }}
                  transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Award className="h-8 w-8 text-purple-400" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white">Higher Secondary Education</h3>
                  <p className="text-purple-400">Govt. School of Excellence, Chhindwara</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Percentage</span>
                  <span className="text-white font-semibold">83%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-gray-400 font-semibold">Completed</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <motion.h2
            className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            style={{ backgroundSize: "200% 200%" }}
          >
            Let's Build Something Amazing Together!
          </motion.h2>
          <motion.p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            I'm always excited to work on new projects and collaborate with fellow developers. Let's connect and create
            something extraordinary!
          </motion.p>
          <motion.button
          onClick={()=>setIsContactOpen(!isContactOpen)}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6, 182, 212, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-black font-bold rounded-full hover:from-cyan-300 hover:to-purple-400 transition-all duration-300"
          >
            <Mail className="inline mr-2 h-5 w-5" />
            Get In Touch
          </motion.button>
        </motion.div>
      </div>
      {
        isContactOpen && <Contact/>
      }
    </div>
  )
}
