"use client";

export default function VisitBlog() {
  return (
    <button
      className="flex-1 px-6 py-3 bg-card hover:bg-accent text-foreground border border-border font-medium rounded-lg transition-colors duration-200"
      onClick={() => window.open("https://blog.ametsowou.me", "_blank")}
    >
      Visit My Blog
    </button>
  );
}
