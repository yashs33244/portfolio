"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Edit,
  Eye,
  Loader2,
  LogOut,
  Plus,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BlogPost } from "@/types/blog";
import {
  useBlogPosts,
  useDeleteBlogPost,
  useToggleFeaturedPost,
} from "@/lib/blog-hooks";
import { toast } from "sonner";
import { Category } from "@prisma/client";
import { useAuth } from "./auth";

export default function BlogAdminPage() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuth();
  const [deleting, setDeleting] = useState<string | null>(null);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/blog/admin/login");
    }
  }, [isAuthenticated, router]);

  // Fetch posts using TanStack Query
  const { data, isLoading, error } = useBlogPosts({ admin: true, limit: 50 });
  const posts = data?.posts || [];

  // Mutation hooks
  const toggleFeaturedMutation = useToggleFeaturedPost();
  const deleteMutation = useDeleteBlogPost();

  // Handle logout
  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    router.push("/blog/admin/login");
  };

  // Toggle featured status
  async function toggleFeatured(post: BlogPost) {
    try {
      await toggleFeaturedMutation.mutateAsync(post);
      toast.success(
        `Post ${post.featured ? "removed from" : "added to"} featured`
      );
    } catch (error) {
      toast.error("Failed to update post");
      console.error("Error updating post:", error);
    }
  }

  // Delete post
  async function deletePost(slug: string) {
    try {
      setDeleting(slug);
      await deleteMutation.mutateAsync(slug);
      toast.success("Post deleted successfully");
    } catch (error) {
      toast.error("Failed to delete post");
      console.error("Error deleting post:", error);
    } finally {
      setDeleting(null);
    }
  }

  // If not authenticated, show nothing (redirect will happen in useEffect)
  if (!isAuthenticated) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="container py-12 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-12">
        <div className="rounded-lg border border-destructive p-8 text-center">
          <h2 className="text-lg font-medium text-destructive">
            Error loading posts
          </h2>
          <p className="text-muted-foreground mt-2">
            Please try again later or contact support.
          </p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => router.refresh()}
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Admin</h1>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/blog/admin/new">
              <Plus className="mr-2 h-4 w-4" /> New Post
            </Link>
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <h2 className="text-lg font-medium">No blog posts yet</h2>
          <p className="text-muted-foreground mt-2">
            Create your first blog post to get started.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/blog/admin/new">
              <Plus className="mr-2 h-4 w-4" /> Create Post
            </Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post: BlogPost) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {post.title}
                  </TableCell>
                  <TableCell>
                    {post.published ? (
                      <Badge variant="default" className="bg-amber text-black">
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="outline">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[150px] truncate">
                    <div className="flex flex-wrap gap-1">
                      {post.categories?.map((category: Category) => (
                        <Badge
                          key={category.id}
                          variant="outline"
                          className="border-orange text-orange"
                        >
                          {category.name}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(post.createdAt), "MMM d, yyyy")}
                  </TableCell>
                  <TableCell>{post.views}</TableCell>
                  <TableCell className="whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        onClick={() => toggleFeatured(post)}
                        disabled={toggleFeaturedMutation.isPending}
                        title={
                          post.featured
                            ? "Remove from featured"
                            : "Add to featured"
                        }
                      >
                        {post.featured ? (
                          <Star className="h-4 w-4 text-amber" />
                        ) : (
                          <StarOff className="h-4 w-4" />
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        asChild
                      >
                        <Link href={`/blog/${post.slug}`} title="View post">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-muted-foreground hover:text-foreground"
                        asChild
                      >
                        <Link
                          href={`/blog/admin/edit/${post.slug}`}
                          title="Edit post"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-muted-foreground hover:text-destructive"
                            title="Delete post"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Delete Blog Post
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{post.title}"?
                              This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              onClick={() => deletePost(post.slug)}
                              disabled={
                                deleting === post.slug ||
                                deleteMutation.isPending
                              }
                            >
                              {deleting === post.slug ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Deleting...
                                </>
                              ) : (
                                "Delete"
                              )}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
