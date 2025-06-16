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
    <div className="mb-10 bg-figma-dark min-h-screen relative">
      {/* Background pattern matching the main site */}
      <div className="absolute inset-0 figma-grid opacity-10"></div>

      <div className="relative z-10 py-8 px-4 md:px-8 max-w-4xl mx-auto">
        <Button
          variant="ghost"
          size="sm"
          className="mb-6 text-white/70 hover:text-white hover:bg-white/10 border border-white/20"
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
                  className="border-figma-gradient text-figma-gradient hover:bg-figma-gradient/10 bg-transparent"
                >
                  {category.name}
                </Badge>
              </Link>
            ))}
          </div>

          <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-white font-poppins">
            {title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/60">
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
          <figure className="mb-10 overflow-hidden rounded-lg border border-white/20 shadow-2xl">
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
            <figure className="mb-10 overflow-hidden rounded-lg border border-white/20 bg-figma-dark/50 flex items-center justify-center">
              <div className="relative aspect-video w-full flex flex-col items-center justify-center text-white/40">
                <ImageOff className="h-16 w-16 mb-2" />
                <p className="text-white/60">
                  Invalid image source:{" "}
                  {typeof coverImage === "string" ? coverImage : "No image"}
                </p>
                <p className="text-sm text-white/40">
                  Image must start with '/' or be an absolute URL
                </p>
              </div>
            </figure>
          )
        )}
      </div>
    </div>
  );
}
