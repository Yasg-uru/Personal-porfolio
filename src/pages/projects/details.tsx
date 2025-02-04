import React, { useEffect, useState, useCallback, useMemo } from "react";
import {  useNavigate, useParams } from "react-router-dom";
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
import {
  Github,
  ExternalLink,
  Calendar,
  Users,
  Clock,
  Target,
  Zap,
  Video,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Comment } from "@/state/slices/projectSlice/details";
import { socket } from "@/App";
import CommentComponent from "./comment";
import { useAuthContext } from "@/context/authContext";
import { Gallery } from "./createproject/gallery";

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const { isAuthenticated } = useAuthContext();
  const { projectDetails, isLoading } = useAppSelector(
    (state) => state.project
  );
  const navigate = useNavigate();

  const [comments, setComments] = useState<Comment[]>([]);

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
    console.log('this is comments :',comments);
        
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
      console.log('this is intial comments :',projectDetails.comments)
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

  const memoizedComments = useMemo(() => comments, [comments]);

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
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto mt-10">
        {/* Project header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {projectDetails.title}
          </h1>
          <p className="text-xl text-gray-400 mb-6">
            {projectDetails.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {projectDetails.technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-black text-gray-300"
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
              variant="outline"
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
        </div>

        {/* Project details tabs */}
        <Tabs defaultValue="overview" className="mb-8">
          <TabsList className="bg-black p-1 rounded-lg">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="comments">
              Comments ({projectDetails.comments.length})
            </TabsTrigger>
          </TabsList>

          {/* Overview tab */}
          <TabsContent value="overview" className="mt-6">
            <Card className="bg-black border-gray-800">
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-4">
                  Project Overview
                </h2>
                <p className="text-gray-300 whitespace-pre-line mb-6">
                  {projectDetails.overview}
                </p>

                <h3 className="text-xl font-semibold text-white mt-6 mb-3">
                  Key Features
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {projectDetails.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Details tab */}
          <TabsContent value="details" className="mt-6">
            <Card className="bg-black border-gray-800">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-white hover:text-gray-300">
                      Project Information
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <span>
                            Created:{" "}
                            {new Date(
                              projectDetails.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-gray-400" />
                          <span>
                            Updated:{" "}
                            {new Date(
                              projectDetails.updatedAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-gray-400" />
                          <span>
                            Team Size: {projectDetails.teamMembers.length}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5 text-gray-400" />
                          <span>
                            Estimated Time:{" "}
                            {projectDetails.estimatedCompletionTime}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="h-5 w-5 text-gray-400" />
                          <span>
                            Difficulty: {projectDetails.difficultyLevel}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-gray-400" />
                          <span>
                            Platform: {projectDetails.deploymentPlatform}
                          </span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  {/* Add other accordion items for Target Audience, Challenges & Learnings, and Accessibility Features */}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gallery tab */}
          <TabsContent value="gallery" className="mt-6">
          <Gallery images={projectDetails.gallery} />
          </TabsContent>

          {/* Videos tab */}
          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projectDetails.videos.map((video) => (
                <div
                  key={video._id}
                  className="bg-black rounded-lg overflow-hidden"
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
                    <h3 className="text-lg font-semibold text-white mb-2">
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
          </TabsContent>

          {/* Comments tab */}
          <TabsContent value="comments" className="mt-6">
            <Card className="bg-black border-gray-800 mb-6">
              <CardContent className="p-4">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="min-h-[100px] bg-black border-gray-700 text-white"
                />
                <div className="mt-2 flex justify-end">
                  <Button onClick={handleComment}>Post Comment</Button>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-4">
              {memoizedComments.map((comment) => (
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
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
