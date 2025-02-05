import React, { memo, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  ThumbsUp,
  ThumbsDown,
  Reply,
  MoreVertical,
  Edit,
  Trash2,
} from "lucide-react";
import { Comment } from "@/state/slices/projectSlice/details";
import { useAuthContext } from "@/context/authContext";

interface CommentComponentProps {
  comment: Comment;
  onLike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  onReply: (commentId: string, replyText: string) => void;
  onEdit: (commentId: string, newText: string) => void;
  onDelete: (commentId: string) => void;
  onReplyLike: (replyId: string, commentId: string) => void;
}

const CommentComponent: React.FC<CommentComponentProps> = memo(
  ({ comment, onLike, onDislike, onReply, onEdit, onDelete, onReplyLike }) => {
    const [replyingTo, setReplyingTo] = React.useState<string | null>(null);
    const [replyText, setReplyText] = React.useState("");
    const { user, isAuthenticated } = useAuthContext();
    const isCommentLiked = !!(
      isAuthenticated &&
      user &&
      comment.likes.some((like) => like.userId._id === user._id)
    );

    const [likedByUser, setLikedByUser] =
      React.useState<boolean>(isCommentLiked);
    const handleReplySubmit = (commentId: string) => {
      onReply(commentId, replyText);
      setReplyText("");
      setReplyingTo(null);
    };

    useEffect(() => {
      setLikedByUser(
        !!(
          isAuthenticated &&
          user &&
          comment.likes.some((like) => like.userId._id === user._id)
        )
      );
    }, [comment.likes, user]);

    return (
      <Card className="bg-black border-gray-800 mb-6 p-4 rounded-xl shadow-lg transition-transform duration-300 hover:scale-105">
        <CardContent className="p-4">
          {/* Comment content */}
          <div className="flex gap-4">
            <Avatar className="h-12 w-12 cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#64ffda]">
              <AvatarImage src={comment.userId.profileUrl} />
              <AvatarFallback>
                {comment.userId.email[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              {/* Comment header */}
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#64ffda]">
                  {comment.userId.email}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-400">
                    {new Date(comment.timestamp).toLocaleDateString()}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant={null}
                        size="icon"
                        className="h-8 w-8 text-gray-400 hover:text-[#64ffda]"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-black border-gray-700"
                    >
                      <DropdownMenuItem
                        onClick={() => onEdit(comment._id, comment.comment)}
                        className="text-gray-200 focus:bg-black focus:text-white"
                      >
                        <Edit className="mr-2 h-4 w-4" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onDelete(comment._id)}
                        className="text-gray-200 focus:bg-black focus:text-white"
                      >
                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              {/* Comment body */}
              <p className="mt-2 text-gray-300">{comment.comment}</p>
              {/* Comment actions */}
              <div className="mt-4 flex items-center gap-6">
                <Button
                  variant={null}
                  size="sm"
                  className="flex items-center gap-1 text-gray-400 hover:text-[#64ffda] transition-all duration-200"
                  onClick={() => onLike(comment._id)}
                >
                  <ThumbsUp
                    className={`h-4 w-4 ${
                      likedByUser ? "text-green-500" : "text-gray-400"
                    }`}
                  />
                  <span>{comment.likes.length}</span>
                </Button>
                <Button
                  variant={null}
                  size="sm"
                  className="flex items-center gap-1 text-gray-400 hover:text-[#64ffda] transition-all duration-200"
                  onClick={() => onDislike(comment._id)}
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span>{comment.dislikes.length}</span>
                </Button>
                <Button
                  variant={null}
                  size="sm"
                  className="flex items-center gap-1 text-gray-400 hover:text-[#64ffda] transition-all duration-200"
                  onClick={() => setReplyingTo(comment._id)}
                >
                  <Reply className="h-4 w-4" />
                  <span>Reply</span>
                </Button>
              </div>
              {/* Reply form */}
              {replyingTo === comment._id && (
                <div className="mt-4">
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Write a reply..."
                    className="min-h-[100px] bg-black border-gray-700 text-white focus:ring-2 focus:ring-[#64ffda]"
                  />
                  <div className="mt-2 flex justify-end gap-2">
                    <Button
                      variant={null}
                      size="sm"
                      onClick={() => setReplyingTo(null)}
                      className="hover:bg-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleReplySubmit(comment._id)}
                      className="bg-[#64ffda] text-black hover:bg-[#008080] transition-all duration-200"
                    >
                      Reply
                    </Button>
                  </div>
                </div>
              )}
              {/* Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-4 space-y-4 pl-8 border-l-4 border-gray-800">
                  {comment.replies.map((reply) => (
                    <div key={reply._id} className="flex gap-4">
                      <Avatar className="h-8 w-8 cursor-pointer transition-all duration-300 hover:ring-2 hover:ring-[#64ffda]">
                        <AvatarImage src={reply.userId.profileUrl} />
                        <AvatarFallback>
                          {reply.userId.email[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-[#64ffda]">
                            {reply.userId.email}
                          </span>
                          <span className="text-sm text-gray-400">
                            {new Date(reply.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-1 text-gray-300">{reply.comment}</p>
                        <Button
                          variant={null}
                          onClick={() => onReplyLike(reply._id, comment._id)}
                          size="sm"
                          className="mt-2 flex items-center gap-1 text-gray-400 hover:text-[#64ffda] transition-all duration-200"
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
  }
);

export default CommentComponent;
