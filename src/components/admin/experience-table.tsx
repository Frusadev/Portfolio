"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteExperience } from "@/app/actions/portfolio";
import { Edit, Trash2, Calendar, Briefcase } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ExperienceTable({ experience }: { experience: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    
    setLoading(id);
    const res = await deleteExperience(id);
    setLoading(null);

    if (res.success) {
      toast.success("Experience deleted");
      router.refresh();
    } else {
      toast.error("Failed to delete experience");
    }
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
  };

  return (
    <div className="border-4 border-red-950 bg-background overflow-hidden">
      <div className="grid grid-cols-[1fr_auto] md:grid-cols-[2fr_1fr_1fr_auto] gap-4 p-4 bg-red-950 text-[#e6dcc6] font-bold uppercase tracking-wider text-sm">
        <div>Role/Company</div>
        <div className="hidden md:block">Duration</div>
        <div className="hidden md:block">Current</div>
        <div>Actions</div>
      </div>
      
      {experience.length === 0 ? (
        <div className="p-8 text-center opacity-50 font-mono">No experience found.</div>
      ) : (
        experience.map((item) => (
          <div key={item.id} className="grid grid-cols-[1fr_auto] md:grid-cols-[2fr_1fr_1fr_auto] gap-4 p-4 border-b-2 border-red-950 last:border-0 items-center hover:bg-red-950/5 transition-colors">
            <div>
              <div className="font-bold truncate pr-4">{item.position}</div>
              <div className="text-xs opacity-70 truncate flex items-center gap-1">
                <Briefcase size={10} /> {item.company}
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 text-sm font-mono opacity-80">
              <Calendar size={12} />
              {formatDate(item.startDate)} - {item.current ? "Present" : formatDate(item.endDate)}
            </div>
            <div className="hidden md:block">
              {item.current && (
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              )}
            </div>
            <div className="flex gap-2">
              <Link 
                href={`/admin/experience/${item.id}`}
                className="p-2 border-2 border-red-950 text-red-950 hover:bg-red-950 hover:text-[#e6dcc6] transition-colors"
                title="Edit"
              >
                <Edit size={16} />
              </Link>
              <button 
                onClick={() => handleDelete(item.id)}
                disabled={loading === item.id}
                className="p-2 border-2 border-red-950 text-red-950 hover:bg-red-500 hover:border-red-500 hover:text-white transition-colors disabled:opacity-50"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
