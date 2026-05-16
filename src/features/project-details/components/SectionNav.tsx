"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import { Home, Info, Image, Video, MessageCircle } from "lucide-react"

type Props = {
  activeSection: string
  onNavigate: (section: string) => void
}

export default function SectionNav({ activeSection, onNavigate }: Props) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed left-6 bottom-20 flex flex-col items-center gap-6 z-50"
      >
        <a href="https://github.com/Yasg-uru" target="_blank" rel="noreferrer" className="text-white/60 hover:text-primary hover:-translate-y-1 transition-all">
          <FaGithub size={20} />
        </a>
        <a href="https://www.linkedin.com/in/yash-choudhary-28766a259" target="_blank" rel="noreferrer" className="text-white/60 hover:text-primary hover:-translate-y-1 transition-all">
          <FaLinkedin size={20} />
        </a>
        <a href="https://x.com/yashc442" target="_blank" rel="noreferrer" className="text-white/60 hover:text-primary hover:-translate-y-1 transition-all">
          <FaTwitter size={20} />
        </a>
        <div className="h-24 w-[1px] bg-white/15" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed right-6 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-6 z-50"
      >
        {[
          { name: "overview", icon: <Home size={20} /> },
          { name: "details", icon: <Info size={20} /> },
          { name: "gallery", icon: <Image size={20} /> },
          { name: "videos", icon: <Video size={20} /> },
          { name: "comments", icon: <MessageCircle size={20} /> },
        ].map((section) => (
          <Button
            key={section.name}
            variant={null}
            className={`p-2 text-sm flex items-center gap-2 ${
              activeSection === section.name
                ? "text-primary hover:text-primary"
                : "text-white/60 hover:text-primary"
            } hover:-translate-y-1 transition-all`}
            onClick={() => onNavigate(section.name)}
          >
            {section.icon}
            {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
          </Button>
        ))}

        <div className="h-24 w-[1px] bg-white/15" />
      </motion.div>
    </>
  )
}
