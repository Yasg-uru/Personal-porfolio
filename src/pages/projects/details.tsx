"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/state/hook";
import { getprojectDetailsById } from "@/state/slices/projectSlice/slice";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Heart,
  MessageSquare,
  Github,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Reply,
  MoreVertical,
  Edit,
  Trash2,
  Calendar,
  Users,
  Clock,
  Target,
  Zap,
  Briefcase,
  FileText,
  Video,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { Comment, ProjectDetails } from "@/state/slices/projectSlice/details";

const ProjectDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  const { projectDetails, isLoading } = useAppSelector(
    (state) => state.project
  );

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

  const handleComment = async () => {
    // Implement comment submission
  };

  const handleReply = async (commentId: string) => {
    // Implement reply submission
  };

  const handleLike = async (commentId: string) => {
    // Implement like functionality
  };

  const handleDislike = async (commentId: string) => {
    // Implement dislike functionality
  };

  const handleEdit = async (commentId: string, newText: string) => {
    // Implement edit functionality
  };

  const handleDelete = async (commentId: string) => {
    // Implement delete functionality
  };

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

  const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => (
    <Card className="bg-black border-gray-800 mb-4">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={comment.userId.profileUrl} />
            <AvatarFallback>
              {comment.userId.email[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-200">
                {comment.userId.email}
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">
                  {new Date(comment.timestamp).toLocaleDateString()}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-white"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-black border-gray-700"
                  >
                    <DropdownMenuItem
                      onClick={() => handleEdit(comment._id, comment.comment)}
                      className="text-gray-200 focus:bg-black focus:text-white"
                    >
                      <Edit className="mr-2 h-4 w-4" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleDelete(comment._id)}
                      className="text-gray-200 focus:bg-black focus:text-white"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <p className="mt-2 text-gray-300">{comment.comment}</p>
            <div className="mt-4 flex items-center gap-4">
              <Button
                variant={null}
                size="sm"
                className="flex items-center gap-1 text-gray-400 hover:text-white"
                onClick={() => handleLike(comment._id)}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{comment.likes.length}</span>
              </Button>
              <Button
                variant={null}
                size="sm"
                className="flex items-center gap-1 text-gray-400 hover:text-white"
                onClick={() => handleDislike(comment._id)}
              >
                <ThumbsDown className="h-4 w-4" />
                <span>{comment.dislikes.length}</span>
              </Button>
              <Button
                variant={null}
                size="sm"
                className="flex items-center gap-1 text-gray-400 hover:text-white"
                onClick={() => setReplyingTo(comment._id)}
              >
                <Reply className="h-4 w-4" />
                <span>Reply</span>
              </Button>
            </div>
            {replyingTo === comment._id && (
              <div className="mt-4">
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="min-h-[100px] bg-black border-gray-700 text-white"
                />
                <div className="mt-2 flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setReplyingTo(null)}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" onClick={() => handleReply(comment._id)}>
                    Reply
                  </Button>
                </div>
              </div>
            )}
            {comment.replies.length > 0 && (
              <div className="mt-4 space-y-4 pl-8 border-l-2 border-gray-800">
                {comment.replies.map((reply) => (
                  <div key={reply._id} className="flex gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={reply.userId.profileUrl} />
                      <AvatarFallback>
                        {reply.userId.email[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-200">
                          {reply.userId.email}
                        </span>
                        <span className="text-sm text-gray-400">
                          {new Date(reply.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="mt-1 text-gray-300">{reply.comment}</p>
                      <Button
                        variant={null}
                        size="sm"
                        className="mt-2 flex items-center gap-1 text-gray-400 hover:text-white"
                      >
                        <Heart className="h-4 w-4" />
                        <span>{reply.likes.length}</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black p-8">
      <div className="max-w-6xl mx-auto mt-10">
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
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-white hover:text-gray-300">
                      Target Audience
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside text-gray-300">
                        {projectDetails.targetAudience.map(
                          (audience, index) => (
                            <li key={index}>{audience}</li>
                          )
                        )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-white hover:text-gray-300">
                      Challenges & Learnings
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            Challenges
                          </h4>
                          <ul className="list-disc list-inside text-gray-300">
                            {projectDetails.challenges.map(
                              (challenge, index) => (
                                <li key={index}>{challenge}</li>
                              )
                            )}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2">
                            Learnings
                          </h4>
                          <ul className="list-disc list-inside text-gray-300">
                            {projectDetails.learnings.map((learning, index) => (
                              <li key={index}>{learning}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-white hover:text-gray-300">
                      Accessibility Features
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc list-inside text-gray-300">
                        {projectDetails.accessibilityFeatures.map(
                          (feature, index) => (
                            <li key={index}>{feature}</li>
                          )
                        )}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projectDetails.gallery.map((image) => (
                <img
                  key={image._id}
                  src={image.url}
                  alt={image.title}
                  className="rounded-lg object-cover w-full h-48"
                />
              ))}
            </div>
          </TabsContent>

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
              {projectDetails.comments.map((comment) => (
                <CommentComponent key={comment._id} comment={comment} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
