"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

// Add type definition for window.mermaid
declare global {
  interface Window {
    mermaid: {
      initialize: (config: {
        startOnLoad?: boolean;
        theme?: string;
        securityLevel?: string;
        fontFamily?: string;
        [key: string]: any;
      }) => void;
      contentLoaded: () => void;
      render: (id: string, text: string) => Promise<{ svg: string }>;
    };
  }
}

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize mermaid immediately if it's already loaded
    if (window.mermaid && ref.current) {
      try {
        // Clear previous content
        ref.current.innerHTML = "";

        // Create the diagram element
        const diagramElement = document.createElement("div");
        diagramElement.className = "mermaid";
        diagramElement.textContent = chart;
        ref.current.appendChild(diagramElement);

        // Initialize mermaid with optimal settings
        window.mermaid.initialize({
          startOnLoad: false, // We'll handle initialization ourselves
          theme: "default",
          securityLevel: "loose",
        });

        // Trigger immediate rendering
        window.mermaid.run();
      } catch (err) {
        console.error("Failed to render mermaid diagram:", err);
        if (ref.current) {
          ref.current.innerHTML = `
            <div class="p-4 rounded-md bg-red-50 border border-red-200">
              <p class="text-red-700 font-medium">Failed to render diagram</p>
              <pre class="mt-2 overflow-auto text-sm p-2 bg-white border rounded">${chart}</pre>
            </div>
          `;
        }
      }
    }
  }, [chart]);

  // Once on mount, add a global mermaid load handler for future loads
  useEffect(() => {
    // Define global handler for mermaid script load
    window.onMermaidLoad = () => {
      // Find any unprocessed diagrams and initialize them
      const diagrams = document.querySelectorAll(
        '.mermaid:not([data-processed="true"])'
      );
      if (diagrams.length > 0 && window.mermaid) {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
        });
        window.mermaid.run();
      }
    };

    return () => {
      // Clean up on unmount
      delete window.onMermaidLoad;
    };
  }, []);

  return (
    <>
      {/* Load mermaid script with beforeInteractive strategy for faster loading */}
      <Script
        id="mermaid-script"
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          if (typeof window.onMermaidLoad === "function") {
            window.onMermaidLoad();
          }
        }}
      />

      {/* Add a preload link for the mermaid script for even faster loading */}
      <link
        rel="preload"
        href="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        as="script"
      />

      <div
        ref={ref}
        className="mermaid-container my-6 p-4 bg-white rounded-lg border border-gray-200 overflow-auto"
      >
        <div className="mermaid">{chart}</div>
      </div>
    </>
  );
}
