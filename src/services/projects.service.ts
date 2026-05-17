import { get, post } from "@/services/apiClient"
import { API_ROUTES } from "@/lib/apiRoutes"

export async function fetchProjects() {
  const data = await get(API_ROUTES.projects.list, { withCredentials: true })
  return data
}

export async function fetchProjectById(id: string) {
  const data = await get(API_ROUTES.projects.detail(id), { withCredentials: true })
  return data
}

export async function likeProject(projectId: string) {
  const data = await post(API_ROUTES.projects.like(projectId), {}, { withCredentials: true })
  return data
}

export async function postComment(projectId: string, comment: string) {
  const data = await post(API_ROUTES.projects.addComment, { projectId, comment }, { withCredentials: true })
  return data
}

export async function postReply(projectId: string, commentId: string, replyText: string) {
  const data = await post(API_ROUTES.projects.addReply(projectId, commentId), { replyText }, { withCredentials: true })
  return data
}

export async function likeReply(projectId: string, commentId: string, replyId: string) {
  const data = await post(API_ROUTES.projects.likeReply(projectId, commentId, replyId), {}, { withCredentials: true })
  return data
}

export async function likeComment(projectId: string, commentId: string) {
  const data = await post(API_ROUTES.projects.likeComment(projectId, commentId), {}, { withCredentials: true })
  return data
}

export async function dislike(projectId: string, commentId: string) {
  const data = await post(API_ROUTES.projects.dislike(projectId, commentId), {}, { withCredentials: true })
  return data
}

export default {
  fetchProjects,
  fetchProjectById,
  likeProject,
  postComment,
  postReply,
  likeReply,
  likeComment,
  dislike,
}
