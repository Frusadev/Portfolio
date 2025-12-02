import { cn } from "@/lib/utils";

export default function AboutCards({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("border border-white/20", className)}>{children}</div>
  );
}
