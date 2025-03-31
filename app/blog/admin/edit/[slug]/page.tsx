"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useBlogPost, useUpdateBlogPost } from "@/lib/blog-hooks";
import { toast } from "sonner";
import slugify from "slugify";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { useAuth } from "@/hooks/use-auth";
import { use } from "react";

// Define type for route params
interface PostParams {
  slug: string;
}

// Use the recommended React.use() method to unwrap the params promise
export default function EditPostPage({
  params,
}: {
  params: Promise<PostParams>;
}) {
  // Unwrap the params promise using React.use()
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  // Fetch post data with TanStack Query
  const { data: post, isLoading, error } = useBlogPost(slug);
  const updateBlogPost = useUpdateBlogPost();

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [categories, setCategories] = useState("");
  const [published, setPublished] = useState(false);
  const [featured, setFeatured] = useState(false);

  // Set initial form values when post data is loaded
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setExcerpt(post.excerpt || "");
      setCoverImage(post.coverImage || "");
      setCategories(
        post.categories?.map((category) => category.name).join(", ") || ""
      );
      setPublished(post.published);
      setFeatured(post.featured);
    }
  }, [post]);

  // Handle form submission with better error handling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }

    try {
      console.log("Submitting blog post update...");

      // Generate new slug if title has changed
      const newSlug =
        title !== post?.title
          ? slugify(title, { lower: true, strict: true })
          : post?.slug || slug;

      // Parse categories from comma-separated string and convert to slugs
      const categoryList = categories
        .split(",")
        .map((cat) => cat.trim())
        .filter(Boolean)
        .map((cat) => slugify(cat, { lower: true, strict: true })); // Convert to slug format

      console.log("Update data:", {
        slug,
        title,
        newSlug,
        excerpt,
        published,
        featured,
        categories: categoryList,
      });

      // Update directly with all the data needed
      await updateBlogPost.mutateAsync({
        slug,
        post: {
          id: post?.id, // Include the ID to ensure proper record update
          title,
          slug: newSlug,
          content,
          excerpt: excerpt || title,
          coverImage: coverImage || undefined,
          published,
          featured,
          categories: categoryList as any, // Use type assertion for now
        },
      });

      toast.success("Blog post updated successfully");
      router.push("/blog/admin");
    } catch (error) {
      console.error("Error updating blog post:", error);
      toast.error(
        `Failed to update blog post: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  };

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container py-12">
        <div className="rounded-lg border border-destructive p-8 text-center">
          <h2 className="text-lg font-medium text-destructive">
            Post not found
          </h2>
          <p className="text-muted-foreground mt-2">
            The post you are trying to edit does not exist or could not be
            loaded.
          </p>
          <p className="text-muted-foreground mt-2">Slug: {slug}</p>
          <p className="text-muted-foreground mt-2">
            Error: {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <Button className="mt-4" variant="outline" asChild>
            <Link href="/blog/admin">Back to Admin</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2 flex items-center text-muted-foreground"
            asChild
          >
            <Link href="/blog/admin">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Edit Post</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief description of the post"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverImage">Cover Image URL</Label>
              <Input
                id="coverImage"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categories">Categories</Label>
              <Input
                id="categories"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                placeholder="technology, programming, web-development"
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated list of categories
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
                <Label htmlFor="published">Published</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={featured}
                  onCheckedChange={setFeatured}
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content in Markdown format including Mermaid diagrams"
              className="min-h-[400px]"
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/blog/admin")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={updateBlogPost.isPending || !title || !content}
          >
            {updateBlogPost.isPending ? "Updating..." : "Update Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
