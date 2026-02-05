import PortfolioSidebar from "@/components/sections/sidebar";
import HorizontalScrollContainer from "@/components/ui/horizontal-scroll-container";

export default function WebsiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-row w-full h-screen light overflow-hidden">
      <PortfolioSidebar />
      <HorizontalScrollContainer>{children}</HorizontalScrollContainer>
    </div>
  );
}
