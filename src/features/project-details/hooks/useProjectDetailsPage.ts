import { useCallback, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"
import { useAppDispatch, useAppSelector } from "@/state/hook"
import {
  addComment,
  addReplyOnComment,
  dislike,
  getprojectDetailsById,
  likeOnComment,
  likeOnReply,
} from "@/state/slices/projectSlice/slice"
import type { Comment } from "@/state/slices/projectSlice/details"
import { socket } from "@/App"
import { useAuthContext } from "@/context/authContext"

export const useProjectDetailsPage = () => {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()
  const { toast } = useToast()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthContext()
  const { projectDetails, isLoading } = useAppSelector((state) => state.project)

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
    if (!id) return

    dispatch(getprojectDetailsById(id))
      .unwrap()
      .then(() => {
        toast({ title: "Project details fetched successfully" })
      })
      .catch((error) => {
        toast({ title: error, variant: "destructive" })
      })
  }, [id, dispatch, toast])

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
      dispatch(addComment({ comment: newComment, projectId: id }))
        .unwrap()
        .catch((error) => {
          toast({ title: error, variant: "destructive" })
        })
    }
  }, [dispatch, id, isAuthenticated, navigate, newComment, toast])

  const handleReply = useCallback(
    (commentId: string, replyText: string) => {
      if (!isAuthenticated) {
        toast({ title: "please login to continue" })
        navigate("/login")
        return
      }

      if (id) {
        dispatch(addReplyOnComment({ commentId, replyText, projectId: id }))
          .unwrap()
          .catch((error) => {
            toast({ title: error, variant: "destructive" })
          })
      }
    },
    [dispatch, id, isAuthenticated, navigate, toast]
  )

  const handleReplyLikeUnlike = useCallback(
    (replyId: string, commentId: string) => {
      if (!isAuthenticated) {
        toast({ title: "please login to continue" })
        navigate("/login")
        return
      }

      if (id) {
        dispatch(likeOnReply({ commentId, replyId, projectId: id }))
          .unwrap()
          .catch((error) => {
            toast({ title: error, variant: "destructive" })
          })
      }
    },
    [dispatch, id, isAuthenticated, navigate, toast]
  )

  const handleLike = useCallback(
    (commentId: string) => {
      if (!isAuthenticated) {
        toast({ title: "please login to continue" })
        navigate("/login")
        return
      }

      if (id) {
        dispatch(likeOnComment({ projectId: id, commentId }))
          .unwrap()
          .catch((error) => {
            toast({ title: error, variant: "destructive" })
          })
      }
    },
    [dispatch, id, isAuthenticated, navigate, toast]
  )

  const handleDislike = useCallback(
    (commentId: string) => {
      if (!isAuthenticated) {
        toast({ title: "please login to continue" })
        navigate("/login")
        return
      }

      if (id) {
        dispatch(dislike({ commentId, projectId: id }))
          .unwrap()
          .catch((error) => {
            toast({ title: error, variant: "destructive" })
          })
      }
    },
    [dispatch, id, isAuthenticated, navigate, toast]
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
