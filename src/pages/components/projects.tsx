import React, { useEffect } from "react"
import { useToast } from "@/hooks/use-toast"
import { useProjects } from "@/hooks/queries/useProjects"
import ProjectsCarousel from "@/components/ProjectsCarousel"

const Projects: React.FC = () => {
  const { data: projects = [], error } = useProjects()
  const { toast } = useToast()

  useEffect(() => {
    if (error) {
      toast({
        title: "Failed to fetch projects",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      })
    }
  }, [error, toast])

  const featuredProjects = projects.filter(
    (project: any) => project.category === "featured"
  )
  const practiceProjects = projects.filter(
    (project: any) => project.category === "practice"
  )

  return (
    <section
      id="projects"
      className="container mx-auto px-4 py-16 md:px-6 md:py-24"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">My Projects</h2>
      <div className="space-y-20">
        {featuredProjects.length > 0 && (
          <ProjectsCarousel
            projects={featuredProjects}
            title="Featured Projects"
          />
        )}
        {practiceProjects.length > 0 && (
          <ProjectsCarousel
            projects={practiceProjects}
            title="Practice Projects"
          />
        )}
      </div>
    </section>
  );
};

export default Projects;
