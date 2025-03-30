'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchBlogPosts,
  fetchBlogPost,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  toggleFeaturedPost
} from './blog-service';
import { BlogPost } from '@/types/blog';

// Query keys
export const blogKeys = {
  all: ['blogs'] as const,
  lists: () => [...blogKeys.all, 'list'] as const,
  list: (filters: any) => [...blogKeys.lists(), filters] as const,
  details: () => [...blogKeys.all, 'detail'] as const,
  detail: (slug: string) => [...blogKeys.details(), slug] as const,
};

// Get all blog posts with pagination and filters
export function useBlogPosts(filters: {
  page?: number;
  limit?: number;
  category?: string;
  featured?: boolean;
  admin?: boolean;
} = {}) {
  return useQuery({
    queryKey: blogKeys.list(filters),
    queryFn: () => fetchBlogPosts(filters),
  });
}

// Get a single blog post by slug
export function useBlogPost(slug: string) {
  return useQuery({
    queryKey: blogKeys.detail(slug),
    queryFn: () => fetchBlogPost(slug),
    enabled: !!slug,
  });
}

// Create a new blog post
export function useCreateBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (post: Partial<BlogPost>) => createBlogPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
  });
}

// Update an existing blog post
export function useUpdateBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ slug, post }: { slug: string; post: Partial<BlogPost> }) => 
      updateBlogPost(slug, post),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
      queryClient.invalidateQueries({ queryKey: blogKeys.detail(data.slug) });
    },
  });
}

// Delete a blog post
export function useDeleteBlogPost() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (slug: string) => deleteBlogPost(slug),
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