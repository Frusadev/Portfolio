import { Header } from "@/components/navigation/header";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-background text-foreground relative">
      <Header />
      {children}
    </div>
  );
}
