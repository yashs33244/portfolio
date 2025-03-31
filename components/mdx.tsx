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

        /* SVG Support */
        .mdx svg {
          max-width: 100%;
          height: auto;
          margin: 1rem auto;
          display: block;
        }
      `}</style>

      <div className="prose prose-amber dark:prose-invert max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex, rehypeRaw, rehypeSlug]}
          components={{
            a: ({ href, children }) => {
              if (!href) return <span>{children}</span>;

              const isExternal = href.startsWith("http");
              if (isExternal) {
                return (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 underline"
                  >
                    {children}
                  </a>
                );
              }

              return <Link href={href}>{children}</Link>;
            },
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-2xl font-bold tracking-tight mt-8 mb-4">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xl font-bold tracking-tight mt-6 mb-3">
                {children}
              </h3>
            ),
            h4: ({ children }) => (
              <h4 className="text-lg font-bold tracking-tight mt-6 mb-3">
                {children}
              </h4>
            ),

            p: ({ node, children, ...props }: any) => {
              const hasImage = node?.children?.some(
                (child: any) => child.tagName === "img"
              );

              const hasMermaid = node?.children?.some(
                (child: any) =>
                  child.type === "element" &&
                  child.properties?.className?.includes("language-mermaid")
              );

              const hasSvg = node?.children?.some(
                (child: any) =>
                  child.tagName === "svg" ||
                  (child.value && child.value.includes("<svg"))
              );

              if (hasImage || hasMermaid || hasSvg) {
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

              // Check if the image is an SVG
              const isSvg = src.toLowerCase().endsWith(".svg");
              if (isSvg) {
                return (
                  <figure className="my-8">
                    <div className="relative overflow-hidden rounded-lg border bg-muted">
                      <img
                        src={src}
                        alt={alt || ""}
                        title={title || alt || ""}
                        className="w-full h-auto max-h-[500px] object-contain"
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

              // For external URLs that don't support next/image
              const isExternal = src.startsWith("http") || src.startsWith("//");

              return (
                <figure className="my-8">
                  <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
                    {isExternal ? (
                      <img
                        src={src}
                        alt={alt || ""}
                        title={title || alt || ""}
                        className="object-contain w-full h-full"
                      />
                    ) : (
                      <Image
                        src={src}
                        alt={alt || ""}
                        title={title || alt || ""}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 1000px, 100vw"
                        priority
                      />
                    )}
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
                  return (
                    <div suppressHydrationWarning>
                      <MermaidDiagram chart={content} />
                    </div>
                  );
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
    </div>
  );
}
