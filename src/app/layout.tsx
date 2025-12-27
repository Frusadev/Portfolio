import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/navigation/navbar";

export const metadata: Metadata = {
  title: "Daniel AMETSOWOU",
  description: "Full Stack Developer & Entrepreneur",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider attribute={"class"} defaultTheme="dark">
        <body>
          <NextTopLoader color="#2299DD" />
          <Navbar />
          {children}
        </body>
      </ThemeProvider>
    </html>
  );
}
