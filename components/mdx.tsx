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
        .mdx pre[class*="language-"] {
          margin: 1.5rem 0 !important;
          border-radius: 0.5rem !important;
          border: 1px solid #374151 !important;
        }

        .mdx .code-title {
          background: #374151;
          color: #ffffff;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 0.5rem 0.5rem 0 0;
          margin-bottom: 0;
          font-family: "JetBrains Mono", "Fira Code", Consolas, monospace;
        }

        .mdx .code-title + pre {
          margin-top: 0 !important;
          border-radius: 0 0 0.5rem 0.5rem !important;
        }
      `}</style>

      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw, rehypeSlug]}
        components={{
          h1: ({ className, children, ...props }) => (
            <h1
              className={`mt-10 scroll-m-20 text-4xl font-bold ${className}`}
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ className, children, ...props }) => (
            <h2
              className={`mt-8 scroll-m-20 text-3xl font-semibold ${className}`}
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ className, children, ...props }) => (
            <h3
              className={`mt-6 scroll-m-20 text-2xl font-semibold ${className}`}
              {...props}
            >
              {children}
            </h3>
          ),
          h4: ({ className, children, ...props }) => (
            <h4
              className={`mt-6 scroll-m-20 text-xl font-semibold ${className}`}
              {...props}
            >
              {children}
            </h4>
          ),
          a: ({ href, children, ...props }) => {
            if (href?.startsWith("/")) {
              return (
                <Link href={href} {...props}>
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            );
          },
          p: ({ node, children, ...props }: any) => {
            const hasImage = node?.children?.some(
              (child: any) => child.tagName === "img"
            );

            const hasMermaid = node?.children?.some(
              (child: any) =>
                child.type === "element" &&
                child.properties?.className?.includes("language-mermaid")
            );

            const hasVideo = node?.children?.some(
              (child: any) => child.tagName === "video"
            );

            if (hasImage || hasMermaid || hasVideo) {
              return <div {...props}>{children}</div>;
            }

            return (
              <p {...props} suppressHydrationWarning>
                {children}
              </p>
            );
          },
          img: ({ src, alt, title }) => {
            if (!src) return null;

            // Handle video files
            if (src.match(/\.(mp4|webm|ogg|mov)$/i)) {
              return (
                <figure className="my-8">
                  <video
                    src={src}
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

            // Handle SVG files
            if (src.match(/\.svg$/i)) {
              return (
                <figure className="my-8">
                  <div className="flex justify-center">
                    <img
                      src={src}
                      alt={alt || ""}
                      title={title || alt || ""}
                      className="max-w-full h-auto"
                    />
                  </div>
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
                <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                  <Image
                    src={src}
                    alt={alt || ""}
                    title={title || alt || ""}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 1000px, 100vw"
                    priority
                  />
                </div>
                {alt && (
                  <figcaption className="mt-2 text-center text-sm text-muted-foreground">
                    {alt}
                  </figcaption>
                )}
              </figure>
            );
          },
          pre: ({ node, children, ...props }: any) => {
            try {
              if (
                node?.children?.length > 0 &&
                node.children[0]?.tagName === "code" &&
                node.children[0]?.properties?.className?.includes(
                  "language-mermaid"
                )
              ) {
                const content = node.children[0]?.children?.[0]?.value || "";
                return <MermaidDiagram chart={content} />;
              }
            } catch (e) {
              console.error("Error processing code block:", e);
            }

            return <pre {...props}>{children}</pre>;
          },
          code: ({ node, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const isInline = !node?.parent || node.parent.tagName !== "pre";

            // Handle inline code
            if (isInline) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }

            // Handle code blocks with syntax highlighting
            const codeString = String(children).replace(/\n$/, "");

            // Extract title from meta string if present
            const meta = node?.data?.meta || "";
            const titleMatch = meta.match(/title="([^"]+)"/);
            const title = titleMatch ? titleMatch[1] : null;

            return (
              <div className="code-block-wrapper">
                {title && <div className="code-title">{title}</div>}
                <SyntaxHighlighter
                  style={vscDarkPlus}
                  language={language || "text"}
                  PreTag="div"
                  customStyle={{
                    margin: 0,
                    borderRadius: title ? "0 0 0.5rem 0.5rem" : "0.5rem",
                    background: "#0f172a",
                    border: "1px solid #374151",
                    padding: "1rem",
                  }}
                  codeTagProps={{
                    style: {
                      fontFamily:
                        "'JetBrains Mono', 'Fira Code', Consolas, monospace",
                      fontSize: "0.875rem",
                      lineHeight: "1.5",
                    },
                  }}
                  showLineNumbers={codeString.split("\n").length > 5}
                  lineNumberStyle={{
                    color: "#6b7280",
                    fontSize: "0.75rem",
                    paddingRight: "1rem",
                    userSelect: "none",
                  }}
                  {...props}
                >
                  {codeString}
                </SyntaxHighlighter>
              </div>
            );
          },
          ul: ({ children, ...props }) => (
            <ul className="my-6 ml-6 list-disc" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="my-6 ml-6 list-decimal" {...props}>
              {children}
            </ol>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote className="mt-6 border-l-2 pl-6 italic" {...props}>
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-6" />,
          table: ({ children, ...props }) => (
            <div className="my-6 w-full overflow-y-auto">
              <table className="w-full" {...props}>
                {children}
              </table>
            </div>
          ),
        }}
      >
        {code}
      </ReactMarkdown>
    </div>
  );
}
