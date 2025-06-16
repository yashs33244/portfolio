"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

interface MermaidDiagramProps {
  chart: string;
}

declare global {
  interface Window {
    mermaid: typeof mermaid;
    onMermaidLoad?: () => void;
  }
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);

  const renderDiagram = () => {
    if (ref.current) {
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
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
          themeVariables: {
            primaryColor: "#7a87fb",
            primaryTextColor: "#ffffff",
            primaryBorderColor: "#ffffff",
            lineColor: "#ffffff",
            sectionBkgColor: "#1e293b",
            altSectionBkgColor: "#374151",
            gridColor: "#374151",
            secondaryColor: "#ffd49c",
            tertiaryColor: "#1e293b",
          },
        });

        // Trigger immediate rendering
        window.mermaid.run();
      } catch (err) {
        console.error("Failed to render mermaid diagram:", err);
        if (ref.current) {
          ref.current.innerHTML = `
            <div class="p-4 rounded-md bg-red-900/20 border border-red-500/30">
              <p class="text-red-400 font-medium">Failed to render diagram</p>
              <pre class="mt-2 overflow-auto text-sm p-2 bg-figma-dark border border-white/20 rounded text-white">${chart}</pre>
            </div>
          `;
        }
      }
    }
  };

  useEffect(() => {
    // Define global handler for mermaid script load
    window.onMermaidLoad = () => {
      renderDiagram();
    };

    // Try to render immediately if mermaid is already loaded
    if (window.mermaid) {
      renderDiagram();
    }

    return () => {
      window.onMermaidLoad = undefined;
    };
  }, [chart]);

  return (
    <>
      <Script
        id="mermaid-script"
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          renderDiagram();
        }}
      />

      <div
        ref={ref}
        className="mermaid-container my-6 p-4 bg-figma-dark rounded-lg border border-white/20 overflow-auto"
      >
        <div className="mermaid">{chart}</div>
      </div>
    </>
  );
}
