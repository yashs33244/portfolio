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
import { Loader } from "@/components/ui/loader";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      <div className="min-h-screen bg-figma-dark figma-grid">
        <div className="figma-container py-16">
          <Loader size="lg" text="Loading blog posts..." fullScreen />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-figma-dark figma-grid">
        <div className="figma-container py-16">
          <div className="bg-figma-menu border border-red-500/20 rounded-lg p-8 text-center max-w-md mx-auto">
            <h2 className="text-xl font-bold text-red-400 mb-4 font-poppins">
              Error loading posts
            </h2>
            <p className="text-white/60 mb-6">
              Please try again later or contact support.
            </p>
            <Button
              onClick={() => router.refresh()}
              className="bg-figma-gradient text-black font-medium hover:opacity-90 transition-opacity"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-figma-dark figma-grid">
      <div className="figma-container py-16">
        {/* Header */}
        <div
          className={`mb-12 transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-bold text-white mb-4 font-poppins">
                Blog <span className="text-figma-gradient">Admin</span>
              </h1>
              <p className="text-white/70 text-lg">
                Manage your blog posts and content
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                asChild
                className="bg-figma-gradient text-black font-medium hover:opacity-90 transition-opacity"
              >
                <Link href="/blog/admin/new">
                  <Plus className="mr-2 h-4 w-4" /> New Post
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="border-white/20 text-white hover:bg-white/10 hover:text-white"
              >
                <LogOut className="mr-2 h-4 w-4" /> Logout
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-figma-menu border border-white/10 rounded-lg p-6 hover:border-figma-purple/30 transition-colors duration-300">
              <h3 className="text-white/60 text-sm font-medium mb-2">
                Total Posts
              </h3>
              <p className="text-3xl font-bold text-white">{posts.length}</p>
            </div>
            <div className="bg-figma-menu border border-white/10 rounded-lg p-6 hover:border-figma-purple/30 transition-colors duration-300">
              <h3 className="text-white/60 text-sm font-medium mb-2">
                Published
              </h3>
              <p className="text-3xl font-bold text-figma-gradient">
                {posts.filter((p: BlogPost) => p.published).length}
              </p>
            </div>
            <div className="bg-figma-menu border border-white/10 rounded-lg p-6 hover:border-figma-purple/30 transition-colors duration-300">
              <h3 className="text-white/60 text-sm font-medium mb-2">
                Featured
              </h3>
              <p className="text-3xl font-bold text-figma-gradient">
                {posts.filter((p: BlogPost) => p.featured).length}
              </p>
            </div>
          </div>
        </div>

        {posts.length === 0 ? (
          <div
            className={`transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-figma-menu border border-white/10 border-dashed rounded-lg p-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-4 font-poppins">
                No blog posts yet
              </h2>
              <p className="text-white/60 mb-8 text-lg">
                Create your first blog post to get started.
              </p>
              <Button
                asChild
                className="bg-figma-gradient text-black font-medium hover:opacity-90 transition-opacity"
              >
                <Link href="/blog/admin/new">
                  <Plus className="mr-2 h-4 w-4" /> Create Post
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <div
            className={`transition-all duration-1000 delay-300 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="bg-figma-menu border border-white/10 rounded-lg overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/10 hover:bg-white/5">
                    <TableHead className="text-white/80 font-medium">
                      Title
                    </TableHead>
                    <TableHead className="text-white/80 font-medium">
                      Status
                    </TableHead>
                    <TableHead className="text-white/80 font-medium">
                      Categories
                    </TableHead>
                    <TableHead className="text-white/80 font-medium">
                      Date
                    </TableHead>
                    <TableHead className="text-white/80 font-medium">
                      Views
                    </TableHead>
                    <TableHead className="w-[120px] text-white/80 font-medium">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post: BlogPost, index: number) => (
                    <TableRow
                      key={post.id}
                      className={`border-white/10 hover:bg-white/5 transition-all duration-300 ${
                        mounted
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <TableCell className="font-medium max-w-[200px] truncate text-white">
                        {post.title}
                      </TableCell>
                      <TableCell>
                        {post.published ? (
                          <Badge className="bg-figma-gradient text-black font-medium">
                            Published
                          </Badge>
                        ) : (
                          <Badge
                            variant="outline"
                            className="border-white/20 text-white/70"
                          >
                            Draft
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="max-w-[150px] truncate">
                        <div className="flex flex-wrap gap-1">
                          {post.categories?.map((category: Category) => (
                            <Badge
                              key={category.id}
                              variant="outline"
                              className="border-figma-purple/30 text-figma-purple text-xs"
                            >
                              {category.name}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-white/70">
                        {format(new Date(post.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell className="text-white/70">
                        {post.views}
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/60 hover:text-figma-gradient hover:bg-white/10"
                            onClick={() => toggleFeatured(post)}
                            disabled={toggleFeaturedMutation.isPending}
                            title={
                              post.featured
                                ? "Remove from featured"
                                : "Add to featured"
                            }
                          >
                            {post.featured ? (
                              <Star className="h-4 w-4 text-figma-gradient fill-current" />
                            ) : (
                              <StarOff className="h-4 w-4" />
                            )}
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/60 hover:text-white hover:bg-white/10"
                            asChild
                          >
                            <Link href={`/blog/${post.slug}`} title="View post">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>

                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-white/60 hover:text-white hover:bg-white/10"
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
                                className="text-white/60 hover:text-red-400 hover:bg-red-500/10"
                                title="Delete post"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-figma-menu border-white/10">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="text-white font-poppins">
                                  Delete Blog Post
                                </AlertDialogTitle>
                                <AlertDialogDescription className="text-white/70">
                                  Are you sure you want to delete "{post.title}
                                  "? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-white/20 text-white hover:bg-white/10">
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-red-500 text-white hover:bg-red-600"
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
          </div>
        )}
      </div>
    </div>
  );
}
