import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Users, Clock, Target, Zap, Video, ChevronDown } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ProjectGallerySwiper from "./project-gallery-swiper";
import ProjectHeader from "@/features/project-details/components/ProjectHeader";
import SectionNav from "@/features/project-details/components/SectionNav";
import CommentPanel from "@/features/project-details/components/CommentPanel";
// social icons moved into SectionNav component
import { useProjectDetailsPage } from "@/features/project-details/hooks/useProjectDetailsPage";

const ProjectDetailsPage: React.FC = () => {
  const {
    projectDetails,
    isLoading,
    comments,
    newComment,
    setNewComment,
    activeSection,
    scrollToSection,
    handleComment,
    handleReply,
    handleReplyLikeUnlike,
    handleLike,
    handleDislike,
    handleEdit,
    handleDelete,
  } = useProjectDetailsPage();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!projectDetails) return null;

  return (
    <div className="min-h-screen bg-black text-white transition-colors duration-300 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-black to-black" />
      <div className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-primary/20 blur-[130px]" />
      <div className="pointer-events-none absolute top-[35%] -left-20 h-64 w-64 rounded-full bg-primary/15 blur-[120px]" />
      <SectionNav activeSection={activeSection} onNavigate={scrollToSection} />
      {/* Main content */}
      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          <ProjectHeader project={projectDetails} />

          {/* Sections (Overview, Details, Gallery, etc.) */}
          <motion.section
            id="overview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-16 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
          >
            <h2 className="text-3xl font-semibold mb-6 text-white">Project Overview</h2>
            <p className="text-white/70 whitespace-pre-line mb-8">
              {projectDetails.overview}
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-white">Key Features</h3>
            <ul className="list-disc list-inside text-white/70 space-y-2">
              {projectDetails.features.map((feature: string, index: number) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </motion.section>

          {/* Details section */}
          <motion.section
            id="details"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-16 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
          >
            <h2 className="text-3xl font-semibold mb-6 text-white">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 rounded-2xl border border-white/10 bg-black/25 p-5">
                <div className="flex items-center gap-2 text-white/80">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>
                    Created:{" "}
                    {new Date(projectDetails.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span>
                    Updated:{" "}
                    {new Date(projectDetails.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Team Size: {projectDetails.teamMembers.length}</span>
                </div>
              </div>
              <div className="space-y-4 rounded-2xl border border-white/10 bg-black/25 p-5">
                <div className="flex items-center gap-2 text-white/80">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>
                    Estimated Time: {projectDetails.estimatedCompletionTime}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Target className="h-5 w-5 text-primary" />
                  <span>Difficulty: {projectDetails.difficultyLevel}</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Platform: {projectDetails.deploymentPlatform}</span>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Gallery section */}
          <motion.section
            id="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mb-16 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
          >
            <h2 className="text-3xl font-semibold mb-6 text-white">Project Gallery</h2>
            <ProjectGallerySwiper images={projectDetails.gallery} />
          </motion.section>

          {/* Videos section */}
          <motion.section
            id="videos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-16 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
          >
            <h2 className="text-2xl font-bold text-primary mb-8">
              Project Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectDetails.videos.map((video: any) => (
                <motion.div
                  key={video._id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gradient-to-r from-primary to-primary/70 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <video
                    controls
                    className="w-full h-48 object-cover transition-all duration-500 hover:scale-105"
                    poster="/placeholder.svg"
                  >
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="p-4 bg-background/80">
                    <h3 className="text-lg font-semibold text-white mb-2">
                      {video.title}
                    </h3>
                    <Button
                      variant={null}
                      className="w-full text-primary border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      asChild
                    >
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Video className="h-4 w-4 mr-2 text-primary" />
                        Watch Full Video
                      </a>
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <CommentPanel
            comments={comments}
            newComment={newComment}
            setNewComment={setNewComment}
            onPostComment={handleComment}
            onLike={handleLike}
            onDislike={handleDislike}
            onReply={handleReply}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onReplyLike={handleReplyLikeUnlike}
          />
        </div>
      </div>

      {/* Scroll to top button */}
      <Button
        variant="secondary"
        className="fixed bottom-8 right-8 rounded-full p-3"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ChevronDown className="h-6 w-6 transform rotate-180" />
      </Button>
    </div>
  );
};

export default ProjectDetailsPage;
