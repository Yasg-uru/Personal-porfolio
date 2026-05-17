export const API_ROUTES = {
  auth: {
    register: "/user/register",
    login: "/user/login",
    verifyEmail: "/user/verify-email",
    resendVerification: "/user/resend-verification",
    forgotPassword: "/user/forgot-password",
    resetPassword: (token: string) => `/user/reset-password/${token}`,
    refreshToken: "/user/refresh-token",
    me: "/user/verify-user",
    logout: "/user/logout",
    sendMessage: "/notification/send-message",
  },
  projects: {
    list: "/project/projects",
    detail: (id: string) => `/project/${id}`,
    like: (id: string) => `/project/handleLikeUnlikeProject/${id}`,
    addComment: "/project/addcomment",
    addReply: (projectId: string, commentId: string) => `/project/addreply/${projectId}/${commentId}`,
    likeReply: (projectId: string, commentId: string, replyId: string) => `/project/like-unlike-reply/${projectId}/${commentId}/${replyId}`,
    likeComment: (projectId: string, commentId: string) => `/project/like-unlike/${projectId}/${commentId}`,
    dislike: (projectId: string, commentId: string) => `/project/handledislike/${projectId}/${commentId}`,
  },
  github: {
    graphql: "https://api.github.com/graphql",
  },
}

export default API_ROUTES
