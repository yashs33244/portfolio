'use client';

import { useEffect } from 'react';

/**
 * Initializes Mermaid diagrams when the component is active
 * @param isActive Whether the component using mermaid is active
 */
export function useMermaidEffect(isActive: boolean = true) {
  useEffect(() => {
    if (!isActive) return;

    // Add mermaid script if it doesn't exist
    const loadMermaid = async () => {
      // Check if window and mermaid are defined
      if (typeof window === 'undefined') return;
      
      // Only load mermaid if it's not already loaded
      if (!(window as any).mermaid) {
        const mermaidScript = document.createElement('script');
        mermaidScript.src = 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js';
        mermaidScript.async = true;
        mermaidScript.onload = initializeMermaid;
        document.body.appendChild(mermaidScript);
      } else {
        initializeMermaid();
      }
    };

    const initializeMermaid = () => {
      // Wait a bit to ensure DOM is ready with mermaid elements
      setTimeout(() => {
        if ((window as any).mermaid) {
          try {
            // Initialize mermaid with some defaults
            (window as any).mermaid.initialize({
              startOnLoad: true,
              theme: 'neutral',
              securityLevel: 'loose',
              fontFamily: 'inherit',
              logLevel: 4, // Error only
            });
            
            // Parse all diagrams
            (window as any).mermaid.run();
          } catch (error) {
            console.error('Error initializing mermaid:', error);
          }
        }
      }, 300);
    };

    loadMermaid();

    // Cleanup function to remove the script when component unmounts
    return () => {
      // We don't remove the script as it might be used elsewhere,
      // but we could reset or clean up specific elements if needed
    };
  }, [isActive]);
} 