"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

type Props = {
  project: any
}

export default function ProjectHeader({ project }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
    >
      <h1 className="text-4xl font-bold mb-4 text-white">{project.title}</h1>
      <p className="text-xl text-white/70 mb-6">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.technologies.map((tech: string, index: number) => (
          <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
            {tech}
          </Badge>
        ))}
      </div>
      <div className="flex gap-4">
        <Button className="flex items-center gap-2" asChild>
          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </a>
        </Button>
        <Button variant={null} className="flex items-center gap-2" asChild>
          <a href={project.repository} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4" />
            Repository
          </a>
        </Button>
      </div>
    </motion.div>
  )
}
