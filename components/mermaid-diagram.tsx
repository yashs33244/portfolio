"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const renderDiagram = async () => {
    if (!ref.current || !chart.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Dynamic import of mermaid
      const mermaidModule = await import("mermaid");
      const mermaid = mermaidModule.default;

      // Initialize mermaid
      mermaid.initialize({
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
          background: "#0f172a",
          mainBkg: "#1e293b",
          secondBkg: "#374151",
          tertiaryBkg: "#475569",
        },
        flowchart: {
          htmlLabels: true,
          curve: "basis",
        },
        sequence: {
          actorMargin: 50,
          width: 150,
          height: 65,
          boxMargin: 10,
          boxTextMargin: 5,
          noteMargin: 10,
          messageMargin: 35,
          mirrorActors: true,
          bottomMarginAdj: 1,
          useMaxWidth: true,
        },
        gantt: {
          titleTopMargin: 25,
          barHeight: 20,
          fontsize: 11,
          sidePadding: 75,
          leftPadding: 75,
          gridLineStartPadding: 35,
          fontSize: 11,
          numberSectionStyles: 4,
        },
      });

      // Clear previous content
      ref.current.innerHTML = "";

      // Generate unique ID for the diagram
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

      try {
        // Try the new mermaid.render API (returns {svg, bindFunctions})
        const result = (await mermaid.render(id, chart)) as any;

        if (result && typeof result === "object" && result.svg) {
          ref.current.innerHTML = result.svg;
          if (result.bindFunctions) {
            result.bindFunctions(ref.current);
          }
        } else if (typeof result === "string") {
          ref.current.innerHTML = result;
        } else {
          throw new Error("Unexpected render result format");
        }
      } catch (renderError) {
        // Fallback: try using mermaid.run() for older versions
        console.warn(
          "mermaid.render failed, trying fallback method:",
          renderError
        );

        const tempDiv = document.createElement("div");
        tempDiv.className = "mermaid";
        tempDiv.textContent = chart;
        tempDiv.id = id;
        ref.current.appendChild(tempDiv);

        await mermaid.run();
      }

      setIsLoading(false);
    } catch (err) {
      console.error("Failed to render mermaid diagram:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
      setIsLoading(false);

      if (ref.current) {
        ref.current.innerHTML = `
          <div class="p-4 rounded-md bg-red-900/20 border border-red-500/30">
            <p class="text-red-400 font-medium">Failed to render diagram</p>
            <p class="text-red-300 text-sm mt-1">${
              err instanceof Error ? err.message : "Unknown error"
            }</p>
            <details class="mt-2">
              <summary class="text-red-300 cursor-pointer text-sm">Show original code</summary>
              <pre class="mt-2 overflow-auto text-sm p-2 bg-figma-dark border border-white/20 rounded text-white">${chart}</pre>
            </details>
          </div>
        `;
      }
    }
  };

  useEffect(() => {
    renderDiagram();
  }, [chart]);

  return (
    <div className="mermaid-container my-6 p-4 bg-figma-dark rounded-lg border border-white/20 overflow-auto">
      {isLoading && (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-figma-purple"></div>
          <span className="ml-2 text-white/70">Rendering diagram...</span>
        </div>
      )}

      <div
        ref={ref}
        className="mermaid-diagram"
        style={{
          minHeight: isLoading ? "100px" : "auto",
          display: isLoading ? "none" : "block",
        }}
      />
    </div>
  );
}
