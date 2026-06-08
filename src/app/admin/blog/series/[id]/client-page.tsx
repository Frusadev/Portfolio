"use client";

import { useState } from "react";
import { addPostToSeries } from "@/app/actions/series";
import { toast } from "sonner";
import { Loader2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface SeriesDetailsClientPageProps {
  series: { id: string; title: string; slug: string; description: string; createdAt: Date; updatedAt: Date };
  initialPostsInSeries: { id: string; title: string; slug: string; position: number }[];
  availablePosts: { id: string; title: string; slug: string }[];
}

export default function SeriesDetailsClientPage({ series, initialPostsInSeries, availablePosts }: SeriesDetailsClientPageProps) {
  const [postsInSeries, setPostsInSeries] = useState(initialPostsInSeries);
  const [isAdding, setIsAdding] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState("");
  const [position, setPosition] = useState(postsInSeries.length + 1);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPostId) {
      toast.error("Please select a post");
      return;
    }
    
    setIsAdding(true);
    const result = await addPostToSeries(series.id, selectedPostId, position);
    setIsAdding(false);

    if (result.success) {
      toast.success("Post added to series");
      const addedPost = availablePosts.find(p => p.id === selectedPostId);
      if (addedPost) {
        setPostsInSeries([...postsInSeries, { ...addedPost, position }].sort((a, b) => a.position - b.position));
      }
      setSelectedPostId("");
      setPosition(postsInSeries.length + 2);
    } else {
      toast.error(result.error || "Failed to add post");
    }
  };

  const unaddedPosts = availablePosts.filter(p => !postsInSeries.find(s => s.id === p.id));

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 pb-4 border-b-4 border-red-950">
        <Link href="/admin/blog/series" className="p-2 bg-red-950 text-[#e6dcc6] hover:bg-red-900 transition-colors shadow-[4px_4px_0px_0px_rgba(69,10,10,1)]">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-3xl font-bold uppercase tracking-widest text-red-950">
          Manage Series: {series.title}
        </h1>
      </div>

      <div className="bg-background border-4 border-red-950 p-6 shadow-[8px_8px_0px_0px_rgba(69,10,10,1)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-red-950 mb-4">Add Post to Series</h2>
        <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="space-y-2 flex-1">
            <label className="text-xs uppercase font-bold text-red-950 tracking-wider">Select Post</label>
            <select
              value={selectedPostId}
              onChange={(e) => setSelectedPostId(e.target.value)}
              required
              className="w-full h-10 bg-white/50 border-2 border-red-950 px-3 text-red-950 font-medium"
            >
              <option value="" disabled>-- Select a post --</option>
              {unaddedPosts.map(post => (
                <option key={post.id} value={post.id}>{post.title}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2 w-full md:w-32">
            <label className="text-xs uppercase font-bold text-red-950 tracking-wider">Position</label>
            <input
              type="number"
              value={position}
              onChange={(e) => setPosition(parseInt(e.target.value) || 0)}
              required
              min={1}
              className="w-full h-10 bg-white/50 border-2 border-red-950 px-3 text-red-950 font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={isAdding || unaddedPosts.length === 0}
            className="flex items-center gap-2 h-10 px-6 bg-red-950 text-[#e6dcc6] font-bold uppercase tracking-wider hover:bg-red-900 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] disabled:opacity-50"
          >
            {isAdding ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
            Add
          </button>
        </form>
      </div>

      <div className="overflow-x-auto bg-background border-4 border-red-950 shadow-[8px_8px_0px_0px_rgba(69,10,10,1)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-red-950 text-[#e6dcc6] border-b-4 border-red-950">
              <th className="p-4 font-bold uppercase tracking-wider text-sm w-24 text-center">Position</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Post Title</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Slug</th>
            </tr>
          </thead>
          <tbody>
            {postsInSeries.map((post) => (
              <tr key={post.id} className="border-b-2 border-red-950/20 hover:bg-red-950/5 transition-colors">
                <td className="p-4 font-black text-red-950 text-center text-xl">{post.position}</td>
                <td className="p-4 font-bold text-red-950">{post.title}</td>
                <td className="p-4 text-red-950/80 font-mono text-sm">{post.slug}</td>
              </tr>
            ))}
            {postsInSeries.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-red-950/60 font-bold uppercase tracking-widest">
                  No posts in this series yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
