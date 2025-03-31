'use client';

import { BlogPost } from '@/types/blog';
import { Category } from '@prisma/client';

// Base URL for API calls
const API_URL = '/api/blog';

// Fetch a blog post by ID or slug
export async function fetchBlogPost(idOrSlug: string): Promise<BlogPost> {
  const response = await fetch(`${API_URL}/${idOrSlug}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch blog post: ${response.statusText}`);
  }
  
  return await response.json();
}

// Create a new blog post
export async function createBlogPost(data: {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  published?: boolean;
  featured?: boolean;
  categories?: string[];
}): Promise<BlogPost> {
  // Format the data for the API
  const postData = {
    ...data,
    readingTime: calculateReadingTime(data.content),
  };
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create blog post: ${response.statusText}`);
  }
  
  return await response.json();
}

// Update an existing blog post
export async function updateBlogPost(slug: string, data: {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  published?: boolean;
  featured?: boolean;
  categories?: string[];
}): Promise<BlogPost> {
  // Calculate reading time if content is included
  const postData = { ...data } as any;
  if (data.content) {
    postData.readingTime = calculateReadingTime(data.content);
  }
  
  const response = await fetch(`${API_URL}/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update blog post: ${response.statusText}`);
  }
  
  return await response.json();
}

// Delete a blog post
export async function deleteBlogPost(slug: string): Promise<void> {
  const response = await fetch(`${API_URL}/${slug}`, {
    method: 'DELETE',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to delete blog post: ${response.statusText}`);
  }
}

// Fetch all blog categories
export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${API_URL}/categories`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch categories: ${response.statusText}`);
  }
  
  return await response.json();
}

// Helper to calculate reading time in minutes based on word count
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
} 