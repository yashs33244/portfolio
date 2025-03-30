import Link from "next/link";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BlogCardProps } from "@/types/blog";
import { Calendar, Clock } from "lucide-react";

export function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group rounded-lg border overflow-hidden transition-colors hover:border-primary">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="relative aspect-video">
          {post.coverImage ? (
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(min-width: 1024px) 384px, (min-width: 768px) 288px, 100vw"
            />
          ) : (
            <div className="h-full bg-muted flex items-center justify-center text-muted-foreground p-4 text-center">
              No cover image
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
        <div className="p-4">
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
          <h3 className="font-semibold line-clamp-2 text-lg">{post.title}</h3>
          {post.excerpt && (
            <p className="mt-2 line-clamp-3 text-muted-foreground">
              {post.excerpt}
            </p>
          )}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <time dateTime={new Date(post.createdAt).toISOString()}>
                {formatDate(post.createdAt)}
              </time>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              <span>{post.readingTime || 5} min read</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
