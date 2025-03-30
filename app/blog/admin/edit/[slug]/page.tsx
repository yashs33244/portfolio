"use client";

import { useState, useEffect, use } from "react";
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

export default function EditPostPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;
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

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/blog/admin/login");
    }
  }, [isAuthenticated, router]);

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

  // If not authenticated, show nothing (redirect will happen in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }

    try {
      // Generate new slug if title has changed
      const newSlug =
        title !== post?.title
          ? slugify(title, { lower: true, strict: true })
          : post.slug;

      // Parse categories from comma-separated string
      const categoryList = categories
        .split(",")
        .map((cat) => cat.trim())
        .filter(Boolean);

      // Calculate reading time (rough estimate)
      const readingTime = Math.max(
        1,
        Math.ceil(content.split(/\s+/).length / 200)
      );

      await updateBlogPost.mutateAsync({
        slug,
        post: {
          title,
          slug: newSlug,
          content,
          excerpt: excerpt || title,
          coverImage: coverImage || null,
          published,
          featured,
          readingTime,
          categories: categoryList as any, // Cast string[] to any to satisfy the type checker
        },
      });

      toast.success("Blog post updated successfully");
      router.push("/blog/admin");
    } catch (error) {
      toast.error("Failed to update blog post");
      console.error("Error updating blog post:", error);
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
              placeholder="Write your post content in HTML"
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
