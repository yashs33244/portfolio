declare module 'mermaid' {
  export interface MermaidConfig {
    theme?: string;
    startOnLoad?: boolean;
    securityLevel?: string;
    [key: string]: any;
  }

  export function initialize(config?: MermaidConfig): void;
  export function init(selector?: string | Node | NodeList, config?: MermaidConfig): void;
  export function parse(text: string): boolean;
  export function render(id: string, text: string, callback?: (svgCode: string, bindFunctions: any) => void): void;
  export function run(): void;
}

declare global {
  interface Window {
    mermaid: typeof import('mermaid');
    onMermaidLoad?: () => void;
  }
}