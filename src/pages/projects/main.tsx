import { useToast } from "@/hooks/use-toast"
import { useProjects } from "@/hooks/queries/useProjects"
import { useLikeProject } from "@/hooks/mutations/useProjectMutations"
import { useEffect, useState } from "react"
import type React from "react"
import ProjectsCarousel from "@/components/ProjectsCarousel"
import { Loader } from "lucide-react"

type MousePosition = {
  x: number
  y: number
  active: boolean
}

const Projects: React.FC = () => {
  const { data: projects = [], isLoading, error } = useProjects()
  const likeProjectMutation = useLikeProject()
  const { toast } = useToast()
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    active: false,
  })

  useEffect(() => {
    if (error) {
      toast({
        title: "Failed to fetch projects",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      })
    }
  }, [error, toast])

  const handleLike = (projectId: string) => {
    likeProjectMutation.mutate(projectId, {
      onError: (error) => {
        toast({
          title: "Failed to like project",
          description: error instanceof Error ? error.message : "Unknown error",
          variant: "destructive",
        })
      },
    })
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
        active: true,
      })
    }

    const handleMouseLeave = () => {
      setMousePosition((prev) => ({ ...prev, active: false }))
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  if (isLoading) {
  return (
    <div className="min-h-screen  flex items-center justify-center text-foreground transition-colors duration-300">
      <Loader className="w-6 h-6 text-primary animate-spin" />
    </div>
  );
}

  if (projects.length === 0) {
    return (
      <div className="min-h-screen  flex items-center justify-center text-foreground transition-colors duration-300">
        <p className="text-xl">No projects found</p>
      </div>
    );
  }

  return (
    <section id="projects" className="relative overflow-hidden">
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: mousePosition.active
            ? `radial-gradient(1100px circle at ${mousePosition.x}px ${mousePosition.y}px, hsl(var(--primary) / 0.14), transparent 42%)`
            : "radial-gradient(1100px circle at 50% 18%, hsl(var(--primary) / 0.07), transparent 48%)",
          opacity: mousePosition.active ? 0.95 : 0.8,
          mixBlendMode: "screen",
        }}
      />
      <div className="relative z-10 min-h-screen p-8 pt-20 text-foreground transition-colors duration-300">
      <div className="mx-auto max-w-7xl">
      <div className="mb-12 text-center">
          {/* Updated heading */}
          <h1 className="text-primary text-2xl font-bold tracking-widest mb-4">
            My Projects
          </h1>
          <p className="text-foreground text-lg font-medium">
            Check out some of the amazing projects I’ve built as a full-stack developer
          </p>
        </div>
        <ProjectsCarousel projects={projects} title="" onLike={handleLike} />
      </div>
    </div>
    </section>
  );
};

export default Projects;
