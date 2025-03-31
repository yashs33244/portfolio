/**
 * Global window interface augmentation
 */
interface Window {
  mermaid: any; // Using any to avoid conflicts
  onMermaidLoad?: () => void;
} 