import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useProjectDetails } from "@/hooks/queries/useProjects"
import {
  useAddComment,
  useAddReply,
  useDislikeComment,
  useLikeComment,
  useLikeReply,
} from "@/hooks/mutations/useProjectMutations"
import type { Comment } from "../types"
import { socket } from "@/App"
import { useAuthContext } from "@/context/authContext"

export const useProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const { toast } = useToast()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthContext()
  
  const { data: projectDetails, isLoading } = useProjectDetails(id || "")
  const addCommentMutation = useAddComment()
  const addReplyMutation = useAddReply()
  const likeCommentMutation = useLikeComment()
  const likeReplyMutation = useLikeReply()
  const dislikeMutation = useDislikeComment()

  const [newComment, setNewComment] = useState("")
  const [activeSection, setActiveSection] = useState("overview")
  const [comments, setComments] = useState<Comment[]>([])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setActiveSection(sectionId)
  }, [])

  useEffect(() => {
    const handleNewComment = ({
      projectId,
      comment,
    }: {
      projectId: string
      comment: Comment
    }) => {
      if (projectId === id) {
        setComments((previousComments) => [...previousComments, comment])
      }
    }

    const handleNewReply = ({
      commentId,
      projectId,
      reply,
    }: {
      commentId: string
      projectId: string
      reply: Comment
    }) => {
      if (projectId === id) {
        setComments((previousComments) =>
          previousComments.map((comment) =>
            comment._id === commentId
              ? { ...comment, replies: [...comment.replies, reply] }
              : comment
          )
        )
      }
    }

    const handleReplyLikeUpdate = ({
      projectId,
      commentId,
      replyId,
      likes,
    }: {
      projectId: string
      commentId: string
      replyId: string
      likes: any[]
    }) => {
      if (projectId === id) {
        setComments((previousComments) =>
          previousComments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  replies: comment.replies.map((reply) =>
                    reply._id === replyId ? { ...reply, likes } : reply
                  ),
                }
              : comment
          )
        )
      }
    }

    const handleCommentLikeUpdate = ({
      projectId,
      commentId,
      likes,
    }: {
      projectId: string
      commentId: string
      likes: any[]
    }) => {
      if (projectId === id) {
        setComments((previousComments) =>
          previousComments.map((comment) =>
            comment._id === commentId ? { ...comment, likes } : comment
          )
        )
      }
    }

    const handleDislikeUpdate = ({
      projectId,
      commentId,
      dislikes,
    }: {
      projectId: string
      commentId: string
      dislikes: any[]
    }) => {
      if (projectId === id) {
        setComments((previousComments) =>
          previousComments.map((comment) =>
            comment._id === commentId ? { ...comment, dislikes } : comment
          )
        )
      }
    }

    socket.on("newComment", handleNewComment)
    socket.on("new_reply", handleNewReply)
    socket.on("reply-like-update", handleReplyLikeUpdate)
    socket.on("commentLike-update", handleCommentLikeUpdate)
    socket.on("dislike-update", handleDislikeUpdate)

    return () => {
      socket.off("newComment", handleNewComment)
      socket.off("new_reply", handleNewReply)
      socket.off("reply-like-update", handleReplyLikeUpdate)
      socket.off("commentLike-update", handleCommentLikeUpdate)
      socket.off("dislike-update", handleDislikeUpdate)
    }
  }, [id])

  useEffect(() => {
    if (projectDetails?.comments?.length) {
      setComments(projectDetails.comments)
    }
  }, [projectDetails])

  const handleComment = useCallback(() => {
    if (!isAuthenticated) {
      toast({ title: "please login to continue" })
      navigate("/login")
      return
    }

    if (!newComment.trim()) {
      toast({
        title: "You can't send an empty comment. Please write text and then send it.",
        variant: "destructive",
      })
      return
    }

    if (id) {
      addCommentMutation.mutate(
        { projectId: id, comment: newComment },
        {
          onSuccess: () => {
            setNewComment("")
          },
          onError: (error) => {
            toast({
              title: "Failed to add comment",
              description: error instanceof Error ? error.message : "Unknown error",
              variant: "destructive",
            })
          },
        }
      )
    }
  }, [id, isAuthenticated, navigate, newComment, toast, addCommentMutation])

  const handleReply = useCallback(
    (commentId: string, replyText: string) => {
      if (!isAuthenticated) {
        toast({ title: "please login to continue" })
        navigate("/login")
        return
      }

      if (id) {
        addReplyMutation.mutate(
          { projectId: id, commentId, replyText },
          {
            onError: (error) => {
              toast({
                title: "Failed to add reply",
                description: error instanceof Error ? error.message : "Unknown error",
                variant: "destructive",
              })
            },
          }
        )
      }
    },
    [id, isAuthenticated, navigate, toast, addReplyMutation]
  )

  const handleReplyLikeUnlike = useCallback(
    (replyId: string, commentId: string) => {
      if (!isAuthenticated) {
        toast({ title: "please login to continue" })
        navigate("/login")
        return
      }

      if (id) {
        likeReplyMutation.mutate(
          { projectId: id, commentId, replyId },
          {
            onError: (error) => {
              toast({
                title: "Failed to like reply",
                description: error instanceof Error ? error.message : "Unknown error",
                variant: "destructive",
              })
            },
          }
        )
      }
    },
    [id, isAuthenticated, navigate, toast, likeReplyMutation]
  )

  const handleLike = useCallback(
    (commentId: string) => {
      if (!isAuthenticated) {
        toast({ title: "please login to continue" })
        navigate("/login")
        return
      }

      if (id) {
        likeCommentMutation.mutate(
          { projectId: id, commentId },
          {
            onError: (error) => {
              toast({
                title: "Failed to like comment",
                description: error instanceof Error ? error.message : "Unknown error",
                variant: "destructive",
              })
            },
          }
        )
      }
    },
    [id, isAuthenticated, navigate, toast, likeCommentMutation]
  )

  const handleDislike = useCallback(
    (commentId: string) => {
      if (!isAuthenticated) {
        toast({ title: "please login to continue" })
        navigate("/login")
        return
      }

      if (id) {
        dislikeMutation.mutate(
          { projectId: id, commentId },
          {
            onError: (error) => {
              toast({
                title: "Failed to dislike comment",
                description: error instanceof Error ? error.message : "Unknown error",
                variant: "destructive",
              })
            },
          }
        )
      }
    },
    [id, isAuthenticated, navigate, toast, dislikeMutation]
  )

  const handleEdit = useCallback((commentId: string, newText: string) => {
    console.log("Edit comment", commentId, newText)
  }, [])

  const handleDelete = useCallback((commentId: string) => {
    console.log("Delete comment", commentId)
  }, [])

  return {
    id,
    projectDetails,
    isLoading,
    comments,
    setComments,
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
  }
}
