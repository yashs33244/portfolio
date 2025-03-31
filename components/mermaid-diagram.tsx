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
        className="mermaid-container my-6 p-4 bg-white rounded-lg border border-gray-200 overflow-auto"
      >
        <div className="mermaid">{chart}</div>
      </div>
    </>
  );
}
