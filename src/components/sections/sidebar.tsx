"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Menu, X } from "lucide-react";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface NavItem {
  name: string;
  href: string;
}

export default function PortfolioSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isContentPage = pathname?.startsWith("/projects") || pathname?.startsWith("/blog");
  const isBlogPost = pathname?.startsWith("/blog/") && pathname !== "/blog";

  const socialLinks: SocialLink[] = [
    {
      name: "GitHub",
      url: "https://github.com/Frusadev",
      icon: <FaGithub />,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/frusadev",
      icon: <FaLinkedin />,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/Frusasoft_FD",
      icon: <FaTwitter />,
    },
  ];

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" }, 
  ];

  const SidebarContent = () => (
    <>
      {/* Profile Section */}
      <div className="w-full shrink-0 h-auto border-b-4 border-red-950 pb-4 bg-[#dccfac]">
        <div className="w-full aspect-square border-b-4 border-red-950 overflow-hidden md:grayscale md:hover:grayscale-0 transition-all duration-500">
          <Image
            src={"/daniel.png"}
            alt={"Daniel AMETSOWOU"}
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="px-4 mt-4">
          <p className="text-2xl uppercase tracking-wider">Daniel</p>
          <p className="text-xl uppercase tracking-wider">Ametsowou</p>
          <p className="text-xs mt-2 opacity-80 font-normal">
            Full Stack Developer & Entrepreneur
          </p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 flex flex-col justify-center px-6 space-y-4 py-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
             onClick={() => setIsOpen(false)}
            className="text-xl hover:text-red-700 hover:translate-x-2 transition-transform uppercase tracking-widest"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Footer Section: Socials */}
      <div className="w-full shrink-0 flex flex-col px-4 pb-4">
        <div className="mt-4">
          <div className="flex space-x-4 justify-center">
            {socialLinks.map((link) => (
              <Link
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:scale-110 transition-transform"
              >
                {link.icon}
              </Link>
            ))}
          </div>
          <div className="text-center mt-3 text-sm font-normal">
            Working at{" "}
            <Link
              href={"https://quivo.agency"}
              className="font-bold underline decoration-2 underline-offset-2"
            >
              Quivo
            </Link>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Trigger */}
      <button
        className={`md:hidden fixed left-4 z-50 p-2 bg-[#e6dcc6] border-2 border-red-950 text-red-950 shadow-[4px_4px_0px_0px_rgba(69,10,10,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all ${
          isContentPage && !isBlogPost ? "top-20" : "top-4"
        } ${isBlogPost ? "opacity-50 hover:opacity-100" : ""}`}
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Full Screen Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-[#e6dcc6]/95 backdrop-blur-sm text-red-950 flex flex-col animate-in fade-in duration-200 md:hidden">
          <div className="flex justify-end p-4 shrink-0">
            <button
              className="p-2 bg-[#e6dcc6] border-2 border-red-950 text-red-950 shadow-[4px_4px_0px_0px_rgba(69,10,10,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-8">
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto h-full content-start font-bold">
              {/* Profile Tile */}
              <div className="col-span-2 bg-[#dccfac] border-4 border-red-950 p-4 shadow-[4px_4px_0px_0px_rgba(69,10,10,1)] flex gap-4 items-center">
                <div className="w-20 h-20 border-2 border-red-950 shrink-0 overflow-hidden">
                  <Image
                    src={"/daniel.png"}
                    alt={"Daniel AMETSOWOU"}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-lg uppercase leading-tight">Daniel</div>
                  <div className="text-lg uppercase leading-tight">
                    Ametsowou
                  </div>
                  <div className="text-xs opacity-80 mt-1 font-normal">
                    Full Stack Dev
                  </div>
                </div>
              </div>

              {/* Nav Tiles */}
              {navItems.map((item, i) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    border-4 border-red-950 bg-[#e6dcc6] p-4 
                    shadow-[4px_4px_0px_0px_rgba(69,10,10,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all
                    flex items-center justify-center text-xl uppercase tracking-widest
                    ${i === 2 ? "col-span-2 py-8" : "col-span-1 aspect-square"}
                  `}
                >
                  {item.name}
                </Link>
              ))}

              {/* Socials Tile */}
              <div className="col-span-2 bg-[#dccfac] border-4 border-red-950 p-6 shadow-[4px_4px_0px_0px_rgba(69,10,10,1)]">
                <div className="flex justify-around items-center">
                  {socialLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      className="text-3xl hover:scale-110 transition-transform"
                    >
                      {link.icon}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Work Tile */}
              <div className="col-span-2 border-4 border-red-950 bg-[#e6dcc6] p-4 shadow-[4px_4px_0px_0px_rgba(69,10,10,1)] text-center text-sm">
                Working at{" "}
                <Link
                  href={"https://quivo.agency"}
                  className="underline decoration-2 underline-offset-2"
                >
                  Quivo
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:flex shrink-0 relative flex-col justify-between border-r-4 border-r-red-950 w-64 h-full max-h-screen sticky top-0 bg-[#e6dcc6] text-red-950 font-bold overflow-y-auto no-scrollbar">
        <SidebarContent />
      </div>
    </>
  );
}
