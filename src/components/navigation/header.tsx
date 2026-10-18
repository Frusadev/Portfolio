"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "writing", label: "Writing", href: "/blog" },
];

interface HeaderProps {
  items?: NavItem[];
  email?: string;
  className?: string;
}

export function Header({
  items = DEFAULT_NAV_ITEMS,
  email = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "daniel@ametsowou.me",
  className,
}: HeaderProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [hoveredId, setHoveredId] = React.useState<string | null>(null);
  const [activeId, setActiveId] = React.useState<string>(items[0]?.id || "home");

  const navItems = React.useMemo(() => {
    const list = [...items];
    if (session?.user) {
      list.push({ id: "profile", label: "Profile", href: "/onboarding" });
      const userRole = (session.user as { role?: string }).role;
      if (userRole === "admin") {
        list.push({ id: "admin", label: "Admin", href: "/admin" });
      }
    }
    return list;
  }, [items, session]);

  // Mobile scroll indicator tracking
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = React.useState(0);
  const [canScroll, setCanScroll] = React.useState(false);

  const checkScroll = React.useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll > 2) {
      setCanScroll(true);
      const progress = Math.min(Math.max(el.scrollLeft / maxScroll, 0), 1);
      setScrollProgress(progress);
    } else {
      setCanScroll(false);
    }
  }, []);

  React.useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [checkScroll]);

  // Track active item based on pathname and hash
  React.useEffect(() => {
    if (pathname === "/") {
      const hash = window.location.hash.replace("#", "");
      if (hash && navItems.some((item) => item.id === hash)) {
        setActiveId(hash);
      } else {
        setActiveId("home");
      }
    } else if (pathname.startsWith("/projects") || pathname.startsWith("/work")) {
      setActiveId("projects");
    } else if (pathname.startsWith("/blog")) {
      setActiveId("writing");
    } else if (pathname.startsWith("/onboarding")) {
      setActiveId("profile");
    } else if (pathname.startsWith("/admin")) {
      setActiveId("admin");
    }
  }, [pathname, navItems]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: NavItem
  ) => {
    setActiveId(item.id);
    if (item.href.startsWith("#")) {
      e.preventDefault();
      const target = document.getElementById(item.id);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      window.history.pushState(null, "", item.href);
    }
  };

  return (
    <>
      {/* Top Header Bar: Desktop Left Nav + Top Right Inquiries */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 p-6 md:p-10 lg:p-12 flex justify-between items-start pointer-events-none select-none",
          className
        )}
      >
        {/* Top Left: Vertical Navbar on Desktop */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex flex-col items-start gap-1 pointer-events-auto"
          onMouseLeave={() => setHoveredId(null)}
        >
          {navItems.map((item) => {
            const isHovered = hoveredId === item.id;
            const isBlurred = hoveredId !== null && !isHovered;
            const isActive = activeId === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                onMouseEnter={() => setHoveredId(item.id)}
                className={cn(
                  "group relative inline-flex items-center text-[12px] md:text-[13px] font-normal tracking-normal transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-secondary rounded-sm py-0.5",
                  isBlurred && "blur-[2.5px] opacity-30 scale-[0.98]",
                  !isBlurred && "blur-none opacity-100",
                  isActive || isHovered
                    ? "text-text-primary"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Top Right: Inquiries + Email */}
        <div className="ml-auto pointer-events-auto hidden sm:flex items-center gap-2 md:gap-2.5 text-[12px] md:text-[13px] font-normal">
          <span className="text-text-secondary">For inquiries</span>
          <a
            href={`mailto:${email}`}
            className="text-text-primary underline underline-offset-4 decoration-white/20 hover:decoration-white/80 hover:text-accent-hover transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-secondary rounded-sm"
          >
            {email}
          </a>
        </div>
      </header>

      {/* Mobile Bottom Navbar: Horizontal, scrollable, small font with subtle scroll indicator */}
      <nav
        aria-label="Mobile Navigation"
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-lg bg-background/80 px-6 pt-2.5 pb-[calc(0.85rem+env(safe-area-inset-bottom))] pointer-events-auto select-none"
      >
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-center gap-6 overflow-x-auto no-scrollbar scroll-smooth px-2 py-1"
          onMouseLeave={() => setHoveredId(null)}
        >
          {navItems.map((item) => {
            const isHovered = hoveredId === item.id;
            const isBlurred = hoveredId !== null && !isHovered;
            const isActive = activeId === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                onTouchStart={() => setHoveredId(item.id)}
                onTouchEnd={() => setHoveredId(null)}
                onMouseEnter={() => setHoveredId(item.id)}
                className={cn(
                  "shrink-0 inline-flex items-center text-[11px] font-normal tracking-normal transition-all duration-300 ease-out focus-visible:outline-none",
                  isBlurred && "blur-[2px] opacity-30 scale-[0.97]",
                  !isBlurred && "blur-none opacity-100",
                  isActive || isHovered
                    ? "text-text-primary"
                    : "text-text-secondary"
                )}
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Small subtle scroll indicator for mobile horizontal scroll */}
        {canScroll && (
          <div
            className="w-8 h-[2px] bg-white/10 rounded-full mx-auto mt-1.5 overflow-hidden"
            aria-hidden="true"
          >
            <div
              className="h-full bg-text-secondary/60 rounded-full transition-transform duration-75 ease-out"
              style={{
                width: "40%",
                transform: `translateX(${scrollProgress * 150}%)`,
              }}
            />
          </div>
        )}
      </nav>
    </>
  );
}

export default Header;
