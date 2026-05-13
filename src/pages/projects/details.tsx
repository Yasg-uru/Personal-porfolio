import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/state/hook";
import {
  addComment,
  addReplyOnComment,
  dislike,
  getprojectDetailsById,
  likeOnComment,
  likeOnReply,
} from "@/state/slices/projectSlice/slice";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Badge } from "@/components/ui/badge";

import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  Calendar,
  Users,
  Clock,
  Target,
  Zap,
  Video,
  ChevronDown,
  Home,
  Info,
  Image,
  MessageCircle,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Comment } from "@/state/slices/projectSlice/details";
import { socket } from "@/App";
import CommentComponent from "./comment";
import { useAuthContext } from "@/context/authContext";
import ProjectGallerySwiper from "./project-gallery-swiper";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [activeSection, setActiveSection] = useState("overview");
  const { isAuthenticated } = useAuthContext();
  const { projectDetails, isLoading } = useAppSelector(
    (state) => state.project
  );
  const navigate = useNavigate();

  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const sections = ["overview", "details", "gallery", "videos", "comments"];
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setActiveSection(sectionId);
  };
  useEffect(() => {
    if (id) {
      dispatch(getprojectDetailsById(id))
        .unwrap()
        .then(() => {
          toast({
            title: "Project details fetched successfully",
          });
        })
        .catch((error) => {
          toast({
            title: error,
            variant: "destructive",
          });
        });
    }
  }, [id, dispatch, toast]);

  useEffect(() => {
    const handleNewComment = ({
      projectId,
      comment,
    }: {
      projectId: string;
      comment: Comment;
    }) => {
      if (projectId === id) {
        setComments((prevComments) => [...prevComments, comment]);
      }
    };

    const handleNewReply = ({
      commentId,
      projectId,
      reply,
    }: {
      commentId: string;
      projectId: string;
      reply: Comment;
    }) => {
      if (projectId === id) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, replies: [...comment.replies, reply] }
              : comment
          )
        );
      }
    };

    const handleReplyLikeUpdate = ({
      projectId,
      commentId,
      replyId,
      likes,
    }: {
      projectId: string;
      commentId: string;
      replyId: string;
      likes: any[];
    }) => {
      if (projectId === id) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply._id === replyId ? { ...reply, likes } : reply
                  ),
                }
              : comment
          )
        );
      }
    };

    const handleCommentLikeUpdate = ({
      projectId,
      commentId,
      likes,
    }: {
      projectId: string;
      commentId: string;
      likes: any[];
    }) => {
      if (projectId === id) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId ? { ...comment, likes } : comment
          )
        );
        console.log("this is comments :", comments);
      }
    };

    const handleDislikeUpdate = ({
      projectId,
      commentId,
      dislikes,
    }: {
      projectId: string;
      commentId: string;
      dislikes: any[];
    }) => {
      if (projectId === id) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId ? { ...comment, dislikes } : comment
          )
        );
      }
    };

    socket.on("newComment", handleNewComment);
    socket.on("new_reply", handleNewReply);
    socket.on("reply-like-update", handleReplyLikeUpdate);
    socket.on("commentLike-update", handleCommentLikeUpdate);
    socket.on("dislike-update", handleDislikeUpdate);

    return () => {
      socket.off("newComment", handleNewComment);
      socket.off("new_reply", handleNewReply);
      socket.off("reply-like-update", handleReplyLikeUpdate);
      socket.off("commentLike-update", handleCommentLikeUpdate);
      socket.off("dislike-update", handleDislikeUpdate);
    };
  }, [id]);

  useEffect(() => {
    if (projectDetails && projectDetails.comments.length > 0) {
      setComments(projectDetails.comments);
      console.log("this is intial comments :", projectDetails.comments);
    }
  }, [projectDetails]);

  const handleComment = useCallback(() => {
    if (!isAuthenticated) {
      toast({
        title: "please login to continue",
      });
      navigate("/login");
    }
    if (!newComment.trim()) {
      toast({
        title:
          "You can't send an empty comment. Please write text and then send it.",
        variant: "destructive",
      });
      return;
    }
    if (id) {
      dispatch(addComment({ comment: newComment, projectId: id }))
        .unwrap()
        // .then(() => {
        //   toast({
        //     title: "Comment added successfully",
        //   });
        //   setNewComment("");
        // })
        .catch((error) => {
          toast({
            title: error,
            variant: "destructive",
          });
        });
    }
  }, [newComment, id, dispatch, toast]);

  const handleReply = useCallback(
    (commentId: string, replyText: string) => {
      if (!isAuthenticated) {
        toast({
          title: "please login to continue",
        });
        navigate("/login");
      }
      if (id) {
        dispatch(addReplyOnComment({ commentId, replyText, projectId: id }))
          .unwrap()
          // .then(() => {
          //   toast({
          //     title: "Replied on comment successfully",
          //   });
          // })
          .catch((error) => {
            toast({
              title: error,
              variant: "destructive",
            });
          });
      }
    },
    [id, dispatch, toast]
  );

  const handleReplyLikeUnlike = useCallback(
    (replyId: string, commentId: string) => {
      if (!isAuthenticated) {
        toast({
          title: "please login to continue",
        });
        navigate("/login");
      }
      if (id) {
        dispatch(likeOnReply({ commentId, replyId, projectId: id }))
          .unwrap()
          // .then(() => {
          //   toast({ title: "Liked reply successfully" });
          // })
          .catch((error) => {
            toast({
              title: error,
              variant: "destructive",
            });
          });
      }
    },
    [id, dispatch, toast]
  );

  const handleLike = useCallback(
    (commentId: string) => {
      if (!isAuthenticated) {
        toast({
          title: "please login to continue",
        });
        navigate("/login");
      }
      if (id) {
        dispatch(likeOnComment({ projectId: id, commentId }))
          .unwrap()
          // .then(() => {
          //   toast({
          //     title: "Comment liked successfully",
          //   });
          // })
          .catch((error) => {
            toast({
              title: error,
              variant: "destructive",
            });
          });
      }
    },
    [id, dispatch, toast]
  );

  const handleDislike = useCallback(
    (commentId: string) => {
      if (!isAuthenticated) {
        toast({
          title: "please login to continue",
        });
        navigate("/login");
      }
      if (id) {
        dispatch(dislike({ commentId, projectId: id }))
          .unwrap()
          // .then(() => {
          //   toast({
          //     title: "Disliked successfully",
          //   });
          // })
          .catch((error) => {
            toast({
              title: error,
              variant: "destructive",
            });
          });
      }
    },
    [id, dispatch, toast]
  );

  const handleEdit = useCallback((commentId: string, newText: string) => {
    // Implement edit functionality
    console.log("Edit comment", commentId, newText);
  }, []);

  const handleDelete = useCallback((commentId: string) => {
    // Implement delete functionality
    console.log("Delete comment", commentId);
  }, []);

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
      {/* Fixed control buttons */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="fixed left-8 top-1/2 transform -translate-y-1/2 flex flex-col items-center gap-6 z-50"
      >
        <motion.a
          href="https://github.com/Yasg-uru"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
          whileTap={{ scale: 0.9 }}
          className="text-white/60 hover:text-primary transition-all duration-300 p-3 rounded-full border border-white/20 hover:border-primary"
        >
          <FaGithub size={20} />
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/in/yash-choudhary-28766a259"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
          whileTap={{ scale: 0.9 }}
          className="text-white/60 hover:text-primary transition-all duration-300 p-3 rounded-full border border-white/20 hover:border-primary"
        >
          <FaLinkedin size={20} />
        </motion.a>

        <motion.a
          href="https://x.com/yashc442"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1, color: "hsl(var(--primary))" }}
          whileTap={{ scale: 0.9 }}
          className="text-white/60 hover:text-primary transition-all duration-300 p-3 rounded-full border border-white/20 hover:border-primary"
        >
          <FaTwitter size={20} />
        </motion.a>

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="w-[1px] bg-gradient-to-b from-primary to-transparent"
        />
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
            onClick={() => scrollToSection(section.name)}
          >
            {section.icon}
            {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
          </Button>
        ))}

        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 80 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="w-[1px] bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
      {/* Main content */}
      <div className="relative z-10 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Project header with typewriter animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.45)]"
          >
            <h1 className="text-4xl font-bold mb-4 text-white">{projectDetails.title}</h1>
            <p className="text-xl text-white/70 mb-6">
              {projectDetails.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {projectDetails.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="flex gap-4">
              <Button className="flex items-center gap-2" asChild>
                <a
                  href={projectDetails.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
              <Button
                variant={null}
                className="flex items-center gap-2"
                asChild
              >
                <a
                  href={projectDetails.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  Repository
                </a>
              </Button>
            </div>
          </motion.div>

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
              {projectDetails.features.map((feature, index) => (
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
              {projectDetails.videos.map((video) => (
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

          {/* Comments section */}
          <motion.section
            id="comments"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
          >
            <h2 className="text-primary text-2xl font-bold tracking-widest mb-4">
              Comments ({comments.length})
            </h2>
            <div className="rounded-xl p-8 mb-12 shadow-lg border border-white/10 bg-black/25">
              {/* Comment Input Area */}
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="min-h-[120px] bg-black/30 text-white border-2 border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-in-out"
              />
              <div className="flex justify-end mt-4">
                <Button
                  onClick={handleComment}
                  className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transform transition-all duration-300 ease-in-out hover:scale-105"
                >
                  Post Comment
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-8">
              {comments.map((comment) => (
                <CommentComponent
                  comment={comment}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onReply={handleReply}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onReplyLike={handleReplyLikeUnlike}
                />
              ))}
            </div>
          </motion.section>
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
