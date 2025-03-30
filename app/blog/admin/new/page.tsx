"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useCreateBlogPost } from "@/lib/blog-hooks";
import { toast } from "sonner";
import slugify from "slugify";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "../auth";

export default function NewPostPage() {
  const router = useRouter();
  const createBlogPost = useCreateBlogPost();
  const { isAuthenticated } = useAuth();

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
      // Generate slug from title
      const slug = slugify(title, { lower: true, strict: true });

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

      await createBlogPost.mutateAsync({
        title,
        slug,
        content,
        excerpt: excerpt || title,
        coverImage: coverImage || null,
        published,
        featured,
        readingTime,
        categories: categoryList as any,
      });

      toast.success("Blog post created successfully");
      router.push("/blog/admin");
    } catch (error) {
      toast.error("Failed to create blog post");
      console.error("Error creating blog post:", error);
    }
  };

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
          <h1 className="text-3xl font-bold">Create New Post</h1>
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
            <Label htmlFor="content">Content (Markdown)</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content in Markdown"
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
            disabled={createBlogPost.isPending || !title || !content}
          >
            {createBlogPost.isPending ? "Creating..." : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  );
}
