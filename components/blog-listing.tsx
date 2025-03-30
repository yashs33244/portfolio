import { BlogCard } from "@/components/blog-card";
import { BlogListingProps } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export function BlogListing({ posts, pagination }: BlogListingProps) {
  // Safety check to ensure posts is an array
  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h3 className="text-lg font-medium">No blog posts found</h3>
        <p className="text-muted-foreground">
          Check back later for new content.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {pagination && pagination.pages > 1 && (
        <div className="flex items-center justify-center space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            asChild
            disabled={pagination.page <= 1}
          >
            <Link
              href={`/blog?page=${pagination.page - 1}`}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </Button>
          <span className="text-sm text-muted-foreground">
            Page {pagination.page} of {pagination.pages}
          </span>
          <Button
            variant="outline"
            size="sm"
            asChild
            disabled={pagination.page >= pagination.pages}
          >
            <Link
              href={`/blog?page=${pagination.page + 1}`}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
