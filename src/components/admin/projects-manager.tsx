"use client";

import * as React from "react";
import Image from "next/image";
import { createProject, deleteProject } from "@/app/actions/portfolio";
import { registerFile } from "@/app/actions/files";
import { toast } from "sonner";
import { Plus, Trash2, Globe, Github, Loader2, Sparkles, Image as ImageIcon } from "lucide-react";
import { GitHubIcon } from "@/components/icons/github-icon";

export interface ProjectData {
  id: string;
  title: string;
  description: string;
  url?: string | null;
  githubUrl?: string | null;
  logo?: string | null;
  technologies?: string[] | null;
  featured?: boolean | null;
}

export function ProjectsManager({
  initialProjects = [],
}: {
  initialProjects: ProjectData[];
}) {
  const [projects, setProjects] = React.useState<ProjectData[]>(initialProjects);
  const [isCreating, setIsCreating] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);

  // Form states
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [githubUrl, setGithubUrl] = React.useState("");
  const [logo, setLogo] = React.useState("");
  const [techString, setTechString] = React.useState("");
  const [featured, setFeatured] = React.useState(false);

  // Logo file upload handler
  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      setLogo(dataUrl);
      try {
        const res = await registerFile({
          name: file.name,
          url: dataUrl,
          mimeType: file.type,
          size: file.size,
        });
        if (res.success && res.url) {
          toast.success("Logo uploaded");
        }
      } catch {
        toast.info("Logo cached locally");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      toast.error("Please provide a title and description");
      return;
    }

    setSubmitting(true);
    try {
      const technologies = techString
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const newProjectData = {
        title: title.trim(),
        description: description.trim(),
        url: url.trim() || null,
        githubUrl: githubUrl.trim() || null,
        logo: logo.trim() || null,
        technologies,
        featured,
      };

      const res = await createProject(newProjectData);
      if (res.success) {
        toast.success("Project created");
        const added: ProjectData = {
          id: `proj-${Date.now()}`,
          ...newProjectData,
        };
        setProjects([added, ...projects]);
        // Reset form
        setTitle("");
        setDescription("");
        setUrl("");
        setGithubUrl("");
        setLogo("");
        setTechString("");
        setFeatured(false);
        setIsCreating(false);
      } else {
        toast.error("Failed to create project");
      }
    } catch {
      toast.error("An error occurred while creating project");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await deleteProject(id);
      if (res.success) {
        toast.success("Project removed");
        setProjects((prev) => prev.filter((p) => p.id !== id));
      } else {
        toast.error("Failed to delete project");
      }
    } catch {
      toast.error("Failed to delete project");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col gap-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
            Projects
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Manage your project showcase, upload custom logos, and control visibility.
          </p>
        </div>
        <button
          onClick={() => setIsCreating(!isCreating)}
          className="rounded-full bg-text-primary text-background hover:bg-white text-xs font-medium px-5 py-2.5 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{isCreating ? "cancel" : "new project"}</span>
        </button>
      </div>

      {/* Creation Drawer / Form */}
      {isCreating && (
        <form
          onSubmit={handleCreate}
          className="rounded-3xl bg-surface/50 p-6 sm:p-10 flex flex-col gap-6 animate-in fade-in duration-300"
        >
          <div className="flex items-center gap-2 text-xs font-mono text-accent-secondary">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create new project</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted">project title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Quant Engine"
                required
                className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 border-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted">
                technologies (comma separated)
              </label>
              <input
                type="text"
                value={techString}
                onChange={(e) => setTechString(e.target.value)}
                placeholder="TypeScript, Python, GSAP"
                className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 border-0"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono text-text-muted">description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Concise overview of what was built and why..."
              rows={3}
              required
              className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 border-0 resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted">live url</label>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://..."
                className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 border-0"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted">github repository url</label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 border-0"
              />
            </div>
          </div>

          {/* Logo upload or URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-text-muted">logo url or image</label>
              <input
                type="text"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="https://... or upload below"
                className="w-full bg-surface_elevated/80 text-text-primary placeholder:text-text-muted text-sm rounded-2xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-white/20 border-0"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="cursor-pointer rounded-full bg-surface_elevated hover:bg-surface_elevated/80 text-text-primary text-xs font-medium px-4 py-3 transition-colors flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5" />
                <span>upload file</span>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/svg+xml,image/webp"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>

              {logo && (
                <div className="w-10 h-10 rounded-2xl bg-white p-2 flex items-center justify-center shrink-0">
                  <Image
                    src={logo}
                    alt="Logo preview"
                    width={40}
                    height={40}
                    unoptimized
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Featured checkbox */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded bg-surface_elevated border-0 text-text-primary focus:ring-0 cursor-pointer"
            />
            <label htmlFor="featured" className="text-xs font-mono text-text-secondary cursor-pointer">
              featured project (highlighted on landing page)
            </label>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="text-xs font-mono text-text-muted hover:text-text-primary px-4 py-2 transition-colors"
            >
              cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="rounded-full bg-text-primary text-background hover:bg-white text-xs font-medium px-6 py-2.5 transition-all disabled:opacity-40 flex items-center gap-2"
            >
              {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              <span>save project</span>
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="flex flex-col gap-4">
        {projects.length === 0 ? (
          <div className="rounded-3xl bg-surface/30 p-12 text-center text-xs font-mono text-text-muted">
            No projects added yet. Click &quot;new project&quot; to add your first.
          </div>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl bg-surface/40 hover:bg-surface/50 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 transition-colors"
            >
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center p-2.5 shrink-0">
                  {project.logo ? (
                    <Image
                      src={project.logo}
                      alt={project.title}
                      width={48}
                      height={48}
                      unoptimized
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <GitHubIcon className="w-6 h-6 text-neutral-900" />
                  )}
                </div>

                <div className="flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-center gap-3">
                    <h2 className="text-base sm:text-lg font-medium text-text-primary">
                      {project.title}
                    </h2>
                    {project.featured && (
                      <span className="text-[10px] font-mono text-accent-secondary bg-surface_elevated px-2 py-0.5 rounded-full">
                        featured
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm text-text-secondary leading-relaxed line-clamp-2 max-w-2xl">
                    {project.description}
                  </p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-mono text-text-muted bg-surface_elevated/60 px-2 py-0.5 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-surface_elevated hover:bg-surface_elevated/80 text-text-muted hover:text-text-primary transition-colors"
                    title="View live"
                  >
                    <Globe className="w-4 h-4" />
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-surface_elevated hover:bg-surface_elevated/80 text-text-muted hover:text-text-primary transition-colors"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => handleDelete(project.id)}
                  disabled={deletingId === project.id}
                  className="p-2 rounded-full bg-surface_elevated hover:bg-red-500/20 text-text-muted hover:text-red-400 transition-colors"
                  title="Delete project"
                >
                  {deletingId === project.id ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectsManager;
