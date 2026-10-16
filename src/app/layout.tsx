import { Figtree } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/atom-one-dark.css";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/providers/theme-provider";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${figtree.variable} font-sans antialiased dark`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          forcedTheme="dark"
        >
          <NextTopLoader color="#55C7E8" showSpinner={false} />
          {children}
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
