import Link from "next/link";
import PortfolioSidebar from "@/components/sections/sidebar";
import HorizontalScrollContainer from "@/components/ui/horizontal-scroll-container";

export default function NotFound() {
  return (
    <div className="flex flex-row w-full h-screen light overflow-hidden">
      <PortfolioSidebar />
      <HorizontalScrollContainer>
        <div className="w-full min-h-full md:h-full md:inline-block md:min-w-full bg-background flex flex-col items-center justify-center">
            <div className="border-4 border-red-950 p-12 bg-background md:mr-12 md:mt-12 max-w-2xl w-full text-center space-y-6 shadow-[8px_8px_0px_0px_rgba(69,10,10,1)]">
                <h1 className="text-9xl font-bold text-red-950">404</h1>
                <h2 className="text-3xl font-bold text-red-950 uppercase tracking-widest">Page Not Found</h2>
                <p className="text-xl text-red-900/80">
                    The page you are looking for does not exist or has been moved.
                </p>
                <Link 
                    href="/" 
                    className="inline-block px-8 py-3 bg-red-950 text-[#e6dcc6] font-bold uppercase tracking-wider hover:bg-red-900 hover:-translate-y-1 transition-all"
                >
                    Return Home
                </Link>
            </div>
        </div>
      </HorizontalScrollContainer>
    </div>
  );
}
