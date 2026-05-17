"use client"
import { motion } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import CommentComponent from "@/pages/projects/comment"
import type { Comment } from "../types"

type Props = {
  comments: Comment[]
  newComment: string
  setNewComment: (v: string) => void
  onPostComment: () => void
  onLike: (id: string) => void
  onDislike: (id: string) => void
  onReply: (id: string, text: string) => void
  onEdit: (id: string, text: string) => void
  onDelete: (id: string) => void
  onReplyLike: (replyId: string, commentId: string) => void
}

export default function CommentPanel({
  comments,
  newComment,
  setNewComment,
  onPostComment,
  onLike,
  onDislike,
  onReply,
  onEdit,
  onDelete,
  onReplyLike,
}: Props) {
  return (
    <motion.section
      id="comments"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl"
    >
      <h2 className="text-primary text-2xl font-bold tracking-widest mb-4">Comments ({comments.length})</h2>
      <div className="rounded-xl p-8 mb-12 shadow-lg border border-white/10 bg-black/25">
        <Textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="min-h-[120px] bg-black/30 text-white border-2 border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 ease-in-out"
        />
        <div className="flex justify-end mt-4">
          <Button onClick={onPostComment} className="bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 transform transition-all duration-300 ease-in-out hover:scale-105">
            Post Comment
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {comments.map((comment) => (
          <CommentComponent
            key={comment._id}
            comment={comment}
            onLike={onLike}
            onDislike={onDislike}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
            onReplyLike={onReplyLike}
          />
        ))}
      </div>
    </motion.section>
  )
}
