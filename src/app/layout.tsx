import { Quicksand } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/atom-one-dark.css";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import { metadata as sharedMetadata } from "./shared-metadata";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});

export const metadata = sharedMetadata;

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
