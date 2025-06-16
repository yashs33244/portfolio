"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BlogCardProps } from "@/types/blog";
import { Calendar, Clock, ImageOff } from "lucide-react";
import { useState } from "react";

export function BlogCard({ post }: BlogCardProps) {
  const [imgError, setImgError] = useState(false);

  // Validate image URL
  const isValidImageUrl = (url: string | null | undefined): boolean => {
    if (!url) return false;
    return (
      url.startsWith("/") ||
      url.startsWith("http://") ||
      url.startsWith("https://")
    );
  };

  const validCoverImage =
    post.coverImage && isValidImageUrl(post.coverImage)
      ? post.coverImage
      : null;
  const hasInvalidImage = post.coverImage && !validCoverImage;

  return (
    <article className="group rounded-lg border border-white/10 bg-figma-menu overflow-hidden transition-colors hover:border-figma-purple/50">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative aspect-video">
          {validCoverImage && !imgError ? (
            <Image
              src={validCoverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, 100vw"
              onError={() => setImgError(true)}
            />
          ) : hasInvalidImage ? (
            <div className="h-full bg-figma-dark flex flex-col items-center justify-center text-white/40 p-4 text-center">
              <ImageOff className="h-8 w-8 mb-1" />
              <span className="text-xs font-poppins">Invalid image format</span>
            </div>
          ) : (
            <div className="h-full bg-figma-dark flex items-center justify-center text-white/40 p-4 text-center">
              <span className="font-poppins">No cover image</span>
            </div>
          )}
          {post.featured && (
            <Badge
              variant="secondary"
              className="absolute top-2 right-2 bg-figma-gradient text-black font-medium"
            >
              Featured
            </Badge>
          )}
        </div>
        <div className="p-4">
          {post.categories?.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-1">
              {post.categories.slice(0, 3).map((category) => (
                <Badge
                  key={category.id}
                  variant="outline"
                  className="border-figma-gradient text-figma-gradient bg-figma-gradient/10 font-poppins text-xs"
                >
                  {category.name}
                </Badge>
              ))}
              {post.categories.length > 3 && (
                <Badge
                  variant="outline"
                  className="border-white/20 text-white/70 font-poppins"
                >
                  +{post.categories.length - 3}
                </Badge>
              )}
            </div>
          )}
          <h3 className="font-semibold line-clamp-2 text-lg text-white font-poppins">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="mt-2 line-clamp-3 text-white/70 font-poppins">
              {post.excerpt}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/60">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time
                dateTime={new Date(post.createdAt).toISOString()}
                className="font-poppins"
              >
                {formatDate(post.createdAt)}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span className="font-poppins">
                {post.readingTime || 5} min read
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
