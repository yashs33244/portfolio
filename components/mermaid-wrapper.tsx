"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface MermaidWrapperProps {
  chart: string;
}

export default function MermaidWrapper({ chart }: MermaidWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mermaidLoaded = useRef(false);

  useEffect(() => {
    // Function to render Mermaid diagrams
    const renderMermaidDiagram = () => {
      if (!containerRef.current || !window.mermaid) return;

      try {
        const id = `mermaid-${Math.random().toString(36).substring(2, 11)}`;
        containerRef.current.innerHTML = `<div class="mermaid" id="${id}">${chart}</div>`;

        // Initialize and render mermaid diagram
        window.mermaid.initialize({
          startOnLoad: true,
          theme: "default",
          securityLevel: "loose",
        });

        window.mermaid.run();
      } catch (error) {
        console.error("Mermaid rendering error:", error);
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="p-4 border border-rose-500 bg-rose-50 rounded-md">
              <p class="font-semibold text-rose-700">Failed to render diagram</p>
              <pre class="mt-2 text-sm bg-white p-2 rounded border">${chart}</pre>
            </div>
          `;
        }
      }
    };

    // Check if mermaid is already loaded
    if (window.mermaid) {
      renderMermaidDiagram();
    } else if (mermaidLoaded.current) {
      // Mermaid script loaded but window.mermaid not yet available
      const checkMermaidInterval = setInterval(() => {
        if (window.mermaid) {
          clearInterval(checkMermaidInterval);
          renderMermaidDiagram();
        }
      }, 100);

      return () => clearInterval(checkMermaidInterval);
    }
  }, [chart]);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          mermaidLoaded.current = true;
        }}
      />
      <div
        ref={containerRef}
        className="my-6 overflow-auto rounded-lg bg-white border border-gray-200 p-4"
      />
    </>
  );
}

// Add typescript definition for window.mermaid
declare global {
  interface Window {
    mermaid: {
      initialize: (config: {
        startOnLoad?: boolean;
        theme?: string;
        securityLevel?: string;
        [key: string]: any;
      }) => void;
      run: () => void;
    };
  }
}
