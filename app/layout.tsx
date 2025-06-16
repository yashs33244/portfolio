import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Yash Singh | Fullstack Developer & Software Engineer",
  description:
    "Professional portfolio of Yash Singh, a passionate Software Engineer and Fullstack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-figma-dark text-white font-poppins antialiased"
        )}
        suppressHydrationWarning
      >
        <Providers>
          <div className="relative flex min-h-screen flex-col bg-figma-dark">
            <Navbar />
            <main className="flex-1 pt-[120px] md:pt-[100px]">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

import "./globals.css";
