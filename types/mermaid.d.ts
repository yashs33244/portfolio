/**
 * Type declarations for mermaid
 */
declare namespace mermaid {
  function initialize(config: MermaidConfig): void;
  function run(options?: { querySelector: string }): void;
}

interface MermaidConfig {
  startOnLoad?: boolean;
  theme?: 'default' | 'forest' | 'dark' | 'neutral' | 'null';
  logLevel?: 1 | 2 | 3 | 4 | 5;
  securityLevel?: 'strict' | 'loose' | 'antiscript';
  sequence?: SequenceConfig;
  flowchart?: FlowchartConfig;
  gantt?: GanttConfig;
  fontFamily?: string;
  altFontFamily?: string;
  themeCSS?: string;
  themeVariables?: Record<string, string>;
}

interface SequenceConfig {
  diagramMarginX?: number;
  diagramMarginY?: number;
  actorMargin?: number;
  width?: number;
  height?: number;
  boxMargin?: number;
  boxTextMargin?: number;
  noteMargin?: number;
  messageMargin?: number;
  messageAlign?: string;
  mirrorActors?: boolean;
  bottomMarginAdj?: number;
}

interface FlowchartConfig {
  diagramPadding?: number;
  htmlLabels?: boolean;
  curve?: string;
}

interface GanttConfig {
  titleTopMargin?: number;
  barHeight?: number;
  barGap?: number;
  topPadding?: number;
  leftPadding?: number;
  gridLineStartPadding?: number;
  fontSize?: number;
  fontFamily?: string;
}

/**
 * Add mermaid to the global window object
 */
interface Window {
  mermaid: typeof mermaid;
} 