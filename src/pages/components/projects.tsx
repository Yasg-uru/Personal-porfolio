import React, { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/state/hook";
import { getProjects } from "@/state/slices/projectSlice/slice";
import ProjectsCarousel from "@/components/ProjectsCarousel";

const Projects: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getProjects())
      .unwrap()
      .then(() => {
        toast({
          title: "Projects fetched successfully",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  }, [dispatch, toast]);

  const featuredProjects = projects.filter(
    (project) => project.category === "featured"
  );
  const practiceProjects = projects.filter(
    (project) => project.category === "practice"
  );

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
