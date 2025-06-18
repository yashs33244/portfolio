"use client";

import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import Image from "next/image";
import Link from "next/link";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { MermaidDiagram } from "./mermaid-diagram";
import "katex/dist/katex.min.css";

// Add type declaration for extended window object
declare global {
  interface Window {
    onMermaidLoad?: () => void;
  }
}

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.mermaid) {
      try {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: "dark",
          securityLevel: "loose",
        });

        window.mermaid.run();

        if (window.onMermaidLoad) {
          window.onMermaidLoad();
        }
      } catch (e) {
        console.error("Mermaid initialization error:", e);
      }
    }
  }, [code]);

  return (
    <div
      className="mdx prose prose-invert max-w-none bg-figma-dark min-h-screen py-8 px-4 md:px-8"
      suppressHydrationWarning
    >
      <style jsx global>{`
        /* Custom MDX styling */
        .mdx {
          color: #f8fafc;
          line-height: 1.7;
        }

        .mdx h1,
        .mdx h2,
        .mdx h3,
        .mdx h4,
        .mdx h5,
        .mdx h6 {
          color: #ffffff;
          font-weight: 600;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }

        .mdx h1 {
          font-size: 2.5rem;
          border-bottom: 2px solid #374151;
          padding-bottom: 0.5rem;
        }

        .mdx h2 {
          font-size: 2rem;
          border-bottom: 1px solid #374151;
          padding-bottom: 0.25rem;
        }

        .mdx p {
          margin: 1rem 0;
          color: #e2e8f0;
        }

        .mdx a {
          color: #7a87fb;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: all 0.2s ease;
        }

        .mdx a:hover {
          color: #ffd49c;
          border-bottom-color: #ffd49c;
        }

        .mdx ul,
        .mdx ol {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        .mdx li {
          margin: 0.5rem 0;
          color: #e2e8f0;
        }

        .mdx blockquote {
          border-left: 4px solid #7a87fb;
          background: rgba(122, 135, 251, 0.1);
          margin: 1.5rem 0;
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
        }

        .mdx blockquote p {
          margin: 0;
          font-style: italic;
          color: #cbd5e1;
        }

        .mdx table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
          background: #1e293b;
          border-radius: 0.5rem;
          overflow: hidden;
        }

        .mdx th,
        .mdx td {
          padding: 0.75rem 1rem;
          text-align: left;
          border-bottom: 1px solid #374151;
        }

        .mdx th {
          background: #374151;
          font-weight: 600;
          color: #ffffff;
        }

        .mdx td {
          color: #e2e8f0;
        }

        .mdx hr {
          border: none;
          height: 1px;
          background: linear-gradient(
            to right,
            transparent,
            #374151,
            transparent
          );
          margin: 2rem 0;
        }

        /* Inline code styling */
        .mdx code:not(pre code) {
          background: rgba(122, 135, 251, 0.2);
          color: #ffd49c;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          font-family: "JetBrains Mono", "Fira Code", Consolas, monospace;
        }

        /* Video styling */
        .mdx video {
          width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }

        /* SVG styling */
        .mdx svg {
          max-width: 100%;
          height: auto;
          margin: 1.5rem auto;
          display: block;
        }

        /* Mermaid diagrams */
        .mdx .mermaid {
          text-align: center;
          margin: 2rem auto;
          background: #1e293b;
          border-radius: 0.5rem;
          padding: 1rem;
        }

        /* Custom syntax highlighter overrides */
        .mdx pre {
          background: #0f172a !important;
          border: 1px solid #374151;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
          overflow-x: auto;
          font-family: "JetBrains Mono", "Fira Code", Consolas, monospace;
        }

        .mdx pre code {
          background: transparent !important;
          padding: 0 !important;
          font-size: 0.875rem;
          line-height: 1.7;
        }

        /* Force dark theme for syntax highlighter */
        .mdx .token.comment,
        .mdx .token.prolog,
        .mdx .token.doctype,
        .mdx .token.cdata {
          color: #6b7280;
        }

        .mdx .token.punctuation {
          color: #d1d5db;
        }

        .mdx .token.property,
        .mdx .token.tag,
        .mdx .token.boolean,
        .mdx .token.number,
        .mdx .token.constant,
        .mdx .token.symbol,
        .mdx .token.deleted {
          color: #f87171;
        }

        .mdx .token.selector,
        .mdx .token.attr-name,
        .mdx .token.string,
        .mdx .token.char,
        .mdx .token.builtin,
        .mdx .token.inserted {
          color: #34d399;
        }

        .mdx .token.operator,
        .mdx .token.entity,
        .mdx .token.url,
        .mdx .language-css .token.string,
        .mdx .style .token.string {
          color: #fbbf24;
        }

        .mdx .token.atrule,
        .mdx .token.attr-value,
        .mdx .token.keyword {
          color: #8b5cf6;
        }

        .mdx .token.function,
        .mdx .token.class-name {
          color: #60a5fa;
        }

        .mdx .token.regex,
        .mdx .token.important,
        .mdx .token.variable {
          color: #f59e0b;
        }

        /* Obsidian-inspired syntax highlighting colors */
        .token.comment,
        .token.prolog,
        .token.doctype,
        .token.cdata {
          color: #6e7681; /* Obsidian comment color */
        }

        .token.punctuation {
          color: #c9d1d9; /* Obsidian punctuation */
        }

        .token.property,
        .token.tag,
        .token.constant,
        .token.symbol,
        .token.deleted {
          color: #ff7b72; /* Obsidian tag/property color */
        }

        .token.boolean,
        .token.number {
          color: #79c0ff; /* Obsidian number color */
        }

        .token.selector,
        .token.attr-name,
        .token.string,
        .token.char,
        .token.builtin,
        .token.inserted {
          color: #a5d6ff; /* Obsidian string color */
        }

        .token.operator,
        .token.entity,
        .token.url,
        .language-css .token.string,
        .style .token.string,
        .token.variable {
          color: #ff7b72; /* Obsidian operator color */
        }

        .token.atrule,
        .token.attr-value,
        .token.function,
        .token.class-name {
          color: #d2a8ff; /* Obsidian function color */
        }

        .token.keyword {
          color: #ff7b72; /* Obsidian keyword color */
        }

        .token.regex,
        .token.important {
          color: #ffa657; /* Obsidian important color */
        }

        .token.important,
        .token.bold {
          font-weight: bold;
        }

        .token.italic {
          font-style: italic;
        }

        .token.entity {
          cursor: help;
        }

        /* Custom highlighting for specific languages */
        .language-typescript .token.keyword,
        .language-javascript .token.keyword {
          color: #ff7b72;
        }

        .language-typescript .token.type,
        .language-javascript .token.type {
          color: #79c0ff;
        }

        .language-json .token.property {
          color: #79c0ff;
        }

        .language-json .token.string {
          color: #a5d6ff;
        }

        /* Line highlighting */
        .line--highlighted {
          background-color: rgba(255, 255, 255, 0.1);
          display: block;
          margin-left: -1rem;
          margin-right: -1rem;
          padding-left: 1rem;
          padding-right: 1rem;
        }

        /* Word highlighting */
        .word--highlighted {
          background-color: rgba(255, 255, 255, 0.2);
          padding: 0.2rem;
          border-radius: 0.25rem;
        }
      `}</style>

      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw, rehypeSlug]}
        components={{
          h1: ({ className, children, ...props }) => (
            <h1
              className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl mb-6 bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent"
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ className, children, ...props }) => (
            <h2
              className="scroll-m-20 border-b border-white/10 pb-2 text-3xl font-semibold tracking-tight first:mt-0 mt-8 mb-4 text-white"
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ className, children, ...props }) => (
            <h3
              className="scroll-m-20 text-2xl font-semibold tracking-tight mt-6 mb-3 text-white"
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ className, children, ...props }) => (
            <h4
              className="scroll-m-20 text-xl font-semibold tracking-tight mt-4 mb-2 text-white"
              {...props}
            >
              {children}
            </h4>
          ),
          p: ({ className, children, ...props }) => (
            <p
              className="leading-7 [&:not(:first-child)]:mt-4 text-gray-300"
              {...props}
            >
              {children}
            </p>
          ),
          ul: ({ className, children, ...props }) => (
            <ul className="my-4 ml-6 list-disc text-gray-300" {...props}>
              {children}
            </ul>
          ),
          ol: ({ className, children, ...props }) => (
            <ol className="my-4 ml-6 list-decimal text-gray-300" {...props}>
              {children}
            </ol>
          ),
          li: ({ className, children, ...props }) => (
            <li className="mt-2" {...props}>
              {children}
            </li>
          ),
          blockquote: ({ className, children, ...props }) => (
            <blockquote
              className="mt-6 border-l-4 border-purple-500 pl-6 italic text-gray-300 bg-purple-900/20 py-2 rounded-r"
              {...props}
            >
              {children}
            </blockquote>
          ),
          table: ({ className, children, ...props }) => (
            <div className="my-6 w-full overflow-y-auto">
              <table
                className="w-full border-collapse border border-gray-600"
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          tr: ({ className, children, ...props }) => (
            <tr
              className="border-b border-gray-600 transition-colors hover:bg-gray-800/50"
              {...props}
            >
              {children}
            </tr>
          ),
          th: ({ className, children, ...props }) => (
            <th
              className="border border-gray-600 px-4 py-2 text-left font-bold bg-gray-800 text-white"
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ className, children, ...props }) => (
            <td
              className="border border-gray-600 px-4 py-2 text-gray-300"
              {...props}
            >
              {children}
            </td>
          ),
          img: ({ src, alt, title }) => {
            if (!src) return null;

            // Ensure src is a string
            const srcString = typeof src === "string" ? src : "";

            // Handle video files
            if (srcString.match(/\.(mp4|webm|ogg|mov)$/i)) {
              return (
                <figure className="my-8">
                  <video
                    src={srcString}
                    title={title || alt || ""}
                    controls
                    className="w-full rounded-lg"
                  >
                    Your browser does not support the video tag.
                  </video>
                  {alt && (
                    <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                      {alt}
                    </figcaption>
                  )}
                </figure>
              );
            }

            return (
              <figure className="my-8">
                <Image
                  src={srcString}
                  alt={alt || ""}
                  title={title || alt || ""}
                  width={800}
                  height={400}
                  className="rounded-lg w-full h-auto"
                />
                {alt && (
                  <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          },
          a: ({ href, children, ...props }) => {
            if (!href) return <span>{children}</span>;

            const isExternal = href.startsWith("http");
            const isAnchor = href.startsWith("#");

            if (isExternal) {
              return (
                <a
                  href={href}
                  className="text-purple-400 hover:text-orange-400 underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  {...props}
                >
                  {children}
                </a>
              );
            }

            if (isAnchor) {
              return (
                <a
                  href={href}
                  className="text-purple-400 hover:text-orange-400 underline transition-colors"
                  {...props}
                >
                  {children}
                </a>
              );
            }

            return (
              <Link
                href={href}
                className="text-purple-400 hover:text-orange-400 underline transition-colors"
                {...props}
              >
                {children}
              </Link>
            );
          },
          code: ({ node, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const isInline = !node?.parent || node.parent.tagName !== "pre";

            // Handle mermaid diagrams
            if (language === "mermaid") {
              return (
                <MermaidDiagram chart={String(children).replace(/\n$/, "")} />
              );
            }

            return !isInline && match ? (
              <div className="relative">
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={language}
                  PreTag="div"
                  customStyle={
                    {
                      background: "#0d1117", // GitHub dark background (similar to Obsidian)
                      border: "1px solid #30363d",
                      borderRadius: "0.5rem",
                      margin: "1.5rem 0",
                      fontSize: "0.875rem",
                      fontFamily:
                        '"JetBrains Mono", "Fira Code", Consolas, monospace',
                      padding: "1rem",
                    } as any
                  }
                  codeTagProps={{
                    style: {
                      background: "transparent",
                      fontFamily:
                        '"JetBrains Mono", "Fira Code", Consolas, monospace',
                      color: "#c9d1d9", // Normal text color (Obsidian style)
                    } as any,
                  }}
                  {...props}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
                <div className="absolute top-2 right-2 text-xs text-white/50 bg-figma-dark/50 px-2 py-1 rounded">
                  {language}
                </div>
              </div>
            ) : (
              <code
                className="bg-figma-purple/20 text-figma-orange px-1.5 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },
          hr: ({ ...props }) => (
            <hr className="my-8 border-t border-gray-600" {...props} />
          ),
        }}
      >
        {code}
      </ReactMarkdown>
    </div>
  );
}
