"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, Briefcase, FolderOpen, LogOut, Globe } from "lucide-react";
import { signOut } from "@/lib/auth-client";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/blog", label: "Blog", icon: FileText },
    { href: "/admin/projects", label: "Projects", icon: FolderOpen },
    { href: "/admin/experience", label: "Experience", icon: Briefcase },
  ];

  return (
    <div className="w-64 border-r-4 border-red-950 bg-[#e6dcc6] flex flex-col h-full min-h-screen fixed top-0 left-0">
      <div className="p-6 border-b-4 border-red-950 bg-red-950 text-[#e6dcc6]">
        <h1 className="text-xl font-bold uppercase tracking-widest">Admin Panel</h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 font-bold uppercase tracking-wider text-sm border-2 transition-all",
                isActive 
                  ? "bg-red-950 text-[#e6dcc6] border-red-950" 
                  : "border-transparent text-red-950 hover:border-red-950 hover:bg-white/50"
              )}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t-4 border-red-950 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 w-full font-bold uppercase tracking-wider text-sm border-2 border-transparent text-red-950 hover:border-red-950 hover:bg-white/50 transition-all"
        >
          <Globe size={18} />
          View Website
        </Link>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-3 w-full font-bold uppercase tracking-wider text-sm border-2 border-transparent text-red-950 hover:border-red-950 hover:bg-red-500/10 transition-all"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );
}
