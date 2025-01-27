"use client";

import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/state/hook";
import { getProjects } from "@/state/slices/projectSlice/slice";
import React, { useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  // Heart,
  MessageSquare,
  Eye,
  // Calendar,
  Github,
  ExternalLink,
  // GitFork,
  ThumbsUp,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

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
  if(projects.length===0){
    return <div>
      project not found
    </div>
  }
  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-white text-2xl font-semibold mb-8">Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card
              key={project._id}
              onClick={() => handleClick(project._id)}
              className="bg-black border-[#2C2C2C] hover:border-[#3C3C3C] transition-all duration-200 p-6"
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
                  <h2 className="text-white font-medium truncate">
                    {project.title}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <Github className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400 truncate">
                      {/* {project.repository.split("/").slice(-2).join("/") || } */}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <p className="text-gray-400 text-sm line-clamp-2">
                  {project.description}
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#2C2C2C] text-gray-300 hover:bg-[#3C3C3C]"
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
                    className="p-2 hover:bg-[#2C2C2C] rounded-lg transition-colors"
                  >
                    <Github className="w-4 h-4 text-gray-400" />
                  </Link>
                  <Link
                    to={project.liveDemo}
                    className="p-2 hover:bg-[#2C2C2C] rounded-lg transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 text-gray-400" />
                  </Link>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-[#2C2C2C] flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-sm text-gray-400">
                  created {new Date(project.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;
