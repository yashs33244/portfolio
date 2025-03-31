"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Category } from "@prisma/client";
import { useCreateBlogPost, useUpdateBlogPost } from "@/lib/blog-hooks";
import { BlogPost } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { MultiSelect } from "@/components/ui/multi-select";
import { slugify } from "@/lib/utils";
import { BlogCoverUpload } from "./blog-cover-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Mdx } from "@/components/mdx";

// Create schema for form validation
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z.string().min(5, "Slug must be at least 5 characters"),
  content: z.string().min(50, "Content must be at least 50 characters"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters"),
  coverImage: z.string().optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  categories: z.array(z.string()).optional(),
});

interface BlogEditorProps {
  post?: BlogPost;
  categories?: Category[];
}

export function BlogEditor({ post, categories = [] }: BlogEditorProps) {
  const router = useRouter();

  // Mutations for create/update
  const createPostMutation = useCreateBlogPost();
  const updatePostMutation = useUpdateBlogPost();

  // Convert categories to options for multi-select
  const categoryOptions = categories.map((category) => ({
    label: category.name,
    value: category.slug,
  }));

  // Initialize form with post data if editing
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      content:
        post?.content ||
        "# New Blog Post\n\nStart writing here...\n\n```mermaid\ngraph TD\n    A[Start] --> B[Your Process]\n    B --> C[End]\n```",
      excerpt: post?.excerpt || "",
      coverImage: post?.coverImage || "",
      published: post?.published || false,
      featured: post?.featured || false,
      categories: post?.categories?.map((cat) => cat.slug) || [],
    },
  });

  // Update slug when title changes
  const handleTitleChange = (title: string) => {
    const newSlug = slugify(title);
    if (!post) {
      // Only auto-update slug for new posts
      form.setValue("slug", newSlug, { shouldValidate: true });
    }
  };

  // Handle form submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (post) {
        // Update existing post
        await updatePostMutation.mutateAsync({
          slug: post.slug,
          post: {
            ...values,
            // Don't pass categories as objects, pass as string array
            // @ts-ignore
            categories: values.categories,
          },
        });
        toast.success("Blog post updated successfully");
      } else {
        // Create new post
        const newPost = await createPostMutation.mutateAsync(values as any);
        toast.success("Blog post created successfully");

        // Redirect to edit page for the new post
        if (newPost?.slug) {
          router.push(`/blog/admin/edit/${newPost.slug}`);
        }
      }
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save blog post");
    }
  };

  // Loading state
  const isSubmitting =
    createPostMutation.isPending || updatePostMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter post title"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      handleTitleChange(e.target.value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="url-friendly-slug" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="coverImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <BlogCoverUpload
                  value={field.value || ""}
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Brief summary of the post"
                  {...field}
                  rows={3}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder="Select categories"
                  selected={field.value || []}
                  options={categoryOptions}
                  onChange={field.onChange}
                  allowCreate
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="border rounded-md">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <div className="font-medium">Markdown Editor</div>
            <div className="text-sm text-muted-foreground">
              Markdown with Mermaid support
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Editor Column */}
            <div className="border-r">
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write your post content in Markdown. Use ```mermaid fenced code blocks for diagrams."
                        {...field}
                        className="min-h-[500px] font-mono text-sm rounded-none border-0 resize-none focus-visible:ring-0"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Preview Column */}
            <div className="p-4 min-h-[500px] prose prose-amber dark:prose-invert max-w-none overflow-auto">
              <Mdx code={form.watch("content")} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <FormField
              control={form.control}
              name="published"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Published</FormLabel>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="featured"
              render={({ field }) => (
                <FormItem className="flex items-center gap-2 space-y-0">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="font-normal">Featured</FormLabel>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/blog/admin")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Saving..."
                : post
                ? "Update Post"
                : "Create Post"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
