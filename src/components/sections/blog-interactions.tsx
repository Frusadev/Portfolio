"use client";

import { useState } from "react";
import { MdThumbUp, MdFavorite, MdCelebration, MdOutlineThumbUp, MdOutlineFavoriteBorder } from "react-icons/md";
import { addComment } from "@/app/actions/comments";
import { toggleReaction } from "@/app/actions/reactions";
import { toast } from "sonner";
import { Loader2, MessageSquare } from "lucide-react";
import Image from "next/image";

interface BlogInteractionsProps {
  postId: string;
  initialComments: { id: string; content: string; createdAt: Date; user: { id: string; name: string | null; image: string | null } }[];
  initialReactions: Record<string, string[]>;
  currentUserId?: string;
}

export default function BlogInteractions({
  postId,
  initialComments,
  initialReactions,
  currentUserId,
}: BlogInteractionsProps) {
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReacting, setIsReacting] = useState(false);

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUserId) {
      toast.error("You must be logged in to comment.");
      return;
    }
    if (!commentContent.trim()) return;

    setIsSubmitting(true);
    const result = await addComment(postId, commentContent);
    setIsSubmitting(false);

    if (result.success) {
      toast.success("Comment added!");
      setCommentContent("");
    } else {
      toast.error(result.error || "Failed to add comment.");
    }
  };

  const handleToggleReaction = async (type: string) => {
    if (!currentUserId) {
      toast.error("You must be logged in to react.");
      return;
    }

    setIsReacting(true);
    const result = await toggleReaction(postId, type);
    setIsReacting(false);

    if (result.success) {
      // We rely on router refresh or the user seeing the optimistic UI.
      // But since we aren't doing optimistic UI here for brevity, 
      // let's just trigger a revalidation from server action (already does via router.refresh conceptually, wait, actions do revalidatePath so the page should refresh).
    } else {
      toast.error(result.error || "Failed to toggle reaction.");
    }
  };

  const hasReacted = (type: string) => {
    return initialReactions[type]?.includes(currentUserId || "");
  };

  return (
    <div className="mt-16 pt-12 border-t-4 border-red-950/20 space-y-12">
      {/* Reactions Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-bold uppercase tracking-widest text-red-950 flex items-center gap-2">
          Reactions
        </h3>
        <div className="flex gap-4">
          <button
            onClick={() => handleToggleReaction("thumb_up")}
            disabled={isReacting}
            className={`flex items-center gap-2 px-4 py-2 border-2 border-red-950 font-bold uppercase tracking-wider transition-all ${
              hasReacted("thumb_up") ? "bg-red-950 text-[#fbf5e9]" : "bg-transparent text-red-950 hover:bg-red-950/10"
            }`}
          >
            {hasReacted("thumb_up") ? <MdThumbUp size={20} /> : <MdOutlineThumbUp size={20} />}
            <span>{initialReactions["thumb_up"]?.length || 0}</span>
          </button>
          
          <button
            onClick={() => handleToggleReaction("favorite")}
            disabled={isReacting}
            className={`flex items-center gap-2 px-4 py-2 border-2 border-red-950 font-bold uppercase tracking-wider transition-all ${
              hasReacted("favorite") ? "bg-red-950 text-[#fbf5e9]" : "bg-transparent text-red-950 hover:bg-red-950/10"
            }`}
          >
            {hasReacted("favorite") ? <MdFavorite size={20} /> : <MdOutlineFavoriteBorder size={20} />}
            <span>{initialReactions["favorite"]?.length || 0}</span>
          </button>
          
          <button
            onClick={() => handleToggleReaction("celebration")}
            disabled={isReacting}
            className={`flex items-center gap-2 px-4 py-2 border-2 border-red-950 font-bold uppercase tracking-wider transition-all ${
              hasReacted("celebration") ? "bg-red-950 text-[#fbf5e9]" : "bg-transparent text-red-950 hover:bg-red-950/10"
            }`}
          >
            <MdCelebration size={20} className={hasReacted("celebration") ? "text-[#fbf5e9]" : "text-red-950"} />
            <span>{initialReactions["celebration"]?.length || 0}</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div className="space-y-8">
        <h3 className="text-2xl font-bold uppercase tracking-widest text-red-950 flex items-center gap-2">
          <MessageSquare size={24} />
          Comments ({initialComments.length})
        </h3>
        
        {currentUserId ? (
          <form onSubmit={handleAddComment} className="space-y-4">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="Leave a comment..."
              className="w-full min-h-[120px] p-4 bg-red-950/5 border-2 border-red-950 text-red-950 placeholder:text-red-950/40 focus:outline-none focus:ring-2 focus:ring-red-950/50 resize-y font-medium"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-red-950 text-[#fbf5e9] font-bold uppercase tracking-wider hover:bg-red-900 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Post Comment"}
            </button>
          </form>
        ) : (
          <div className="p-6 bg-red-950/5 border-l-4 border-red-950 text-red-950/80 font-medium italic">
            You must be logged in to leave a comment.
          </div>
        )}

        <div className="space-y-6">
          {initialComments.map((comment) => (
            <div key={comment.id} className="p-6 border-2 border-red-950 bg-background shadow-[4px_4px_0px_0px_rgba(69,10,10,1)]">
              <div className="flex items-center gap-4 mb-4">
                {comment.user.image ? (
                  <Image src={comment.user.image} alt={comment.user.name || "User"} width={40} height={40} className="border-2 border-red-950" />
                ) : (
                  <div className="w-10 h-10 bg-red-950 text-[#fbf5e9] flex items-center justify-center font-bold text-lg border-2 border-red-950">
                    {comment.user.name?.charAt(0) || "U"}
                  </div>
                )}
                <div>
                  <div className="font-bold text-red-950 uppercase tracking-wider text-sm">{comment.user.name}</div>
                  <div className="text-xs text-red-950/60 font-medium">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <p className="text-red-950/80 leading-relaxed whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))}
          
          {initialComments.length === 0 && (
            <div className="text-center p-8 border-2 border-dashed border-red-950/30 text-red-950/50 font-bold uppercase tracking-widest text-sm">
              No comments yet. Be the first!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
