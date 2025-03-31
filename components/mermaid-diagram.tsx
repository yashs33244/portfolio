"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

interface MermaidDiagramProps {
  chart: string;
}

export function MermaidDiagram({ chart }: MermaidDiagramProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isMermaidLoaded, setIsMermaidLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  // First useEffect - only runs once on mount to set client-side state
  useEffect(() => {
    setIsClient(true);
    setHasMounted(true);
  }, []);

  // Function to render the diagram
  const renderDiagram = () => {
    if (!ref.current || !window.mermaid) return;

    try {
      // Clear previous content
      ref.current.innerHTML = "";

      // Create a unique ID for the diagram
      const id = `mermaid-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

      // Create the diagram element
      const element = document.createElement("div");
      element.className = "mermaid";
      element.id = id;
      element.textContent = chart;
      ref.current.appendChild(element);

      // Initialize mermaid with optimal settings
      window.mermaid.initialize({
        startOnLoad: false,
        theme: "default",
        securityLevel: "loose",
        fontFamily: "inherit",
      });

      // Render the diagram
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
  };

  // Load and setup Mermaid script
  useEffect(() => {
    if (!isClient) return;

    // Define global callback for script load
    window.onMermaidLoad = () => {
      setIsMermaidLoaded(true);
    };

    // Check if mermaid is already loaded
    if (window.mermaid) {
      setIsMermaidLoaded(true);
    } else {
      // Load mermaid script if it's not already loaded
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js";
      script.async = true;
      script.onload = () => {
        setIsMermaidLoaded(true);
      };
      document.body.appendChild(script);
    }

    // Clean up
    return () => {
      window.onMermaidLoad = undefined;
    };
  }, [isClient]);

  // Render diagram when mermaid is loaded
  useEffect(() => {
    if (isClient && isMermaidLoaded && ref.current) {
      // Small delay to ensure DOM is ready
      const timer = setTimeout(() => {
        renderDiagram();
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [chart, isMermaidLoaded, isClient]);

  return (
    <div
      ref={ref}
      className="mermaid-container my-6 p-4 bg-white rounded-lg border border-gray-200 overflow-auto"
      suppressHydrationWarning
    >
      <div className="mermaid-content min-h-[100px] flex items-center justify-center">
        {/* This content is the same on server and client to avoid hydration mismatch */}
        <div className="text-gray-400" suppressHydrationWarning>
          {!hasMounted ? "Loading diagram..." : ""}
        </div>
        {/* The chart text is just text at this point, so it doesn't cause hydration issues */}
        <div style={{ display: "none" }} suppressHydrationWarning>
          {chart}
        </div>
      </div>
    </div>
  );
}
