"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { useToast } from "@/hooks/use-toast";
import { deletePost } from "@/lib/data";
import { Post } from "@/lib/types";

interface AdminBlogCardProps {
  post: Post;
}

export default function AdminBlogCard({ post }: AdminBlogCardProps) {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);

    try {
      // Delete the post from the in-memory storage
      deletePost(post.slug);

      toast({
        title: "Post deleted",
        description: `"${post.title}" has been successfully deleted.`,
      });

      // Refresh the page to update the list
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete the post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="border border-amber rounded-lg overflow-hidden">
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-blueviolet">
          {post.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-600">
            {format(new Date(post.date), "MMM d, yyyy")} • {post.readingTime}{" "}
            min read
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags?.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="border-azure">
                {tag}
              </Badge>
            ))}
            {post.tags && post.tags.length > 2 && (
              <Badge variant="outline" className="border-azure">
                +{post.tags.length - 2}
              </Badge>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            asChild
            className="border-orange text-orange hover:bg-orange hover:text-white"
          >
            <Link href={`/blog/${post.slug}`} target="_blank">
              <ExternalLink className="h-4 w-4 mr-2" />
              View
            </Link>
          </Button>
          <Button
            size="sm"
            variant="outline"
            asChild
            className="border-azure text-azure hover:bg-azure hover:text-white"
          >
            <Link href={`/blog/admin/edit/${post.slug}`}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="border-rose text-rose hover:bg-rose hover:text-white"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  post "{post.title}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-rose text-white hover:bg-rose-600"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
