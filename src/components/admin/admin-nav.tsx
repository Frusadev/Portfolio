"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FolderGit2,
  GraduationCap,
  Users,
  MessageSquare,
  Mail,
  ArrowUpRight,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", label: "overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "projects", icon: FolderGit2 },
  { href: "/admin/academic", label: "academic work", icon: GraduationCap },
  { href: "/admin/users", label: "users", icon: Users },
  { href: "/admin/comments", label: "comments", icon: MessageSquare },
  { href: "/admin/emails", label: "send email", icon: Mail },
];

export function AdminNav({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-64 shrink-0 flex flex-col justify-between p-6 sm:p-8 bg-surface/30 rounded-3xl md:min-h-[calc(100vh-8rem)]">
      <div className="flex flex-col gap-8">
        {/* Brand / Admin badge */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-text-primary">
              Admin control
            </span>
            <span className="text-[10px] font-mono text-accent-secondary bg-surface_elevated px-2 py-0.5 rounded-full">
              live
            </span>
          </div>
          {userEmail && (
            <span className="text-[11px] font-mono text-text-muted truncate">
              {userEmail}
            </span>
          )}
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-1.5">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-medium transition-all",
                  isActive
                    ? "bg-surface_elevated text-text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-surface_elevated/50"
                )}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Return to website */}
      <div className="pt-6 border-t border-transparent">
        <Link
          href="/"
          className="flex items-center justify-between text-xs font-mono text-text-muted hover:text-text-primary transition-colors py-2"
        >
          <span>view website</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </aside>
  );
}

export default AdminNav;
