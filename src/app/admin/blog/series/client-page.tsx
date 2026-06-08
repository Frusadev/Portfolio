"use client";

import { useState } from "react";
import { createSeries } from "@/app/actions/series";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import Link from "next/link";

interface SeriesClientPageProps {
  initialSeries: { id: string; title: string; slug: string; description: string; createdAt: Date; updatedAt: Date }[];
}

export default function SeriesClientPage({ initialSeries }: SeriesClientPageProps) {
  const [series, setSeries] = useState(initialSeries);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    const result = await createSeries({ title, slug, description });
    setIsCreating(false);

    if (result.success) {
      toast.success("Series created");
      // Add to local state optimistically
      setSeries([{ id: "temp", title, slug, description, createdAt: new Date() }, ...series]);
      setTitle("");
      setSlug("");
      setDescription("");
    } else {
      toast.error(result.error || "Failed to create series");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center pb-4 border-b-4 border-red-950">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-red-950">Series Management</h1>
      </div>

      <div className="bg-background border-4 border-red-950 p-6 shadow-[8px_8px_0px_0px_rgba(69,10,10,1)]">
        <h2 className="text-xl font-bold uppercase tracking-widest text-red-950 mb-4">Create New Series</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold text-red-950 tracking-wider">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-white/50 border-2 border-red-950 px-3 py-2 text-red-950 font-medium"
                placeholder="Series Title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase font-bold text-red-950 tracking-wider">Slug</label>
              <input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full bg-white/50 border-2 border-red-950 px-3 py-2 text-red-950 font-medium"
                placeholder="series-slug"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs uppercase font-bold text-red-950 tracking-wider">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full h-24 bg-white/50 border-2 border-red-950 px-3 py-2 text-red-950 font-medium resize-y"
              placeholder="What is this series about?"
            />
          </div>
          <button
            type="submit"
            disabled={isCreating}
            className="flex items-center gap-2 px-6 py-2 bg-red-950 text-[#e6dcc6] font-bold uppercase tracking-wider hover:bg-red-900 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] disabled:opacity-50"
          >
            {isCreating ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
            Create Series
          </button>
        </form>
      </div>

      <div className="overflow-x-auto bg-background border-4 border-red-950 shadow-[8px_8px_0px_0px_rgba(69,10,10,1)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-red-950 text-[#e6dcc6] border-b-4 border-red-950">
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Title</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Slug</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Description</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Created</th>
              <th className="p-4 font-bold uppercase tracking-wider text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {series.map((item) => (
              <tr key={item.id} className="border-b-2 border-red-950/20 hover:bg-red-950/5 transition-colors">
                <td className="p-4 font-bold text-red-950">{item.title}</td>
                <td className="p-4 text-red-950/80 font-mono text-sm">{item.slug}</td>
                <td className="p-4 text-red-950/80 max-w-md truncate">{item.description}</td>
                <td className="p-4 text-red-950/80 text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4">
                  <Link 
                    href={`/admin/blog/series/${item.id}`}
                    className="inline-block px-3 py-1 border-2 border-red-950 text-red-950 text-xs font-bold uppercase tracking-wider hover:bg-red-950 hover:text-[#e6dcc6] transition-colors"
                  >
                    Manage Posts
                  </Link>
                </td>
              </tr>
            ))}
            {series.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-red-950/60 font-bold uppercase tracking-widest">
                  No series found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
