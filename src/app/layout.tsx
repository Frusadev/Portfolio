import { Figtree } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import "highlight.js/styles/atom-one-dark.css";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { Toaster } from "sonner";
import { metadata as sharedMetadata } from "./shared-metadata";
import Script from "next/script";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata = sharedMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${figtree.variable} ${figtree.className}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Figtree:ital,wght@0,300..900;1,300..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${figtree.className} font-sans antialiased dark`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          forcedTheme="dark"
        >
          <NextTopLoader color="#55C7E8" showSpinner={false} />
          <SmoothScrollProvider>{children}</SmoothScrollProvider>
          <Toaster
            toastOptions={{
              className:
                "bg-surface text-foreground border border-border rounded-lg shadow-lg font-sans",
            }}
          />
        </ThemeProvider>
        <Script
          defer
          src="https://analytics.ametsowou.me/script.js"
          data-website-id="a471f11b-b424-4d08-97be-7407afe56780"
        ></Script>
        <Script
          defer
          src="https://analytics.ametsowou.me/recorder.js"
          data-website-id="a471f11b-b424-4d08-97be-7407afe56780"
        ></Script>
      </body>
    </html>
  );
}
