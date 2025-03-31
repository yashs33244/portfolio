'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchBlogPosts,
  fetchBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  toggleFeaturedPost,
} from './blog-service';
import { BlogPost } from '@/types/blog';

// Query keys for blog posts
export const blogKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogKeys.all, 'list'] as const,
  list: (filters: Record<string, any>) => [...blogKeys.lists(), { ...filters }] as const,
  details: () => [...blogKeys.all, 'detail'] as const,
  detail: (slug: string) => [...blogKeys.details(), slug] as const,
};

// Fetch all blog posts with optional filters
export function useBlogPosts(
  filters: { 
    limit?: number; 
    page?: number; 
    category?: string;
    featured?: boolean;
    published?: boolean;
  } = {}
) {
  return useQuery({
    queryKey: blogKeys.list(filters),
    queryFn: () => fetchBlogPosts(filters),
  });
}

// Fetch a single blog post by slug
export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => fetchBlogPost(slug),
    enabled: !!slug, // Only run the query if slug is provided
  });
}

// Create a new blog post
export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createBlogPost,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(data.slug) });
    },
  });
}

// Update an existing blog post
export function useUpdateBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ slug, post }: { slug: string; post: Partial<BlogPost> }) => {
      console.log(`Mutation triggered for ${slug} with data:`, post);
      return updateBlogPost(slug, post);
    },
    onSuccess: (data) => {
      console.log(`Mutation succeeded, invalidating queries for ${data.slug}`);
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(data.slug) });
    },
    onError: (error) => {
      console.error('Update blog post mutation failed:', error);
    }
  });
}

// Delete a blog post
export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
  });
}

// Toggle featured status of a blog post
export function useToggleFeaturedPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (post: BlogPost) => toggleFeaturedPost(post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(data.slug) });
    },
  });
} 