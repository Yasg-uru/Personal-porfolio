import { useMutation, useQueryClient } from "@tanstack/react-query"
import * as projectsService from "@/services/projects.service"

export const useLikeProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (projectId: string) => projectsService.likeProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] })
    },
  })
}

export const useAddComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ projectId, comment }: { projectId: string; comment: string }) =>
      projectsService.postComment(projectId, comment),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] })
    },
  })
}

export const useAddReply = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      projectId,
      commentId,
      replyText,
    }: {
      projectId: string
      commentId: string
      replyText: string
    }) => projectsService.postReply(projectId, commentId, replyText),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] })
    },
  })
}

export const useLikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ projectId, commentId }: { projectId: string; commentId: string }) =>
      projectsService.likeComment(projectId, commentId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] })
    },
  })
}

export const useLikeReply = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      projectId,
      commentId,
      replyId,
    }: {
      projectId: string
      commentId: string
      replyId: string
    }) => projectsService.likeReply(projectId, commentId, replyId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] })
    },
  })
}

export const useDislikeComment = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ projectId, commentId }: { projectId: string; commentId: string }) =>
      projectsService.dislike(projectId, commentId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({ queryKey: ["project", projectId] })
    },
  })
}
