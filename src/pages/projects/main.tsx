import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/state/hook";
import { getProjects, likeProject } from "@/state/slices/projectSlice/slice";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";


import type React from "react";

import ProjectCard from "./projectCard";

const Projects: React.FC = () => {
  const dispatch = useAppDispatch();
  const { projects } = useAppSelector((state) => state.project);
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  const handleLike = (projectId: string) => {
    dispatch(likeProject(projectId))
      .unwrap()

      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };

  if (projects.length === 0) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-white text-xl">No projects found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-4xl font-bold mb-8 text-center">
          My Projects
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project._id}
              project={project}
              index={index}
              onLike={handleLike}
              onClick={handleClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
