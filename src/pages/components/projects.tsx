
import React, { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useAppDispatch, useAppSelector } from "@/state/hook"
import { getProjects } from "@/state/slices/projectSlice/slice"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, MessageSquare, Eye, Calendar, Github, ExternalLink, GitFork, ThumbsUp } from 'lucide-react'
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const ProjectCard: React.FC<{ project: any; index: number }> = ({ project, index }) => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card
        onClick={() => navigate(`/details/${project._id}`)}
        className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all duration-200 p-6 cursor-pointer"
      >
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
            <img
              src={project.gallery[0]?.url || "/placeholder.svg"}
              alt=""
              className="w-6 h-6 object-cover rounded"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-white font-medium truncate">{project.title}</h2>
            <div className="flex items-center gap-2 mt-1">
              <Github className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-400 truncate">
                {project.repository.split("/").slice(-2).join("/")}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-gray-400 text-sm line-clamp-2">{project.description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.slice(0, 3).map((tech: string, index: number) => (
            <Badge
              key={index}
              variant="secondary"
              className="bg-gray-700 text-gray-300 hover:bg-gray-600"
            >
              {tech}
            </Badge>
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{project.analytics?.views || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{project.likes?.length || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{project.comments?.length || 0}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to={project.repository}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Github className="w-4 h-4 text-gray-400" />
            </Link>
            <Link
              to={project.liveDemo}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </Link>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-green-500" />
            <span className="text-sm text-gray-400">
              Created {new Date(project.updatedAt).toLocaleDateString()}
            </span>
          </div>
          <Button
            className="bg-white"
            variant={'destructive'} 
            
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click from firing
              navigate(`/details/${project._id}`);
            }}
          >
            View Full Details
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

const Projects: React.FC = () => {
  const dispatch = useAppDispatch()
  const { projects } = useAppSelector((state) => state.project)
  const { toast } = useToast()

  useEffect(() => {
    dispatch(getProjects())
      .unwrap()
      .then(() => {
        toast({
          title: "Projects fetched successfully",
        })
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        })
      })
  }, [dispatch, toast])

  const featuredProjects = projects.filter((project) => project.category === "featured")
  const practiceProjects = projects.filter((project) => project.category === "practice")

  return (
    <section id="projects" className="container mx-auto px-4 py-16 md:px-6 md:py-24">
      <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
      <div className="space-y-16">
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gray-300">Featured Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-6 text-gray-300">Practice Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {practiceProjects.map((project, index) => (
              <ProjectCard key={project._id} project={project} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects

