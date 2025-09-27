import { Separator } from "@/components/ui/separator";
import VisitBlog from "@/components/visit-blog";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-gradient-to-br from-background to-amber-500/5 relative py-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-amber-200/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="flex flex-col items-center space-y-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative group">
              <div className="w-64 h-64 overflow-hidden rounded-[30%] border-2 border-border shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Image
                  height={1782}
                  width={1916}
                  src={"/daniel.png"}
                  alt="Daniel AMETSOWOU"
                  className="rounded-[30%] object-cover h-full w-full"
                />
              </div>
            </div>

            <div className="text-center space-y-4 cursor-default">
              <div className="space-y-2">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                  You can call me Frusadev
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground font-medium">
                  But my real name is{" "}
                  <span className="font-bold text-foreground">Daniel</span>!
                </p>
              </div>

              <p className="text-base text-muted-foreground/80 font-mono tracking-wide select-none">
                Creative Developer & Entrepreneur
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Separator className="w-16" />
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
          </div>

          <div className="grid grid-cols-2  gap-3 w-full max-w-md">
            {[
              "Backend",
              "Python",
              "TypeScript",
              "React",
              "Next.js",
              "FastAPI",
              "Machine Learning",
              "UI/UX",
            ].map((skill) => (
              <div
                key={skill}
                className="px-4 py-2 rounded-lg bg-card border border-border text-center text-sm font-medium text-muted-foreground hover:text-foreground hover:border-amber-400/50 transition-all duration-200 cursor-default"
              >
                {skill}
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-muted-foreground/60 font-mono">
              Building beautiful experiences, for prettier lives.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
            <Link
              href="mailto:daniel@ametsowou.me"
              className="flex-1 text-center px-6 py-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              Get in Touch
            </Link>
            <VisitBlog />
          </div>

          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/Frusadev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span className="text-sm font-medium">GitHub</span>
            </a>

            <a
              href="https://linkedin.com/in/frusadev"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
            >
              <svg
                className="w-5 h-5 group-hover:scale-110 transition-transform duration-200 hover:fill-blue-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              <span className="text-sm font-medium">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
