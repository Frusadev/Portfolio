import * as React from "react";
import Link from "next/link";
import { getProjects, getCurrentAcademicWork } from "@/app/actions/portfolio";
import { getUsers } from "@/app/actions/users";
import { getAllComments } from "@/app/actions/comments";
import {
  FolderGit2,
  GraduationCap,
  Users,
  MessageSquare,
  Mail,
  ArrowUpRight,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const [projects, academicWork, users, comments] = await Promise.all([
    getProjects(),
    getCurrentAcademicWork(),
    getUsers(),
    getAllComments(),
  ]);

  const stats = [
    {
      label: "projects",
      value: projects.length,
      detail: `${projects.filter((p) => p.featured).length} featured`,
      href: "/admin/projects",
      icon: FolderGit2,
    },
    {
      label: "users",
      value: users.length,
      detail: `${users.filter((u) => u.role === "admin").length} administrators`,
      href: "/admin/users",
      icon: Users,
    },
    {
      label: "comments",
      value: comments.length,
      detail: "discussions across posts",
      href: "/admin/comments",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Top Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-text-primary">
          Overview
        </h1>
        <p className="text-sm text-text-secondary">
          System telemetry, active academic research, projects, and reader interactions.
        </p>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.label}
              href={stat.href}
              className="rounded-3xl bg-surface/40 hover:bg-surface/60 transition-all p-6 sm:p-8 flex flex-col justify-between gap-6 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-text-muted">
                  {stat.label}
                </span>
                <Icon className="w-4 h-4 text-accent-secondary group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl sm:text-4xl font-normal text-text-primary">
                  {stat.value}
                </span>
                <span className="text-xs font-mono text-text-muted">
                  {stat.detail}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Current Academic Occupation Widget */}
      <div className="rounded-3xl bg-surface/40 p-8 sm:p-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-4 h-4 text-accent-secondary" />
            <span className="text-xs font-mono text-text-muted tracking-wide">
              Active academic occupation
            </span>
          </div>
          <Link
            href="/admin/academic"
            className="text-xs font-mono text-text-muted hover:text-text-primary transition-colors flex items-center gap-1 group"
          >
            <span>edit</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl sm:text-2xl font-normal text-text-primary leading-snug">
            {academicWork.title}
          </h2>
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <span className="text-xs font-mono text-accent-secondary bg-surface_elevated px-2.5 py-1 rounded-full">
              {academicWork.field}
            </span>
            <span className="text-xs font-mono text-text-muted">
              {academicWork.institution}
            </span>
          </div>
          <p className="text-sm text-text-secondary leading-relaxed mt-2 line-clamp-3">
            {academicWork.description}
          </p>
        </div>
      </div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Link
          href="/admin/projects"
          className="rounded-3xl bg-surface/30 hover:bg-surface/50 p-6 sm:p-8 flex flex-col justify-between gap-4 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted">
              Portfolio management
            </span>
            <ArrowUpRight className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-text-primary">
              Create or edit projects
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              Add logos, set live URLs, tech stacks, and toggle featured visibility.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/emails"
          className="rounded-3xl bg-surface/30 hover:bg-surface/50 p-6 sm:p-8 flex flex-col justify-between gap-4 transition-colors group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-text-muted">
              Email outreach
            </span>
            <Mail className="w-4 h-4 text-text-muted group-hover:text-white transition-colors" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-text-primary">
              Send direct email
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              Transmit styled transactional messages or notifications directly.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
