"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BlogCardProps } from "@/types/blog";
import { Calendar, Clock, ImageOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function BlogCard({ post }: BlogCardProps) {
  const [imgError, setImgError] = useState(false);

  // Use a fallback image from a reliable source
  const validCoverImage =
    post.coverImage && !imgError
      ? post.coverImage
      : "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group block rounded-lg border bg-background transition-colors hover:bg-muted/50",
        post.className
      )}
    >
      <div className="relative aspect-video overflow-hidden rounded-t-lg">
        <Image
          src={validCoverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          onError={() => setImgError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />
        {imgError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <ImageOff className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        {post.featured && (
          <Badge
            variant="secondary"
            className="absolute top-2 right-2 bg-amber text-black"
          >
            Featured
          </Badge>
        )}
      </div>
      <div className="p-6">
        {post.categories?.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1">
            {post.categories.slice(0, 3).map((category) => (
              <Badge
                key={category.id}
                variant="outline"
                className="border-orange text-orange"
              >
                {category.name}
              </Badge>
            ))}
            {post.categories.length > 3 && (
              <Badge variant="outline">+{post.categories.length - 3}</Badge>
            )}
          </div>
        )}
        <h3 className="text-xl font-semibold mb-2 group-hover:text-blueviolet transition-colors">
          {post.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <time dateTime={new Date(post.createdAt).toISOString()}>
              {formatDate(post.createdAt)}
            </time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readingTime || 5} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
