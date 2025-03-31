/**
 * Type declarations for mermaid
 */
declare namespace mermaid {
  function initialize(config: MermaidConfig): void;
  function run(options?: { querySelector: string }): void;
  function contentLoaded(): void;
  function render(id: string, text: string): Promise<{ svg: string }>;
}

interface MermaidConfig {
  startOnLoad?: boolean;
  theme?: 'default' | 'forest' | 'dark' | 'neutral' | string;
  securityLevel?: 'strict' | 'loose' | 'antiscript';
  fontFamily?: string;
  logLevel?: 1 | 2 | 3 | 4 | 5;
  flowchart?: any;
  sequence?: any;
  gantt?: any;
  journey?: any;
  class?: any;
  state?: any;
  er?: any;
  pie?: any;
  requirement?: any;
  mindmap?: any;
  [key: string]: any;
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
  [key: string]: any; // Allow additional properties
}

interface FlowchartConfig {
  diagramPadding?: number;
  htmlLabels?: boolean;
  curve?: string;
  [key: string]: any; // Allow additional properties
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
  [key: string]: any; // Allow additional properties
}

interface MermaidAPI {
  render: (id: string, text: string, callback: (svg: string) => void, container?: Element) => void;
  parse: (text: string) => void;
  initialize: (config: MermaidConfig) => void;
  run: (options?: any) => void;
  contentLoaded: () => void;
}

declare global {
  interface Window {
    mermaid: MermaidAPI;
    onMermaidLoad?: () => void;
  }
}

export {};

/**
 * Add mermaid to the global window object
 */
declare module 'mermaid' {
  interface MermaidConfig {
    theme?: string;
    startOnLoad?: boolean;
    securityLevel?: 'strict' | 'loose' | 'antiscript';
    themeVariables?: any;
    flowchart?: any;
    sequence?: any;
    gantt?: any;
    journey?: any;
    class?: any;
    state?: any;
    er?: any;
    pie?: any;
    requirement?: any;
    gitGraph?: any;
    [key: string]: any;
  }

  function initialize(config: MermaidConfig): void;
  function init(config: MermaidConfig): void;
  function parse(text: string): boolean;
  function render(id: string, text: string, callback?: (svgCode: string, bindFunctions: any) => void): Promise<{ svg: string, bindFunctions: any }>;
  function contentLoaded(): void;

  const mermaidAPI: {
    render: typeof render;
    parse: typeof parse;
    initialize: typeof initialize;
    init: typeof init;
  };

  export default {
    initialize,
    init,
    parse,
    render,
    contentLoaded,
    mermaidAPI
  };
}

// Add a global declaration for the mermaid instance loaded via CDN
interface Window {
  mermaid: typeof import('mermaid').default & {
    initialize: (config: import('mermaid').MermaidConfig) => void;
  };
  onMermaidLoad?: () => void;
} 