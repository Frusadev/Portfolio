import { Quicksand } from "next/font/google";
import "./globals.css";
import "highlight.js/styles/atom-one-dark.css";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import { metadata as sharedMetadata } from "./shared-metadata";
import Head from "next/head";
import Script from "next/script";

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
      <body className={`${quicksand.variable} font-sans antialiased light`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="light"
          forcedTheme="light"
        >
          <NextTopLoader color="#300000" />
          {children}
          <Toaster
            toastOptions={{
              className:
                "bg-background text-red-950 border-4 border-red-950 rounded-none shadow-[4px_4px_0px_0px_rgba(69,10,10,1)] font-bold uppercase tracking-wider font-sans",
              style: {
                backgroundColor: "#e6dcc6",
                color: "#450a0a",
                borderColor: "#450a0a",
                borderWidth: "4px",
                boxShadow: "4px 4px 0px 0px rgba(69,10,10,1)",
                borderRadius: "0",
              },
            }}
          />
        </ThemeProvider>
        <Script
          defer
          src="https://analytics.ametsowou.me/script.js"
          data-website-id="6ce356b8-79b7-4342-ad4a-b80dc469d5d2"
        ></Script>
        <Script
          defer
          src="https://analytics.ametsowou.me/recorder.js"
          data-website-id="6ce356b8-79b7-4342-ad4a-b80dc469d5d2"
          data-sample-rate="0.15"
          data-mask-level="moderate"
          data-max-duration="600000"
        ></Script>
      </body>
    </html>
  );
}
