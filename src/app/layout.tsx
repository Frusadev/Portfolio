import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${quicksand.variable} font-sans antialiased light`}
      >
        <ThemeProvider attribute={"class"} defaultTheme="light" forcedTheme="light">
          <NextTopLoader color="#300000" />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
