import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Calendar, Clock, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Suspense, use } from "react";
import { BlogLayout } from "../components/blog-layout";
import { BlogHeader } from "../components/blog-header";
import { Mdx } from "@/components/mdx";
import { getBlogPostBySlug } from "@/lib/blog-service-server";
import { formatDate } from "@/lib/utils";
import Script from "next/script";

interface BlogPostPageProps {
  params: any;
}

// Generate metadata for the blog post
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const slug = (await Promise.resolve(params)).slug;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt || "",
    openGraph: {
      title: post.title,
      description: post.excerpt || "",
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}`,
      images: [
        {
          url:
            post.coverImage ||
            `${process.env.NEXT_PUBLIC_APP_URL}/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt || "",
      images: [
        post.coverImage ||
          `${process.env.NEXT_PUBLIC_APP_URL}/opengraph-image.jpg`,
      ],
    },
  };
}

// Get post data
async function getPost(slug: string) {
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
      published: true,
    },
    include: {
      categories: true,
    },
  });

  if (!post) {
    return null;
  }

  // Increment view count
  await prisma.post.update({
    where: { id: post.id },
    data: { views: { increment: 1 } },
  });

  return post;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const slug = (await Promise.resolve(params)).slug;
  const post = await getPost(slug);

  if (!post || (!post.published && process.env.NODE_ENV === "production")) {
    return notFound();
  }

  // Increment view count
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      `http://localhost:${process.env.PORT || 3000}`;
    await fetch(`${baseUrl}/api/blog/${slug}/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });
  } catch (error) {
    console.error("Failed to increment view count:", error);
  }

  return (
    <BlogLayout>
      {/* Preload mermaid script for immediate rendering */}
      <Script
        src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
        strategy="beforeInteractive"
      />

      <article className="container py-6 prose prose-amber dark:prose-invert mx-auto">
        <BlogHeader
          title={post.title}
          date={formatDate(post.createdAt)}
          author={post.author}
          coverImage={post.coverImage}
          categories={post.categories}
          readingTime={post.readingTime || 5}
          slug={post.slug}
        />
        <Suspense fallback={<div>Loading content...</div>}>
          <Mdx code={post.content} />
        </Suspense>
      </article>
    </BlogLayout>
  );
}
