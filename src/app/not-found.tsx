import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-8 bg-background text-foreground text-center select-none">
      <span className="text-xs uppercase tracking-widest text-text-muted mb-3">
        404 Error
      </span>
      <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-text-primary mb-4">
        Page Not Found
      </h1>
      <p className="text-sm md:text-base text-text-secondary max-w-md mb-8">
        The page you are looking for does not exist or has been relocated.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-text-primary border border-border px-5 py-2.5 rounded-full hover:bg-surface-elevated transition-colors"
      >
        <span>←</span>
        <span>Return Home</span>
      </Link>
    </main>
  );
}
