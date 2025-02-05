import React, { useEffect, useState, useCallback, useMemo } from "react";
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
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Gallery } from "./createproject/gallery";
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
    <div className="min-h-screen bg-black text-white">
      {/* Fixed control buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="fixed left-6 bottom-20 flex flex-col items-center gap-6 z-50"
      >
        <a
          href="https://github.com/Yasg-uru"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#64ffda] hover:-translate-y-1 transition-all"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://www.linkedin.com/in/yash-choudhary-28766a259"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#64ffda] hover:-translate-y-1 transition-all"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://x.com/yashc442"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-[#64ffda] hover:-translate-y-1 transition-all"
        >
          <FaTwitter size={20} />
        </a>
        <div className="h-24 w-[1px] bg-gray-400" />
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
                ? "text-[#64ffda] hover:text-[#64ffda]"
                : "text-gray-400 hover:text-[#64ffda]"
            } hover:-translate-y-1 transition-all`}
            onClick={() => scrollToSection(section.name)}
          >
            {section.icon}
            {section.name.charAt(0).toUpperCase() + section.name.slice(1)}
          </Button>
        ))}

        <div className="h-24 w-[1px] bg-gray-400" />
      </motion.div>
      {/* Main content */}
      <div className="pt-20 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Project header with typewriter animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h1 className="text-4xl font-bold mb-4">{projectDetails.title}</h1>
            <p className="text-xl text-gray-300 mb-6">
              {projectDetails.description}
            </p>
            <div className="flex flex-wrap gap-2 mb-6">
              {projectDetails.technologies.map((tech, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-blue-500/10 text-blue-400"
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
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold mb-6">Project Overview</h2>
            <p className="text-gray-300 whitespace-pre-line mb-8">
              {projectDetails.overview}
            </p>
            <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
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
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold mb-6">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <span>
                    Created:{" "}
                    {new Date(projectDetails.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-400" />
                  <span>
                    Updated:{" "}
                    {new Date(projectDetails.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-400" />
                  <span>Team Size: {projectDetails.teamMembers.length}</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <span>
                    Estimated Time: {projectDetails.estimatedCompletionTime}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  <span>Difficulty: {projectDetails.difficultyLevel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-400" />
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
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold mb-6">Project Gallery</h2>
            <Gallery images={projectDetails.gallery} />
          </motion.section>

          {/* Videos section */}
          <motion.section
            id="videos"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-semibold mb-6">Project Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projectDetails.videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-gray-800 rounded-lg overflow-hidden"
                >
                  <video
                    controls
                    className="w-full h-48 object-cover"
                    poster="/placeholder.svg"
                  >
                    <source src={video.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">
                      {video.title}
                    </h3>
                    <Button variant="outline" className="w-full" asChild>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Video className="h-4 w-4 mr-2" />
                        Watch Full Video
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Comments section */}
          <motion.section
            id="comments"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h2 className="text-3xl font-semibold mb-6">
              Comments ({comments.length})
            </h2>
            <div className="bg-gray-800 rounded-lg p-6 mb-8">
              <Textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="min-h-[100px] bg-gray-700 border-gray-600 text-white mb-4"
              />
              <div className="flex justify-end">
                <Button onClick={handleComment}>Post Comment</Button>
              </div>
            </div>
            <div className="space-y-6">
              {comments.map((comment) => (
                <CommentComponent
                  key={comment._id}
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
