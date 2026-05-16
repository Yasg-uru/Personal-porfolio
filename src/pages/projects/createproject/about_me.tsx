
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
import { Card, CardContent } from "@/components/ui/card"
import YashChoudhary from "../../../assets/my_images/yash-choudhary-image .jpg"
import ContactDialog from "../../../components/ContactDialog"
// Floating particle component
const FloatingParticle = ({ delay, duration, x, y }: { delay: number; duration: number; x: string; y: string }) => (
  <motion.div
    className="absolute w-2 h-2 bg-gradient-to-r from-pink-500 to-primary rounded-full opacity-30"
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8 }}
      className="relative group h-full"
    >
      <Card className="animated-border-card relative h-full w-full overflow-hidden bg-white/[0.03] border-white/10 group-hover:border-primary/40 transition-all duration-500 backdrop-blur-md">
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* Background glow on hover */}
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-primary/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        <CardContent className="relative z-10 flex h-full flex-col p-6">
          {/* Icon Container */}
          <motion.div 
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-2xl transition-all duration-300 group-hover:bg-primary/10 group-hover:border-primary/30 group-hover:text-primary shadow-[0_0_20px_rgba(0,0,0,0.2)] mb-4"
          >
            <Icon style={{ color: color }} />
          </motion.div>
          
          {/* Skill Category Title */}
          <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors tracking-tight mb-4">
            {title}
          </h3>
          
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill} className="flex items-center gap-2">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-gray-400 text-sm group-hover:text-gray-200 transition-colors">{skill}</span>
              </div>
            ))}
          </div>

          {/* Subtle line */}
          <div className="mt-auto pt-4 w-8 h-[1px] bg-white/10 group-hover:w-16 group-hover:bg-primary/50 transition-all duration-500" />
        </CardContent>
      </Card>
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
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary to-transparent" />

      {/* Timeline dot */}
      <motion.div
        className={`absolute left-0 top-2 w-3 h-3 rounded-full transform -translate-x-1/2 ${
          current ? "bg-primary" : "bg-gray-600"
        }`}
        animate={current ? { scale: [1, 1.3, 1], opacity: [1, 0.7, 1] } : {}}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      />

      <Card className="animated-border-card relative overflow-hidden bg-white/[0.03] border-white/10 group-hover:border-primary/40 transition-all duration-500 backdrop-blur-md p-6">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">{title}</h3>
              <p className="text-primary/80 font-medium">{company}</p>
            </div>
            {current && (
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30"
              >
                Current
              </motion.div>
            )}
          </div>
          <p className="text-gray-400 text-sm mb-4">{period}</p>
          <ul className="space-y-2">
            {description.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: delay + index * 0.1 }}
                className="text-gray-300 text-sm flex items-start gap-2 group/item"
              >
                <Zap className="h-3 w-3 text-primary mt-1 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                <span className="group-hover/item:text-white transition-colors">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </Card>
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
      whileHover={{ y: -5 }}
      className="relative group h-full"
    >
      <Card className="animated-border-card h-full bg-white/[0.03] border-white/10 group-hover:border-primary/40 transition-all duration-500 backdrop-blur-md overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <CardContent className="p-6 flex flex-col items-center text-center space-y-3 relative z-10">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary mb-1 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
            <Icon size={24} style={{ color: color }} />
          </div>
          <div className="text-3xl font-bold text-white group-hover:text-primary transition-colors">
            {typeof count === "number" ? count : value}
            {value.includes("+") && "+"}
          </div>
          <div className="text-xs text-gray-500 font-medium tracking-wider uppercase group-hover:text-gray-300 transition-colors">
            {label}
          </div>
        </CardContent>
      </Card>
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
      className="min-h-screen bg-background text-white relative overflow-hidden"
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

       

        {/* Mouse follower gradient */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 102, 0.12), transparent 40%)`,
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
            className="text-6xl md:text-8xl font-bold mb-6 text-primary"
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
                className="absolute inset-0 w-80 h-80 border-2 border-primary/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-4 w-72 h-72 border border-primary/20 rounded-full"
              />

              {/* Profile image */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-primary mx-auto"
                style={{
                  boxShadow: "0 0 50px rgba(255, 0, 102, 0.4)",
                }}
              >
                <img
                  src= {YashChoudhary}
                  alt="Yash Choudhary"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-primary/25 to-transparent"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />
              </motion.div>

              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="absolute -top-4 -right-4 bg-primary text-black px-4 py-2 rounded-full font-bold text-sm"
              >
                <Code className="inline mr-1 h-4 w-4" />
                Developer
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-primary/80 text-white px-4 py-2 rounded-full font-bold text-sm"
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
                animate={{ color: ["#ffffff", "#ff0066", "#ffffff"] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              >
                Yash Choudhary
              </motion.h2>
              <motion.p
                className="text-2xl text-primary mb-4"
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
                  className="p-3 bg-gray-900 rounded-full border border-gray-700 hover:border-primary transition-all duration-300"
                  style={{
                    boxShadow: `0 0 20px rgba(255, 0, 102, 0.3)`,
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
          <StatCard icon={Trophy} value="1000+" label="Problems Solved" color="#ff0066" delay={0} />
          <StatCard icon={Rocket} value="20+" label="Projects Built" color="#ff0066" delay={0.1} />
          <StatCard icon={Calendar} value="1+" label="Years Experience" color="#ff0066" delay={0.2} />
          <StatCard icon={Heart} value="100%" label="Passion Level" color="#ff0066" delay={0.3} />
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="mb-32"
        >
          <motion.h2
            className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-primary via-pink-400 to-primary bg-clip-text text-transparent"
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
              title="SDE Intern"
              company="BITCS"
              period="Current"
              description={[
                "Currently interning as an SDE at BITCS and contributing to production-facing backend and product work.",
                "Working with APIs, database-driven features, and clean implementation practices in a collaborative team environment.",
                "Strengthening system design, debugging, and delivery skills through hands-on engineering work.",
              ]}
              current
              delay={0}
            />
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
            className="text-4xl font-bold text-center mb-16 text-primary"
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
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <Card className="animated-border-card relative h-full w-full overflow-hidden bg-white/[0.03] border-white/10 group-hover:border-primary/40 transition-all duration-500 backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 rounded-2xl bg-primary/10 text-primary"
                    >
                      <BookOpen className="h-8 w-8" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">B.Tech in Information Technology</h3>
                      <p className="text-primary/80">Samrat Ashok Technological Institute</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-gray-400">CGPA</span>
                      <span className="text-white font-bold text-lg">7.97/10</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-gray-400">Status</span>
                      <span className="text-green-400 font-bold">Current</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <Card className="animated-border-card relative h-full w-full overflow-hidden bg-white/[0.03] border-white/10 group-hover:border-primary/40 transition-all duration-500 backdrop-blur-md">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <CardContent className="p-8 relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -360 }}
                      transition={{ duration: 0.5 }}
                      className="p-3 rounded-2xl bg-primary/10 text-primary"
                    >
                      <Award className="h-8 w-8" />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">Higher Secondary Education</h3>
                      <p className="text-primary">Govt. School of Excellence</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-gray-400">Percentage</span>
                      <span className="text-white font-bold text-lg">83%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl bg-white/[0.02] border border-white/5">
                      <span className="text-gray-400">Status</span>
                      <span className="text-gray-400 font-bold">Completed</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>

        {/* Call to Action - Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center min-h-[300px]"
        >
          <motion.button
            onClick={() => setIsContactOpen(true)}
            whileHover={{ 
              scale: 1.08, 
              boxShadow: "0 0 40px rgba(255, 0, 102, 0.6), 0 0 20px rgba(255, 0, 102, 0.4)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            className="relative px-12 py-5 bg-primary text-primary-foreground font-bold text-lg rounded-full hover:bg-primary/90 transition-all duration-300 shadow-[0_10px_40px_rgba(255,0,102,0.5)] hover:shadow-[0_15px_50px_rgba(255,0,102,0.7)]"
          >
            {/* Animated background gradient effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-pink-500 opacity-0 blur-lg -z-10"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Mail className="h-6 w-6" />
              </motion.div>
              <span>Contact Us</span>
            </div>
          </motion.button>
        </motion.div>
      </div>
      <ContactDialog open={isContactOpen} onOpenChange={setIsContactOpen} />

      <style>{`
        @property --angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes rotate-angle {
          from { --angle: 0deg; }
          to { --angle: 360deg; }
        }

        .animated-border-card:hover {
          border-color: transparent !important;
        }

        .animated-border-card:hover::after {
          content: "";
          position: absolute;
          inset: 0;
          padding: 2px;
          border-radius: inherit;
          background: conic-gradient(
            from var(--angle),
            transparent 70%,
            hsl(var(--primary)) 90%,
            hsl(var(--primary)) 100%
          );
          -webkit-mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          mask: 
            linear-gradient(#fff 0 0) content-box, 
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
          z-index: 50;
          animation: rotate-angle 3s linear infinite;
          filter: drop-shadow(0 0 6px hsl(var(--primary) / 0.8));
        }
      `}</style>
    </div>
  )
}
