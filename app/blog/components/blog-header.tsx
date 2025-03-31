"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@prisma/client";
import { useState } from "react";

interface BlogHeaderProps {
  title: string;
  date: string;
  author: string;
  slug: string;
  coverImage?: string | null;
  categories?: Category[];
  readingTime?: number;
}

export function BlogHeader({
  title,
  date,
  author,
  slug,
  coverImage,
  categories = [],
  readingTime = 5,
}: BlogHeaderProps) {
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

  const validCoverImage = isValidImageUrl(coverImage) ? coverImage : null;

  return (
    <div className="mb-10">
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 text-muted-foreground hover:text-foreground"
        asChild
      >
        <Link href="/blog">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all posts
        </Link>
      </Button>

      <div className="mb-8 text-center">
        <div className="mb-4 flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/blog/category/${category.slug}`}
              className="inline-block no-underline"
            >
              <Badge
                variant="outline"
                className="border-amber text-amber hover:bg-amber/10"
              >
                {category.name}
              </Badge>
            </Link>
          ))}
        </div>

        <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <time dateTime={new Date(date).toISOString()}>{date}</time>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </div>

      {validCoverImage && !imgError ? (
        <figure className="mb-10 overflow-hidden rounded-lg border">
          <div className="relative aspect-video">
            <Image
              src={validCoverImage}
              alt={title}
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 1000px, 100vw"
              onError={() => setImgError(true)}
            />
          </div>
        </figure>
      ) : (
        coverImage && (
          <figure className="mb-10 overflow-hidden rounded-lg border bg-gray-100 flex items-center justify-center">
            <div className="relative aspect-video w-full flex flex-col items-center justify-center text-gray-400">
              <ImageOff className="h-16 w-16 mb-2" />
              <p>
                Invalid image source:{" "}
                {typeof coverImage === "string" ? coverImage : "No image"}
              </p>
              <p className="text-sm text-gray-500">
                Image must start with '/' or be an absolute URL
              </p>
            </div>
          </figure>
        )
      )}
    </div>
  );
}
