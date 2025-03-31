import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./providers";

// Use Roboto font
const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tanish Singh | Full Stack Developer & Software Engineer",
  description:
    "Professional portfolio of Tanish Singh, a passionate Software Engineer and Full Stack Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload mermaid script to avoid hydration issues */}
        <script
          async
          src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        />
        {/* Initialize mermaid to prevent hydration issues */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.onMermaidLoad = function() {
                  if (window.mermaid) {
                    window.mermaid.initialize({
                      startOnLoad: false,
                      theme: 'default',
                      securityLevel: 'loose'
                    });
                  }
                };
              }
            `,
          }}
        />
      </head>
      <body
        className={cn(
          roboto.className,
          "min-h-screen bg-background antialiased"
        )}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

import "./globals.css";
