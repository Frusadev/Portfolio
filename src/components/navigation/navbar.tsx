"use client";

import { cn } from "@/lib/utils";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, X, Terminal, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  weight: ["400", "700"],
});

export default function Navbar() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;
  
  const links = [
    {
      label: "~/home",
      href: "/",
    },
    {
      label: "./about",
      href: "/#about",
    },
    {
      label: "./contact",
      href: "/#contact",
    },
    {
      label: "/blog",
      href: "/blog",
    },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    
    if (href.includes("#")) {
      const [path, hash] = href.split("#");
      // If we are on the same page (ignoring query params etc for simplicity, or just checking pathname)
      // path is usually "/" for these links.
      if (pathname === path || (path === "" && pathname === "/")) {
        e.preventDefault();
        const element = document.querySelector(`#${hash}`);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      // If not on same page, let the Link component handle navigation to /#hash
    } else if (href === "/") {
       if (pathname === "/") {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
       }
    }
  };

  const AuthButton = () => {
    if (!session) {
      return (
        <Link href="/auth/login" onClick={() => setIsOpen(false)}>
          <Button variant="ghost" size="sm" className={cn("text-xs font-mono border border-primary/20 hover:bg-primary/10 hover:text-primary", jetBrainsMono.className)}>
            <Terminal className="w-3 h-3 mr-2" />
            ssh login
          </Button>
        </Link>
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = session.user as any;
    
    if (user.role === "admin") {
      return (
        <Link href="/admin" onClick={() => setIsOpen(false)}>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-primary/20 rounded bg-primary/5 hover:bg-primary/10 transition-colors">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-mono text-primary">root@admin</span>
          </div>
        </Link>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 px-3 py-1.5 border border-border rounded hover:bg-muted cursor-pointer transition-colors">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs font-mono text-muted-foreground">user@{session.user.name?.toLowerCase().replace(/\s+/g, '')}</span>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 font-mono">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => signOut()} className="text-red-500 focus:text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>exit</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  const isCompact = scrolled && !isOpen;

  return (
    <nav
      className={cn(
        "fixed z-50 transition-all duration-500 ease-in-out border-b",
        isCompact
          ? "top-4 left-1/2 -translate-x-1/2 w-[90%] md:w-[800px] rounded-full border-primary/20 bg-background/80 backdrop-blur-xl shadow-lg py-2"
          : "top-0 left-0 right-0 w-full border-transparent bg-transparent py-5",
        isOpen && "bg-background border-border py-4",
        jetBrainsMono.className
      )}
    >
      <div className={cn(
          "flex items-center justify-between px-4 md:px-6 w-full",
          !isCompact && "container mx-auto"
      )}>
        {/* Geeky Logo Area */}
        <Link href="/" onClick={(e) => handleLinkClick(e, "/")}>
          <div className="flex items-center gap-2 group">
            <div className="bg-primary/10 p-2 rounded border border-primary/20 group-hover:border-primary/50 transition-colors">
              <Command className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold leading-none group-hover:text-primary transition-colors">frusadev</span>
              <span className="text-[10px] text-muted-foreground leading-none mt-1">v2.0.0</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-1 bg-muted/30 px-4 py-2 rounded-full border border-border/50">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1 hover:bg-primary/5 rounded"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <AuthButton />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-muted rounded-md border border-transparent hover:border-border transition-all"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-background/95 backdrop-blur-xl overflow-hidden"
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="block text-lg font-medium py-2 border-l-2 border-transparent hover:border-primary hover:pl-4 hover:bg-primary/5 transition-all"
                  >
                    <span className="text-primary mr-2">&gt;</span>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.1 }}
                className="pt-4 border-t border-border"
              >
                <AuthButton />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
