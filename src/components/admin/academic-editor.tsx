"use client";

import * as React from "react";
import { updateCurrentAcademicWork } from "@/app/actions/portfolio";
import { toast } from "sonner";
import { GraduationCap, Loader2, Save } from "lucide-react";

export interface AcademicWorkData {
  id?: string;
  title: string;
  field?: string | null;
  institution?: string | null;
  description?: string | null;
  status?: string | null;
}

export function AcademicEditor({
  initialData,
}: {
  initialData: AcademicWorkData;
}) {
  const [title, setTitle] = React.useState(initialData.title || "");
  const [field, setField] = React.useState(initialData.field || "");
  const [institution, setInstitution] = React.useState(initialData.institution || "");
  const [description, setDescription] = React.useState(initialData.description || "");
  const [status, setStatus] = React.useState(initialData.status || "current");
  const [saving, setSaving] = React.useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !field.trim() || !institution.trim()) {
      toast.error("Please fill in title, field, and institution");
      return;
    }

    setSaving(true);
    try {
      const res = await updateCurrentAcademicWork({
        title: title.trim(),
        field: field.trim(),
        institution: institution.trim(),
        description: description.trim(),
        status,
      });

      if (res.success) {
        toast.success("Academic occupation updated across site");
      } else {
        toast.error(res.error || "Failed to update academic occupation");
      }
    } catch {
      toast.error("Failed to update academic occupation");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
          Academic occupation
        </h1>
        <p className="text-sm text-text-secondary mt-1">
          Update what you are currently preparing, studying, or researching. Displayed live on the landing page bento grid.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-3xl bg-surface/40 p-6 sm:p-10 flex flex-col gap-6"
      >
        <div className="flex items-center gap-2 text-xs font-mono text-accent-secondary">
          <GraduationCap className="w-4 h-4" />
          <span>Active preparation & research</span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-text-muted">
            title / program / research topic *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Preparing for a Statistical & Economics Engineering Program at ENSEA"
            required
            className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3.5 focus:outline-none focus:ring-1 focus:ring-white/20 border-0"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-muted">
              field / specialization *
            </label>
            <input
              type="text"
              value={field}
              onChange={(e) => setField(e.target.value)}
              placeholder="e.g. Quantitative Finance & Economics"
              required
              className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 border-0"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-muted">
              institution / university *
            </label>
            <input
              type="text"
              value={institution}
              onChange={(e) => setInstitution(e.target.value)}
              placeholder="e.g. ENSEA"
              required
              className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 border-0"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xs font-mono text-text-muted">
            detailed description & scope
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the syllabus, mathematical topics, or impact..."
            rows={4}
            className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 border-0 resize-none"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-text-primary text-background hover:bg-white text-xs font-medium px-6 py-2.5 transition-all disabled:opacity-40 flex items-center gap-2"
          >
            {saving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Save className="w-3.5 h-3.5" />
            )}
            <span>save changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AcademicEditor;
