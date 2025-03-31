'use client';

import { BlogPost } from '@/types/blog';
import { Category } from '@prisma/client';

// Base URL for API calls
const API_URL = '/api/blog';

// Interface for post update data with readingTime
export interface PostUpdateData {
  title?: string;
  slug?: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  published?: boolean;
  featured?: boolean;
  categories?: string[];
  readingTime?: number;
  [key: string]: any; // Allow additional properties
}

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
export async function updateBlogPost(slug: string, data: PostUpdateData): Promise<BlogPost> {
  // Calculate reading time if content is included
  if (data.content) {
    data.readingTime = calculateReadingTime(data.content);
  }
  
  console.log(`Sending update request for blog post: ${slug}`, data);
  
  try {
    const response = await fetch(`${API_URL}/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    // Get response text first for debugging
    const responseText = await response.text();
    
    if (!response.ok) {
      console.error(`Error response from API: ${responseText}`);
      throw new Error(`Failed to update blog post: ${response.status} ${response.statusText}`);
    }
    
    // Parse the response text as JSON
    let responseData;
    try {
      responseData = JSON.parse(responseText);
      console.log(`Update successful, received data:`, responseData);
    } catch (e) {
      console.error(`Failed to parse response as JSON: ${responseText}`);
      throw new Error(`Invalid response format from server: ${e instanceof Error ? e.message : 'Unknown error'}`);
    }
    
    return responseData;
  } catch (error) {
    console.error(`Error updating blog post ${slug}:`, error);
    throw error;
  }
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