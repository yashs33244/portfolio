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
          theme: "default",
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
    <div className="mdx" suppressHydrationWarning>
      <style jsx global>{`
        /* Ensure code blocks have dark background regardless of theme */
        .mdx pre {
          background-color: #1e293b !important; /* slate-900 */
          color: #f8fafc !important; /* slate-50 */
          border-radius: 0.5rem;
          padding: 1rem;
          margin: 1.5rem 0;
          overflow: auto;
        }

        /* Ensure inline code stands out */
        .mdx code:not(pre code) {
          background-color: #f1f5f9;
          color: #0f172a;
          padding: 0.2rem 0.4rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }

        /* Make sure mermaid diagrams are properly centered */
        .mdx .mermaid {
          text-align: center;
          margin: 2rem auto;
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

            if (hasImage || hasMermaid) {
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

            let language = "";
            if (node?.children?.[0]?.properties?.className?.[0]) {
              language = node.children[0].properties.className[0].replace(
                "language-",
                ""
              );
            }

            return (
              <pre {...props} className="code-block" data-language={language}>
                {children}
              </pre>
            );
          },
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";

            return (
              <code className={className} data-language={language} {...props}>
                {children}
              </code>
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
